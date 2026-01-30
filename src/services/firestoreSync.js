import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {
  getHabits, saveHabits,
  getCompletions, saveCompletions,
  getTimerSessions,
  getSettings, saveSettings,
  getPremiumStatus, savePremiumStatus,
} from '../storage/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LAST_SYNC_KEY = '@focuslife_last_sync';

class FirestoreSync {
  constructor() {
    this.unsubscribeSnapshot = null;
    this.isSyncing = false;
    this.onDataMerged = null; // callback when data is merged from cloud
  }

  /** Get the current user's document reference */
  getUserDoc() {
    const user = auth().currentUser;
    if (!user || user.isAnonymous) return null;
    return firestore().collection('users').doc(user.uid);
  }

  /** Push local data to Firestore (fire-and-forget) */
  async pushToCloud() {
    const doc = this.getUserDoc();
    if (!doc || this.isSyncing) return;

    try {
      const [habits, completions, settings, premiumStatus] = await Promise.all([
        getHabits(),
        getCompletions(),
        getSettings(),
        getPremiumStatus(),
      ]);

      await doc.set({
        habits,
        completions,
        settings,
        premium: premiumStatus,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      }, { merge: true });

      await AsyncStorage.setItem(LAST_SYNC_KEY, new Date().toISOString());
    } catch (error) {
      console.warn('Push to cloud failed:', error.message);
    }
  }

  /** Push a timer session to the subcollection */
  async pushTimerSession(session) {
    const doc = this.getUserDoc();
    if (!doc) return;

    try {
      await doc.collection('timerSessions').add({
        ...session,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
    } catch (error) {
      console.warn('Push timer session failed:', error.message);
    }
  }

  /**
   * Pull data from Firestore and merge with local.
   * Strategy:
   * - habits: union by ID (local wins for conflicts)
   * - completions: union of dates per habit
   * - settings: local wins (user's device preference)
   * - premium: true if either local or cloud is premium
   */
  async pullAndMerge() {
    const doc = this.getUserDoc();
    if (!doc || this.isSyncing) return false;

    this.isSyncing = true;
    try {
      const snapshot = await doc.get();
      if (!snapshot.exists) {
        // No cloud data, push local data up
        await this.pushToCloud();
        this.isSyncing = false;
        return false;
      }

      const cloudData = snapshot.data() || {};
      const [localHabits, localCompletions, localSettings, localPremium] = await Promise.all([
        getHabits(),
        getCompletions(),
        getSettings(),
        getPremiumStatus(),
      ]);

      let merged = false;

      // Merge habits: union by ID
      const mergedHabits = [...localHabits];
      const localHabitIds = new Set(localHabits.map(h => h.id));
      const cloudHabits = cloudData.habits || [];
      if (Array.isArray(cloudHabits)) {
        for (const cloudHabit of cloudHabits) {
          if (cloudHabit && cloudHabit.id && !localHabitIds.has(cloudHabit.id)) {
            mergedHabits.push(cloudHabit);
            merged = true;
          }
        }
      }

      // Merge completions: union of dates
      const mergedCompletions = { ...localCompletions };
      const cloudCompletions = cloudData.completions || {};
      if (cloudCompletions && typeof cloudCompletions === 'object') {
        for (const [habitId, cloudDates] of Object.entries(cloudCompletions)) {
          if (!Array.isArray(cloudDates)) continue;
          if (!mergedCompletions[habitId]) {
            mergedCompletions[habitId] = cloudDates;
            merged = true;
          } else {
            const localDates = new Set(mergedCompletions[habitId]);
            const beforeSize = localDates.size;
            cloudDates.forEach(d => localDates.add(d));
            if (localDates.size > beforeSize) {
              mergedCompletions[habitId] = [...localDates].sort();
              merged = true;
            }
          }
        }
      }

      // Premium: true if either
      const cloudPremium = cloudData.premium || {};
      const mergedPremium = {
        isPremium: localPremium.isPremium || (cloudPremium.isPremium || false),
        purchaseDate: localPremium.purchaseDate || cloudPremium.purchaseDate || null,
      };
      if (mergedPremium.isPremium !== localPremium.isPremium) {
        merged = true;
      }

      // Save merged data locally
      await Promise.all([
        saveHabits(mergedHabits),
        saveCompletions(mergedCompletions),
        savePremiumStatus(mergedPremium),
      ]);

      // Push merged data back to cloud
      await this.pushToCloud();

      this.isSyncing = false;
      return merged;
    } catch (error) {
      console.warn('Pull and merge failed:', error.message);
      this.isSyncing = false;
      return false;
    }
  }

  /** Start realtime listener for cross-device sync */
  startRealtimeSync(onUpdate) {
    const doc = this.getUserDoc();
    if (!doc) return;

    this.stopRealtimeSync();

    this.unsubscribeSnapshot = doc.onSnapshot(
      (snapshot) => {
        if (!snapshot.exists || this.isSyncing) return;
        const data = snapshot.data();
        if (onUpdate && data) {
          onUpdate(data);
        }
      },
      (error) => {
        console.warn('Realtime sync error:', error.message);
      }
    );
  }

  /** Stop the realtime listener */
  stopRealtimeSync() {
    if (this.unsubscribeSnapshot) {
      this.unsubscribeSnapshot();
      this.unsubscribeSnapshot = null;
    }
  }

  /** Get last sync timestamp */
  async getLastSyncTime() {
    try {
      return await AsyncStorage.getItem(LAST_SYNC_KEY);
    } catch {
      return null;
    }
  }
}

// Singleton
export default new FirestoreSync();

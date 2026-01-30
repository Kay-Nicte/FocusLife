import React, { createContext, useContext, useEffect, useReducer, useCallback, useRef } from 'react';
import {
  getHabits, saveHabits,
  getCompletions, saveCompletions,
  getTimerSessions, saveTimerSession,
  getSettings, saveSettings,
  getPremiumStatus, savePremiumStatus,
  getUsername, saveUsername,
  handleUserChange,
} from '../storage/storage';
import { getToday, generateId } from '../utils/helpers';
import { FREE_HABIT_LIMIT } from '../constants/theme';
import firestoreSync from '../services/firestoreSync';
import { useAuth } from './AuthContext';
import { useTheme } from './ThemeContext';
import {
  checkPremiumStatus as checkRevenueCatPremium,
  addCustomerInfoListener,
} from '../services/purchaseService';

const AppContext = createContext();

const initialState = {
  habits: [],
  completions: {},
  timerSessions: [],
  settings: {
    pomodoroDuration: 25,
    shortBreak: 5,
    longBreak: 15,
    notifications: true,
    sound: true,
    vibration: true,
    dailyReminder: true,
    dailyReminderTime: '09:00',
    streakReminder: true,
    timerNotification: true,
  },
  isPremium: false,
  loading: true,
  adsWatched: 0,
  syncing: false,
  lastSync: null,
  username: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'LOAD_DATA':
      return { ...state, ...action.payload, loading: false };
    case 'SET_HABITS':
      return { ...state, habits: action.payload };
    case 'SET_COMPLETIONS':
      return { ...state, completions: action.payload };
    case 'ADD_TIMER_SESSION':
      return { ...state, timerSessions: [...state.timerSessions, action.payload] };
    case 'SET_TIMER_SESSIONS':
      return { ...state, timerSessions: action.payload };
    case 'SET_SETTINGS':
      return { ...state, settings: action.payload };
    case 'SET_PREMIUM':
      return { ...state, isPremium: action.payload };
    case 'INCREMENT_ADS':
      return { ...state, adsWatched: state.adsWatched + 1 };
    case 'SET_SYNCING':
      return { ...state, syncing: action.payload };
    case 'SET_LAST_SYNC':
      return { ...state, lastSync: action.payload };
    case 'SET_USERNAME':
      return { ...state, username: action.payload };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user, isAnonymous } = useAuth();
  const { updatePremiumStatus } = useTheme();
  const syncStartedRef = useRef(false);

  // Sync premium status with ThemeContext (for background unlocking)
  useEffect(() => {
    updatePremiumStatus(state.isPremium);
  }, [state.isPremium]);

  // Initial data load - will be reloaded after user check
  useEffect(() => {
    loadAllData();
  }, []);

  // Clear data when user logs out (user becomes null)
  const prevUserRef = useRef(null);
  useEffect(() => {
    if (prevUserRef.current && !user) {
      // User logged out - data should already be cleared by signOut
      // But dispatch to reset state immediately
      dispatch({
        type: 'LOAD_DATA',
        payload: {
          habits: [],
          completions: {},
          timerSessions: [],
          settings: initialState.settings,
          isPremium: false,
        },
      });
    }
    prevUserRef.current = user;
  }, [user]);

  // Sync when auth state changes
  useEffect(() => {
    if (user && !isAnonymous && !state.loading) {
      startSync();
    } else {
      firestoreSync.stopRealtimeSync();
      syncStartedRef.current = false;
    }
    return () => {
      firestoreSync.stopRealtimeSync();
    };
  }, [user, isAnonymous, state.loading]);

  const startSync = async () => {
    if (syncStartedRef.current || !user) return;
    syncStartedRef.current = true;

    dispatch({ type: 'SET_SYNCING', payload: true });
    try {
      // Check if this is a different user - if so, clear old local data
      const userChanged = await handleUserChange(user.uid);
      if (userChanged) {
        // Reload with empty local data, then pull from cloud
        await loadAllData();
      }

      const merged = await firestoreSync.pullAndMerge();
      if (merged || userChanged) {
        // Reload data after merge
        await loadAllData();
      }
      const lastSync = await firestoreSync.getLastSyncTime();
      dispatch({ type: 'SET_LAST_SYNC', payload: lastSync });

      // Start realtime listener
      firestoreSync.startRealtimeSync((cloudData) => {
        // Silently apply cloud changes on next reload
        // Don't auto-overwrite to avoid conflicts during active use
      });
    } catch (error) {
      console.warn('Sync start failed:', error.message);
    } finally {
      dispatch({ type: 'SET_SYNCING', payload: false });
    }
  };

  const syncAfterWrite = () => {
    // Fire-and-forget push to cloud
    firestoreSync.pushToCloud().then(async () => {
      const lastSync = await firestoreSync.getLastSyncTime();
      dispatch({ type: 'SET_LAST_SYNC', payload: lastSync });
    }).catch(() => {});
  };

  const loadAllData = async () => {
    const [habits, completions, timerSessions, settings, premiumStatus, username] = await Promise.all([
      getHabits(),
      getCompletions(),
      getTimerSessions(),
      getSettings(),
      getPremiumStatus(),
      getUsername(),
    ]);

    let isPremium = premiumStatus.isPremium;

    // Verify with RevenueCat (source of truth) and update cache if different
    try {
      const rcPremium = await checkRevenueCatPremium();
      if (rcPremium !== isPremium) {
        isPremium = rcPremium;
        await savePremiumStatus({ isPremium: rcPremium, purchaseDate: rcPremium ? new Date().toISOString() : null });
      }
    } catch (e) {
      // Offline or SDK not ready — use cached value
    }

    dispatch({
      type: 'LOAD_DATA',
      payload: {
        habits,
        completions,
        timerSessions,
        settings,
        isPremium,
        username,
      },
    });
  };

  // Listen for real-time subscription changes from RevenueCat
  useEffect(() => {
    const removeListener = addCustomerInfoListener(async (isPremium) => {
      await savePremiumStatus({ isPremium, purchaseDate: isPremium ? new Date().toISOString() : null });
      dispatch({ type: 'SET_PREMIUM', payload: isPremium });
    });
    return removeListener;
  }, []);

  const refreshPremiumStatus = useCallback(async () => {
    try {
      const isPremium = await checkRevenueCatPremium();
      await savePremiumStatus({ isPremium, purchaseDate: isPremium ? new Date().toISOString() : null });
      dispatch({ type: 'SET_PREMIUM', payload: isPremium });
      return isPremium;
    } catch (e) {
      return state.isPremium;
    }
  }, [state.isPremium]);

  const addHabit = useCallback(async (habit, options = {}) => {
    const { bonusSlots = 0 } = options;
    const effectiveLimit = FREE_HABIT_LIMIT + bonusSlots;

    if (!state.isPremium && state.habits.length >= effectiveLimit) {
      return { error: 'PREMIUM_REQUIRED' };
    }
    const newHabit = {
      id: generateId(),
      name: habit.name,
      icon: habit.icon,
      color: habit.color || '#6C63FF',
      createdAt: getToday(),
    };
    const updated = [...state.habits, newHabit];
    await saveHabits(updated);
    dispatch({ type: 'SET_HABITS', payload: updated });
    syncAfterWrite();
    return { success: true, habit: newHabit };
  }, [state.habits, state.isPremium]);

  const deleteHabit = useCallback(async (habitId) => {
    const updated = state.habits.filter(h => h.id !== habitId);
    await saveHabits(updated);
    dispatch({ type: 'SET_HABITS', payload: updated });
    syncAfterWrite();
  }, [state.habits]);

  const updateHabit = useCallback(async (habitId, updates) => {
    const updated = state.habits.map(h =>
      h.id === habitId ? { ...h, ...updates } : h
    );
    await saveHabits(updated);
    dispatch({ type: 'SET_HABITS', payload: updated });
    syncAfterWrite();
  }, [state.habits]);

  const toggleHabitCompletion = useCallback(async (habitId) => {
    const today = getToday();
    const newCompletions = { ...state.completions };
    if (!newCompletions[habitId]) {
      newCompletions[habitId] = [];
    }
    const index = newCompletions[habitId].indexOf(today);
    if (index > -1) {
      newCompletions[habitId] = newCompletions[habitId].filter(d => d !== today);
    } else {
      newCompletions[habitId] = [...newCompletions[habitId], today];
    }
    await saveCompletions(newCompletions);
    dispatch({ type: 'SET_COMPLETIONS', payload: newCompletions });
    syncAfterWrite();
  }, [state.completions]);

  const addTimerSession = useCallback(async (duration, type) => {
    const session = {
      date: getToday(),
      timestamp: Date.now(),
      duration,
      type,
    };
    await saveTimerSession(session);
    dispatch({ type: 'ADD_TIMER_SESSION', payload: session });
    firestoreSync.pushTimerSession(session);
    syncAfterWrite();
  }, []);

  const updateSettings = useCallback(async (newSettings) => {
    const updated = { ...state.settings, ...newSettings };
    await saveSettings(updated);
    dispatch({ type: 'SET_SETTINGS', payload: updated });
    syncAfterWrite();
  }, [state.settings]);

  const upgradeToPremium = useCallback(async () => {
    await savePremiumStatus({ isPremium: true, purchaseDate: new Date().toISOString() });
    dispatch({ type: 'SET_PREMIUM', payload: true });
    syncAfterWrite();
  }, []);

  const cancelPremium = useCallback(async () => {
    await savePremiumStatus({ isPremium: false, purchaseDate: null });
    dispatch({ type: 'SET_PREMIUM', payload: false });
    syncAfterWrite();
  }, []);

  const incrementAdsWatched = useCallback(() => {
    dispatch({ type: 'INCREMENT_ADS' });
  }, []);

  const updateUsername = useCallback(async (newUsername) => {
    await saveUsername(newUsername);
    dispatch({ type: 'SET_USERNAME', payload: newUsername });
    syncAfterWrite();
  }, []);

  const value = {
    ...state,
    addHabit,
    updateHabit,
    deleteHabit,
    toggleHabitCompletion,
    addTimerSession,
    updateSettings,
    updateUsername,
    upgradeToPremium,
    cancelPremium,
    refreshPremiumStatus,
    incrementAdsWatched,
    reload: loadAllData,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

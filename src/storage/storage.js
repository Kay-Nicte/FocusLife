import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  HABITS: '@focuslife_habits',
  COMPLETIONS: '@focuslife_completions',
  TIMER_SESSIONS: '@focuslife_timer_sessions',
  SETTINGS: '@focuslife_settings',
  PREMIUM: '@focuslife_premium',
  FIRST_LAUNCH: '@focuslife_first_launch',
  THEME: '@focuslife_theme',
  CURRENT_USER: '@focuslife_current_user',
  USERNAME: '@focuslife_username',
};

// --- User Data Separation ---
// Clear user-specific data when switching accounts
export const clearUserData = async () => {
  const userDataKeys = [
    KEYS.HABITS,
    KEYS.COMPLETIONS,
    KEYS.TIMER_SESSIONS,
    KEYS.SETTINGS,
    KEYS.PREMIUM,
    KEYS.USERNAME,
    '@focuslife_background',
    '@focuslife_unlocked_backgrounds',
  ];
  await AsyncStorage.multiRemove(userDataKeys);
};

// Check if we need to clear data for a different user
export const handleUserChange = async (newUserId) => {
  if (!newUserId) return false;

  try {
    const currentUser = await AsyncStorage.getItem(KEYS.CURRENT_USER);
    if (currentUser && currentUser !== newUserId) {
      // Different user - clear old data
      await clearUserData();
      await AsyncStorage.setItem(KEYS.CURRENT_USER, newUserId);
      return true; // Data was cleared
    } else if (!currentUser) {
      // First time login with this account
      await AsyncStorage.setItem(KEYS.CURRENT_USER, newUserId);
    }
    return false;
  } catch {
    return false;
  }
};

// Clear current user marker on logout
export const clearCurrentUser = async () => {
  await AsyncStorage.removeItem(KEYS.CURRENT_USER);
};

// --- Habits ---
export const getHabits = async () => {
  try {
    const data = await AsyncStorage.getItem(KEYS.HABITS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveHabits = async (habits) => {
  await AsyncStorage.setItem(KEYS.HABITS, JSON.stringify(habits));
};

// --- Completions ---
// Structure: { habitId: ['2025-01-15', '2025-01-16', ...] }
export const getCompletions = async () => {
  try {
    const data = await AsyncStorage.getItem(KEYS.COMPLETIONS);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
};

export const saveCompletions = async (completions) => {
  await AsyncStorage.setItem(KEYS.COMPLETIONS, JSON.stringify(completions));
};

export const toggleCompletion = async (habitId, date) => {
  const completions = await getCompletions();
  if (!completions[habitId]) {
    completions[habitId] = [];
  }
  const index = completions[habitId].indexOf(date);
  if (index > -1) {
    completions[habitId].splice(index, 1);
  } else {
    completions[habitId].push(date);
  }
  await saveCompletions(completions);
  return completions;
};

// --- Timer Sessions ---
// Structure: [{ date: '2025-01-15', duration: 1500, type: 'focus' }]
export const getTimerSessions = async () => {
  try {
    const data = await AsyncStorage.getItem(KEYS.TIMER_SESSIONS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveTimerSession = async (session) => {
  const sessions = await getTimerSessions();
  sessions.push(session);
  await AsyncStorage.setItem(KEYS.TIMER_SESSIONS, JSON.stringify(sessions));
  return sessions;
};

// --- Settings ---
const DEFAULT_SETTINGS = {
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
};

export const getSettings = async () => {
  try {
    const data = await AsyncStorage.getItem(KEYS.SETTINGS);
    if (data) {
      // Merge with defaults to ensure new settings have default values
      return { ...DEFAULT_SETTINGS, ...JSON.parse(data) };
    }
    return DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
};

export const saveSettings = async (settings) => {
  await AsyncStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
};

// --- Premium ---
export const getPremiumStatus = async () => {
  try {
    const data = await AsyncStorage.getItem(KEYS.PREMIUM);
    return data ? JSON.parse(data) : { isPremium: false, purchaseDate: null };
  } catch {
    return { isPremium: false, purchaseDate: null };
  }
};

export const savePremiumStatus = async (status) => {
  await AsyncStorage.setItem(KEYS.PREMIUM, JSON.stringify(status));
};

// --- First Launch ---
export const isFirstLaunch = async () => {
  try {
    const data = await AsyncStorage.getItem(KEYS.FIRST_LAUNCH);
    if (data === null) {
      await AsyncStorage.setItem(KEYS.FIRST_LAUNCH, 'false');
      return true;
    }
    return false;
  } catch {
    return false;
  }
};

// --- Theme ---
export const getThemePreference = async () => {
  try {
    const data = await AsyncStorage.getItem(KEYS.THEME);
    return data || 'dark'; // default dark
  } catch {
    return 'dark';
  }
};

export const saveThemePreference = async (theme) => {
  await AsyncStorage.setItem(KEYS.THEME, theme);
};

// --- Username ---
export const getUsername = async () => {
  try {
    const data = await AsyncStorage.getItem(KEYS.USERNAME);
    return data || '';
  } catch {
    return '';
  }
};

export const saveUsername = async (username) => {
  await AsyncStorage.setItem(KEYS.USERNAME, username || '');
};

// --- Clear All Data ---
export const clearAllData = async () => {
  const keys = Object.values(KEYS);
  await AsyncStorage.multiRemove(keys);
};

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { DARK_COLORS, LIGHT_COLORS, BACKGROUNDS } from '../constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from './AuthContext';

const ThemeContext = createContext();

const STORAGE_KEYS = {
  THEME: '@focuslife_theme',
  BACKGROUND: '@focuslife_background',
  UNLOCKED_BACKGROUNDS: '@focuslife_unlocked_backgrounds',
};

export function ThemeProvider({ children }) {
  const { registerSignOutCallback } = useAuth();
  const [backgroundId, setBackgroundId] = useState('midnight');
  const [unlockedBackgrounds, setUnlockedBackgrounds] = useState([]);
  const [themeLoaded, setThemeLoaded] = useState(false);
  const [isPremiumUser, setIsPremiumUser] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [savedBg, savedUnlocked] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.BACKGROUND),
          AsyncStorage.getItem(STORAGE_KEYS.UNLOCKED_BACKGROUNDS),
        ]);

        if (savedBg) setBackgroundId(savedBg);
        if (savedUnlocked) setUnlockedBackgrounds(JSON.parse(savedUnlocked));
      } catch (e) {
        console.warn('Failed to load theme preferences:', e);
      }
      setThemeLoaded(true);
    })();
  }, []);

  // Reset theme to defaults when user signs out
  useEffect(() => {
    if (!registerSignOutCallback) return;
    const unsubscribe = registerSignOutCallback(() => {
      setBackgroundId('midnight');
      setUnlockedBackgrounds([]);
      setIsPremiumUser(false);
    });
    return unsubscribe;
  }, [registerSignOutCallback]);

  // Called by AppContext to sync premium status
  const updatePremiumStatus = useCallback((isPremium) => {
    setIsPremiumUser(isPremium);
  }, []);

  const setBackground = useCallback(async (bgId) => {
    setBackgroundId(bgId);
    await AsyncStorage.setItem(STORAGE_KEYS.BACKGROUND, bgId);
  }, []);

  const unlockBackground = useCallback(async (bgId) => {
    if (unlockedBackgrounds.includes(bgId)) return;
    const updated = [...unlockedBackgrounds, bgId];
    setUnlockedBackgrounds(updated);
    await AsyncStorage.setItem(STORAGE_KEYS.UNLOCKED_BACKGROUNDS, JSON.stringify(updated));
  }, [unlockedBackgrounds]);

  // Check if background is available to current user
  const isBackgroundUnlocked = useCallback((bgId, isPremium = isPremiumUser) => {
    const bg = BACKGROUNDS.find(b => b.id === bgId);
    if (!bg) return false;
    if (bg.type === 'free') return true;
    if (isPremium) return true; // Premium users get ALL backgrounds
    if (bg.type === 'ad') return unlockedBackgrounds.includes(bgId);
    return false;
  }, [unlockedBackgrounds, isPremiumUser]);

  // Reset to default background (called when user switches)
  const resetToDefaultBackground = useCallback(() => {
    setBackgroundId('midnight');
    setUnlockedBackgrounds([]);
    setIsPremiumUser(false);
  }, []);

  // Reload theme preferences from storage
  const reloadThemePreferences = useCallback(async () => {
    try {
      const [savedBg, savedUnlocked] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.BACKGROUND),
        AsyncStorage.getItem(STORAGE_KEYS.UNLOCKED_BACKGROUNDS),
      ]);

      setBackgroundId(savedBg || 'midnight');
      setUnlockedBackgrounds(savedUnlocked ? JSON.parse(savedUnlocked) : []);
    } catch (e) {
      console.warn('Failed to reload theme preferences:', e);
      setBackgroundId('midnight');
      setUnlockedBackgrounds([]);
    }
  }, []);

  // Validate current background when premium status changes
  useEffect(() => {
    if (themeLoaded && !isBackgroundUnlocked(backgroundId)) {
      // Current background is no longer available, reset to default
      setBackgroundId('midnight');
      AsyncStorage.setItem(STORAGE_KEYS.BACKGROUND, 'midnight');
    }
  }, [isPremiumUser, themeLoaded]);

  const currentBackground = BACKGROUNDS.find(b => b.id === backgroundId) || BACKGROUNDS[0];
  // Colors automatically follow background darkness - no manual toggle needed
  const isDark = currentBackground.dark;
  const colors = isDark ? DARK_COLORS : LIGHT_COLORS;

  const value = {
    isDark,
    colors,
    themeLoaded,
    // Background
    backgrounds: BACKGROUNDS,
    currentBackground,
    setBackground,
    unlockBackground,
    isBackgroundUnlocked,
    unlockedBackgrounds,
    resetToDefaultBackground,
    reloadThemePreferences,
    updatePremiumStatus,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

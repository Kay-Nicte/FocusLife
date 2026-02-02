import React, { useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppProvider } from './src/context/AppContext';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { LanguageProvider } from './src/context/LanguageContext';
import AppNavigator from './src/navigation/AppNavigator';
import { getSettings } from './src/storage/storage';
import {
  requestNotificationPermissions,
  updateNotificationSchedules,
} from './src/services/notificationService';
import {
  initializePurchases,
  loginUser,
  logoutUser,
} from './src/services/purchaseService';

// Keep native splash visible until we're ready
SplashScreen.preventAutoHideAsync();

const fontConfig = {
  regular: {
    fontFamily: Platform.select({ ios: 'System', android: 'sans-serif' }),
    fontWeight: '400',
  },
  medium: {
    fontFamily: Platform.select({ ios: 'System', android: 'sans-serif-medium' }),
    fontWeight: '500',
  },
  bold: {
    fontFamily: Platform.select({ ios: 'System', android: 'sans-serif' }),
    fontWeight: '700',
  },
  heavy: {
    fontFamily: Platform.select({ ios: 'System', android: 'sans-serif' }),
    fontWeight: '900',
  },
};

function AppContent() {
  const { colors, isDark } = useTheme();
  const { user } = useAuth();
  const prevUserRef = useRef(null);

  // Initialize notifications on app start
  useEffect(() => {
    const initNotifications = async () => {
      const hasPermission = await requestNotificationPermissions();
      if (hasPermission) {
        const settings = await getSettings();
        await updateNotificationSchedules(settings);
      }
    };
    initNotifications();
  }, []);

  // Initialize RevenueCat on app start
  useEffect(() => {
    initializePurchases();
  }, []);

  // Sync RevenueCat identity with Firebase Auth
  useEffect(() => {
    if (user && !user.isAnonymous) {
      loginUser(user.uid);
    } else if (prevUserRef.current && !user) {
      logoutUser();
    }
    prevUserRef.current = user;
  }, [user]);

  return (
    <NavigationContainer
      theme={{
        dark: isDark,
        colors: {
          primary: colors.primary,
          background: colors.background,
          card: colors.backgroundLight,
          text: colors.text,
          border: colors.border,
          notification: colors.secondary,
        },
        fonts: fontConfig,
      }}
    >
      <StatusBar style={isDark ? 'light' : 'dark'} backgroundColor={colors.background} />
      <AppNavigator />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <LanguageProvider>
        <AuthProvider>
          <ThemeProvider>
            <AppProvider>
              <AppContent />
            </AppProvider>
          </ThemeProvider>
        </AuthProvider>
      </LanguageProvider>
    </SafeAreaProvider>
  );
}

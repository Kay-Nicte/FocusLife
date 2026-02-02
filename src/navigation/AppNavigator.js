import React, { useEffect, useCallback } from 'react';
import { ActivityIndicator, View, Text, TouchableOpacity, Image } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SIZES } from '../constants/theme';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import GlobalAdBanner from '../components/GlobalAdBanner';

import HomeScreen from '../screens/HomeScreen';
import HabitsScreen from '../screens/HabitsScreen';
import TimerScreen from '../screens/TimerScreen';
import StatsScreen from '../screens/StatsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import PremiumScreen from '../screens/PremiumScreen';
import AuthScreen from '../screens/AuthScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Tab Bar with labels and ad banner BELOW
function TabBarWithLabels({ state, descriptors, navigation }) {
  const { colors } = useTheme();
  const { isPremium } = useApp();
  const { t } = useLanguage();
  const insets = useSafeAreaInsets();

  const getIcon = (routeName) => {
    switch (routeName) {
      case 'Home': return 'home';
      case 'Habits': return 'check-square';
      case 'Timer': return 'clock';
      case 'Stats': return 'bar-chart-2';
      case 'Settings': return 'sliders';
      default: return 'circle';
    }
  };

  const getLabel = (routeName) => {
    switch (routeName) {
      case 'Home': return t('nav.home');
      case 'Habits': return t('nav.habits');
      case 'Timer': return t('nav.timer');
      case 'Stats': return t('nav.stats');
      case 'Settings': return t('nav.settings');
      default: return routeName;
    }
  };

  return (
    <View style={{ backgroundColor: colors.backgroundLight }}>
      {/* Tab Bar */}
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: colors.backgroundLight,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          paddingTop: 8,
          paddingBottom: 10,
        }}
      >
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const color = isFocused ? colors.primary : colors.textMuted;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={{ flex: 1, alignItems: 'center' }}
              activeOpacity={0.7}
            >
              <Feather name={getIcon(route.name)} size={22} color={color} />
              <Text
                style={{
                  fontSize: SIZES.xs,
                  fontWeight: '600',
                  color,
                  marginTop: 4,
                }}
              >
                {getLabel(route.name)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Ad Banner - BELOW tab bar */}
      {!isPremium && <GlobalAdBanner />}

      {/* Safe area padding at the very bottom */}
      {insets.bottom > 0 && (
        <View style={{ height: insets.bottom, backgroundColor: colors.backgroundLight }} />
      )}
    </View>
  );
}

function TabNavigator() {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      tabBar={(props) => <TabBarWithLabels {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Habits" component={HabitsScreen} />
      <Tab.Screen name="Timer" component={TimerScreen} />
      <Tab.Screen name="Stats" component={StatsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { user, authLoading } = useAuth();
  const { colors } = useTheme();

  // Hide native splash once auth is done and app is ready
  useEffect(() => {
    if (!authLoading) {
      SplashScreen.hideAsync();
    }
  }, [authLoading]);

  if (authLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#7C3AED' }}>
        <Image
          source={require('../../assets/splash.png')}
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
          onLoad={() => SplashScreen.hideAsync()}
        />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <Stack.Screen name="Auth" component={AuthScreen} />
      ) : (
        <>
          <Stack.Screen name="Main" component={TabNavigator} />
          <Stack.Screen
            name="Premium"
            component={PremiumScreen}
            options={{
              presentation: 'modal',
              animation: 'slide_from_bottom',
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

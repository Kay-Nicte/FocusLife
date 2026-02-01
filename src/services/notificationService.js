import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { getHabits, getCompletions, getSettings } from '../storage/storage';
import { getToday } from '../utils/helpers';
import { t } from '../i18n';

// Configure how notifications are handled when app is in foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Notification IDs for management
const NOTIFICATION_IDS = {
  DAILY_REMINDER: 'daily-habit-reminder',
  STREAK_WARNING: 'streak-warning',
  TIMER_COMPLETE: 'timer-complete',
};

// Request permissions
export const requestNotificationPermissions = async () => {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    return false;
  }

  // Android specific channel
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'FocusLife',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#7C3AED',
    });
  }

  return true;
};

// Schedule daily habit reminder
export const scheduleDailyReminder = async (hour, minute) => {
  // Cancel existing daily reminder first
  await cancelDailyReminder();

  await Notifications.scheduleNotificationAsync({
    content: {
      title: t('notifications.dailyTitle'),
      body: t('notifications.dailyBody'),
      sound: true,
    },
    trigger: {
      type: 'daily',
      hour,
      minute,
    },
    identifier: NOTIFICATION_IDS.DAILY_REMINDER,
  });
};

// Cancel daily reminder
export const cancelDailyReminder = async () => {
  await Notifications.cancelScheduledNotificationAsync(NOTIFICATION_IDS.DAILY_REMINDER);
};

// Schedule streak warning (evening reminder if no habits completed)
export const scheduleStreakWarning = async () => {
  // Cancel existing first
  await cancelStreakWarning();

  // Schedule for 20:00 every day
  await Notifications.scheduleNotificationAsync({
    content: {
      title: t('notifications.streakTitle'),
      body: t('notifications.streakBody'),
      sound: true,
    },
    trigger: {
      type: 'daily',
      hour: 20,
      minute: 0,
    },
    identifier: NOTIFICATION_IDS.STREAK_WARNING,
  });
};

// Cancel streak warning
export const cancelStreakWarning = async () => {
  await Notifications.cancelScheduledNotificationAsync(NOTIFICATION_IDS.STREAK_WARNING);
};

// Show timer completion notification (immediate)
export const showTimerCompleteNotification = async (isBreak = false) => {
  const settings = await getSettings();
  if (!settings.timerNotification) return;

  await Notifications.scheduleNotificationAsync({
    content: {
      title: isBreak ? t('notifications.timerBreakTitle') : t('notifications.timerFocusTitle'),
      body: isBreak ? t('notifications.timerBreakBody') : t('notifications.timerFocusBody'),
      sound: true,
    },
    trigger: null, // Immediate
  });
};

// Schedule timer notification (for background)
export const scheduleTimerNotification = async (seconds, isBreak = false) => {
  // Cancel any existing timer notification
  await cancelTimerNotification();

  // Use absolute date trigger instead of timeInterval for reliability
  // when the app is in background or screen is locked
  const fireDate = new Date(Date.now() + seconds * 1000);

  await Notifications.scheduleNotificationAsync({
    content: {
      title: isBreak ? t('notifications.timerBreakTitle') : t('notifications.timerFocusTitle'),
      body: isBreak ? t('notifications.timerBreakBody') : t('notifications.timerFocusBody'),
      sound: true,
    },
    trigger: {
      type: 'date',
      timestamp: fireDate.getTime(),
    },
    identifier: NOTIFICATION_IDS.TIMER_COMPLETE,
  });
};

// Cancel timer notification
export const cancelTimerNotification = async () => {
  await Notifications.cancelScheduledNotificationAsync(NOTIFICATION_IDS.TIMER_COMPLETE);
};

// Check if user has completed any habits today (for streak warning logic)
export const checkTodayProgress = async () => {
  const habits = await getHabits();
  const completions = await getCompletions();
  const today = getToday();

  if (habits.length === 0) return { hasHabits: false, completedAny: false };

  const completedAny = habits.some(h =>
    completions[h.id] && completions[h.id].includes(today)
  );

  return { hasHabits: true, completedAny };
};

// Update all notification schedules based on settings
export const updateNotificationSchedules = async (settings) => {
  const hasPermission = await requestNotificationPermissions();
  if (!hasPermission) return;

  // Daily reminder
  if (settings.dailyReminder && settings.dailyReminderTime) {
    const [hour, minute] = settings.dailyReminderTime.split(':').map(Number);
    await scheduleDailyReminder(hour, minute);
  } else {
    await cancelDailyReminder();
  }

  // Streak warning
  if (settings.streakReminder) {
    await scheduleStreakWarning();
  } else {
    await cancelStreakWarning();
  }
};

// Cancel all notifications
export const cancelAllNotifications = async () => {
  await Notifications.cancelAllScheduledNotificationsAsync();
};

// Get all scheduled notifications (for debugging)
export const getScheduledNotifications = async () => {
  return await Notifications.getAllScheduledNotificationsAsync();
};

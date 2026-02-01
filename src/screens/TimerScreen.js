import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Vibration, AppState,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { SIZES } from '../constants/theme';
import { useTheme } from '../context/ThemeContext';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { formatTime } from '../utils/helpers';
import { showInterstitialAd } from '../components/AdBanner';
import GradientBackground from '../components/GradientBackground';
import {
  scheduleTimerNotification,
  cancelTimerNotification,
  showTimerCompleteNotification,
} from '../services/notificationService';

export default function TimerScreen({ navigation }) {
  const { colors } = useTheme();
  const styles = useStyles(colors);
  const { settings, addTimerSession, isPremium } = useApp();
  const { t } = useLanguage();
  const [mode, setMode] = useState(0);
  const [timeLeft, setTimeLeft] = useState(settings.pomodoroDuration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);
  const settingsRef = useRef(settings);

  // Keep settingsRef updated
  useEffect(() => {
    settingsRef.current = settings;
  }, [settings]);

  const MODES = useMemo(() => [
    { key: 'focus', label: t('timer.focus'), color: colors.primary, icon: 'flash' },
    { key: 'short', label: t('timer.shortBreak'), color: colors.accent, icon: 'cafe' },
    { key: 'long', label: t('timer.longBreak'), color: colors.info, icon: 'leaf' },
  ], [colors, t]);

  const currentMode = MODES[mode];

  const getDuration = useCallback(() => {
    const s = settingsRef.current;
    switch (mode) {
      case 0: return s.pomodoroDuration * 60;
      case 1: return s.shortBreak * 60;
      case 2: return s.longBreak * 60;
      default: return s.pomodoroDuration * 60;
    }
  }, [mode]);

  useEffect(() => {
    setTimeLeft(getDuration());
    setIsRunning(false);
  }, [mode, getDuration]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            handleTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const handleTimerComplete = async () => {
    setIsRunning(false);

    // Cancel any scheduled notification
    await cancelTimerNotification();

    // Show completion notification
    const isBreak = mode !== 0;
    if (settingsRef.current.timerNotification) {
      await showTimerCompleteNotification(isBreak);
    }

    // Use ref to get current settings value (avoids closure issue)
    if (settingsRef.current.vibration) {
      // Use both Haptics and Vibration for reliability
      try {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        // Also use native vibration pattern for longer feedback
        Vibration.vibrate([0, 400, 200, 400, 200, 400]);
      } catch (e) {
        // Fallback to just Vibration if Haptics fails
        Vibration.vibrate([0, 400, 200, 400, 200, 400]);
      }
    }

    if (mode === 0) {
      const duration = settingsRef.current.pomodoroDuration * 60;
      await addTimerSession(duration, 'focus');
      const newCount = sessionsCompleted + 1;
      setSessionsCompleted(newCount);

      if (!isPremium && newCount % 2 === 0) {
        showInterstitialAd(() => {
          if (newCount % 4 === 0) {
            setMode(2);
          } else {
            setMode(1);
          }
        });
      } else {
        if (newCount % 4 === 0) {
          setMode(2);
        } else {
          setMode(1);
        }
      }
    } else {
      setMode(0);
    }
  };

  const toggleTimer = async () => {
    if (!isRunning) {
      // Starting timer - schedule notification for background
      startTimeRef.current = Date.now();
      const isBreak = mode !== 0;
      if (settingsRef.current.timerNotification) {
        await scheduleTimerNotification(timeLeft, isBreak);
      }
    } else {
      // Pausing timer - cancel scheduled notification
      await cancelTimerNotification();
    }
    setIsRunning(!isRunning);
  };

  const resetTimer = async () => {
    setIsRunning(false);
    await cancelTimerNotification();
    setTimeLeft(getDuration());
  };

  const totalDuration = getDuration();
  const progress = timeLeft / totalDuration;

  return (
    <GradientBackground>
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Mode Selector */}
      <View style={styles.modeSelector}>
        {MODES.map((m, index) => (
          <TouchableOpacity
            key={m.key}
            style={[
              styles.modeButton,
              mode === index && { backgroundColor: m.color + '30', borderColor: m.color },
            ]}
            onPress={() => {
              if (!isRunning) setMode(index);
            }}
          >
            <View style={styles.modeContent}>
              <Ionicons
                name={m.icon}
                size={14}
                color={mode === index ? m.color : colors.textSecondary}
                style={{ marginRight: 4 }}
              />
              <Text style={[
                styles.modeText,
                mode === index && { color: m.color },
              ]}>
                {m.label}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Timer Circle */}
      <View style={styles.timerContainer}>
        <View style={styles.timerCircle}>
          <View style={[styles.progressRing, { borderColor: currentMode.color + '20' }]}>
            <View style={[
              styles.progressArc,
              {
                borderColor: currentMode.color,
                opacity: progress,
              },
            ]} />
          </View>
          <View style={styles.timerInner}>
            <View style={[styles.timerIconContainer, { backgroundColor: currentMode.color + '20' }]}>
              <Ionicons name={currentMode.icon} size={28} color={currentMode.color} />
            </View>
            <Text style={[styles.timerText, { color: currentMode.color }]}>
              {formatTime(timeLeft)}
            </Text>
            <Text style={styles.timerLabel}>
              {mode === 0 ? t('timer.focusTime') : t('timer.breakTime')}
            </Text>
          </View>
        </View>
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton} onPress={resetTimer}>
          <Ionicons name="refresh" size={24} color={colors.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.playButton, { backgroundColor: currentMode.color }]}
          onPress={toggleTimer}
          activeOpacity={0.8}
        >
          <Ionicons
            name={isRunning ? 'pause' : 'play'}
            size={32}
            color="#FFFFFF"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => {
            if (!isRunning) {
              setMode((mode + 1) % 3);
            }
          }}
        >
          <Ionicons name="play-skip-forward" size={24} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>

      {/* Session Counter */}
      <View style={styles.sessionInfo}>
        <View style={styles.sessionRow}>
          <Ionicons name="timer-outline" size={18} color={colors.primary} style={{ marginRight: 6 }} />
          <Text style={styles.sessionText}>
            {t('timer.sessionsToday', { count: sessionsCompleted })}
          </Text>
        </View>
        {sessionsCompleted > 0 && (
          <Text style={styles.sessionMinutes}>
            = {t('timer.focusMinutes', { minutes: sessionsCompleted * settings.pomodoroDuration })}
          </Text>
        )}
      </View>

      {/* Quick Settings */}
      {!isPremium && (
        <View style={styles.premiumTip}>
          <TouchableOpacity
            style={styles.premiumTipButton}
            onPress={() => navigation.navigate('Premium')}
          >
            <View style={styles.premiumTipRow}>
              <Ionicons name="star" size={16} color={colors.primary} style={{ marginRight: 6 }} />
              <Text style={styles.premiumTipText}>
                {t('timer.premiumTip')}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )}

    </SafeAreaView>
    </GradientBackground>
  );
}

const useStyles = (COLORS) => useMemo(() => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  modeSelector: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.padding,
    gap: 8,
    marginBottom: 20,
  },
  modeButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: SIZES.radiusXl,
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  modeContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modeText: {
    fontSize: SIZES.sm,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  timerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginTop: -20,
  },
  timerCircle: {
    width: 260,
    height: 260,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressRing: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    borderWidth: 6,
  },
  progressArc: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 130,
    borderWidth: 6,
  },
  timerInner: {
    alignItems: 'center',
  },
  timerIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  timerText: {
    fontSize: 56,
    fontWeight: '200',
    fontVariant: ['tabular-nums'],
  },
  timerLabel: {
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    marginBottom: 24,
  },
  controlButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  sessionInfo: {
    alignItems: 'center',
    marginBottom: 16,
  },
  sessionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sessionText: {
    fontSize: SIZES.md,
    color: COLORS.textSecondary,
  },
  sessionMinutes: {
    fontSize: SIZES.sm,
    color: COLORS.textMuted,
    marginTop: 4,
  },
  premiumTip: {
    paddingHorizontal: SIZES.padding,
    marginBottom: 8,
  },
  premiumTipButton: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary + '30',
  },
  premiumTipRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  premiumTipText: {
    fontSize: SIZES.sm,
    color: COLORS.primary,
  },
}), [COLORS]);

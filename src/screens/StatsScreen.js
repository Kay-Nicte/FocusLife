import React, { useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { SIZES } from '../constants/theme';
import { useTheme } from '../context/ThemeContext';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import {
  getToday, getLast7Days, getLast30Days,
  calculateStreak, getCompletionRate, getDayOfWeek,
} from '../utils/helpers';
import StatCard from '../components/StatCard';
import WeeklyChart from '../components/WeeklyChart';
import GradientBackground from '../components/GradientBackground';

export default function StatsScreen({ navigation }) {
  const { colors } = useTheme();
  const styles = useStyles(colors);
  const { habits, completions, timerSessions, isPremium } = useApp();
  const { t } = useLanguage();
  const today = getToday();
  const last7 = getLast7Days();
  const last30 = getLast30Days();

  const stats = useMemo(() => {
    const completedToday = habits.filter(h =>
      completions[h.id] && completions[h.id].includes(today)
    ).length;

    let bestStreak = 0;
    let bestHabit = null;
    habits.forEach(h => {
      const streak = calculateStreak(completions[h.id] || []);
      if (streak > bestStreak) {
        bestStreak = streak;
        bestHabit = h;
      }
    });

    const weeklyRate = getCompletionRate(habits, completions, last7);
    const monthlyRate = getCompletionRate(habits, completions, last30);

    let totalCompletions = 0;
    Object.values(completions).forEach(dates => {
      totalCompletions += dates.length;
    });

    const todaySessions = timerSessions.filter(s => s.date === today && s.type === 'focus');
    const focusMinutesToday = todaySessions.reduce((sum, s) => sum + s.duration, 0) / 60;

    const totalFocusMinutes = timerSessions
      .filter(s => s.type === 'focus')
      .reduce((sum, s) => sum + s.duration, 0) / 60;

    const weekSessions = timerSessions.filter(
      s => last7.includes(s.date) && s.type === 'focus'
    );

    // Advanced stats for premium users
    const habitStreaks = habits.map(h => ({
      name: h.name,
      icon: h.icon,
      color: h.color,
      streak: calculateStreak(completions[h.id] || []),
    })).sort((a, b) => b.streak - a.streak);

    // Best day of the week — on tie, pick the most recent day relative to today
    const dayCounts = [0, 0, 0, 0, 0, 0, 0]; // Sun-Sat
    Object.values(completions).forEach(dates => {
      dates.forEach(dateStr => {
        const dayIndex = new Date(dateStr + 'T00:00:00').getDay();
        dayCounts[dayIndex]++;
      });
    });
    const maxDayCount = Math.max(...dayCounts);
    let bestDayIndex;
    if (maxDayCount === 0) {
      bestDayIndex = -1;
    } else {
      const todayDow = new Date().getDay();
      // Among all days with the max count, pick the most recent one (closest before or equal to today)
      const candidates = dayCounts
        .map((c, i) => ({ count: c, day: i }))
        .filter(d => d.count === maxDayCount);
      candidates.sort((a, b) => {
        const distA = (todayDow - a.day + 7) % 7;
        const distB = (todayDow - b.day + 7) % 7;
        return distA - distB;
      });
      bestDayIndex = candidates[0].day;
    }

    // Consistency: days with at least 1 habit completed / total tracked days
    const allDates = new Set();
    const completedDates = new Set();
    Object.values(completions).forEach(dates => {
      dates.forEach(d => {
        allDates.add(d);
        completedDates.add(d);
      });
    });
    habits.forEach(h => {
      if (h.createdAt) allDates.add(h.createdAt);
    });
    const consistencyDays = allDates.size;
    const consistencyRate = consistencyDays > 0
      ? Math.round((completedDates.size / consistencyDays) * 100)
      : 0;

    return {
      completedToday,
      bestStreak,
      bestHabit,
      weeklyRate,
      monthlyRate,
      totalCompletions,
      focusMinutesToday: Math.round(focusMinutesToday),
      totalFocusMinutes: Math.round(totalFocusMinutes),
      totalFocusSessions: timerSessions.filter(s => s.type === 'focus').length,
      weekFocusSessions: weekSessions.length,
      habitStreaks,
      bestDayIndex,
      bestDayCount: dayCounts[bestDayIndex],
      consistencyRate,
    };
  }, [habits, completions, timerSessions, today]);

  return (
    <GradientBackground>
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>{t('stats.title')}</Text>
        <Text style={styles.subtitle}>{t('stats.subtitle')}</Text>

        {/* Today Summary */}
        <View style={styles.row}>
          <StatCard
            iconName="checkmark-circle"
            title={t('common.today')}
            value={`${stats.completedToday}/${habits.length}`}
            color={colors.primary}
          />
          <StatCard
            iconName="flame"
            title={t('stats.bestStreak')}
            value={`${stats.bestStreak}d`}
            subtitle={stats.bestHabit?.name}
            color={colors.accentOrange}
          />
        </View>

        {/* Rates */}
        <View style={styles.row}>
          <StatCard
            iconName="calendar"
            title={t('stats.week')}
            value={`${stats.weeklyRate}%`}
            color={colors.accent}
          />
          <StatCard
            iconName="stats-chart"
            title={t('stats.month')}
            value={`${stats.monthlyRate}%`}
            color={colors.info}
          />
        </View>

        {/* Weekly Chart */}
        <WeeklyChart habits={habits} completions={completions} />

        {/* Focus Time Section */}
        <View style={styles.sectionHeader}>
          <Ionicons name="timer" size={20} color={colors.secondary} />
          <Text style={styles.sectionTitle}>{t('stats.pomodoroFocus')}</Text>
        </View>
        <View style={styles.row}>
          <StatCard
            iconName="time"
            title={t('common.today')}
            value={`${stats.focusMinutesToday}m`}
            color={colors.primary}
          />
          <StatCard
            iconName="fitness"
            title={t('stats.total')}
            value={`${stats.totalFocusMinutes}m`}
            subtitle={t('stats.sessions', { count: stats.totalFocusSessions })}
            color={colors.secondary}
          />
        </View>

        {/* Total Achievements */}
        <View style={styles.sectionHeader}>
          <Ionicons name="trophy" size={20} color={colors.gold} />
          <Text style={styles.sectionTitle}>{t('stats.totalAchievements')}</Text>
        </View>
        <View style={styles.achievementCard}>
          <View style={styles.achievementRow}>
            <View style={[styles.achievementIcon, { backgroundColor: colors.success + '20' }]}>
              <Ionicons name="checkmark-done" size={20} color={colors.success} />
            </View>
            <View style={styles.achievementInfo}>
              <Text style={styles.achievementValue}>{stats.totalCompletions}</Text>
              <Text style={styles.achievementLabel}>{t('stats.habitsCompletedTotal')}</Text>
            </View>
          </View>
          <View style={styles.achievementRow}>
            <View style={[styles.achievementIcon, { backgroundColor: colors.info + '20' }]}>
              <Ionicons name="list" size={20} color={colors.info} />
            </View>
            <View style={styles.achievementInfo}>
              <Text style={styles.achievementValue}>{habits.length}</Text>
              <Text style={styles.achievementLabel}>{t('stats.activeHabits')}</Text>
            </View>
          </View>
          <View style={styles.achievementRow}>
            <View style={[styles.achievementIcon, { backgroundColor: colors.secondary + '20' }]}>
              <Ionicons name="timer" size={20} color={colors.secondary} />
            </View>
            <View style={styles.achievementInfo}>
              <Text style={styles.achievementValue}>{stats.weekFocusSessions}</Text>
              <Text style={styles.achievementLabel}>{t('stats.focusSessionsWeek')}</Text>
            </View>
          </View>
        </View>

        {/* Advanced Stats (Premium) or CTA (Free) */}
        {isPremium ? (
          <>
            <View style={styles.sectionHeader}>
              <Ionicons name="bar-chart" size={20} color={colors.primary} />
              <Text style={styles.sectionTitle}>{t('stats.advancedStats')}</Text>
            </View>

            {/* Best day & Consistency */}
            <View style={styles.row}>
              <StatCard
                iconName="calendar"
                title={t('stats.bestDay')}
                value={stats.bestDayIndex < 0 ? '-' : getDayOfWeek((() => {
                  const d = new Date();
                  const diff = stats.bestDayIndex - d.getDay();
                  d.setDate(d.getDate() + diff);
                  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
                })(), t)}
                subtitle={t('stats.bestDayDesc')}
                color={colors.accent}
              />
              <StatCard
                iconName="ribbon"
                title={t('stats.consistency')}
                value={`${stats.consistencyRate}%`}
                subtitle={t('stats.consistencyDesc')}
                color={colors.secondary}
              />
            </View>

            {/* Per-habit streaks */}
            <Text style={[styles.sectionTitle, { marginTop: 4, marginBottom: 12 }]}>
              {t('stats.habitStreaks')}
            </Text>
            {stats.habitStreaks.length > 0 ? (
              <View style={styles.achievementCard}>
                {stats.habitStreaks.map((h, index) => (
                  <View key={index} style={styles.achievementRow}>
                    <View style={[styles.achievementIcon, { backgroundColor: (h.color || colors.primary) + '20' }]}>
                      <Ionicons name={h.icon || 'checkmark'} size={20} color={h.color || colors.primary} />
                    </View>
                    <View style={styles.achievementInfo}>
                      <Text style={styles.achievementValue}>{h.name}</Text>
                      <Text style={styles.achievementLabel}>
                        {h.streak} {h.streak === 1 ? t('common.day') : t('common.days')} - {t('stats.currentStreak')}
                      </Text>
                    </View>
                    <Ionicons
                      name="flame"
                      size={20}
                      color={h.streak > 0 ? colors.accentOrange : colors.textMuted}
                    />
                  </View>
                ))}
              </View>
            ) : (
              <Text style={styles.premiumText}>{t('stats.noStreakData')}</Text>
            )}
          </>
        ) : (
          <View style={styles.premiumCard}>
            <View style={[styles.premiumIconContainer, { backgroundColor: colors.primary + '20' }]}>
              <Ionicons name="bar-chart" size={28} color={colors.primary} />
            </View>
            <Text style={styles.premiumTitle}>{t('stats.advancedStats')}</Text>
            <Text style={styles.premiumText}>
              {t('stats.premiumDescription')}
            </Text>
          </View>
        )}

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
    </GradientBackground>
  );
}

const useStyles = (COLORS) => useMemo(() => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: SIZES.padding,
  },
  title: {
    fontSize: SIZES.xxl,
    fontWeight: '800',
    color: COLORS.text,
  },
  subtitle: {
    fontSize: SIZES.md,
    color: COLORS.textSecondary,
    marginTop: 4,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 12,
    gap: 8,
  },
  sectionTitle: {
    fontSize: SIZES.xl,
    fontWeight: '700',
    color: COLORS.text,
  },
  achievementCard: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginBottom: 16,
  },
  achievementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  achievementIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementValue: {
    fontSize: SIZES.xl,
    fontWeight: '800',
    color: COLORS.text,
  },
  achievementLabel: {
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
  },
  premiumCard: {
    backgroundColor: COLORS.primary + '15',
    borderRadius: SIZES.radiusLg,
    padding: SIZES.paddingLg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary + '40',
    marginBottom: 16,
  },
  premiumIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  premiumTitle: {
    fontSize: SIZES.lg,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 8,
  },
  premiumText: {
    fontSize: SIZES.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
}), [COLORS]);

import React, { useMemo, useRef, useCallback } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity, StatusBar, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { SIZES } from '../constants/theme';
import { useTheme } from '../context/ThemeContext';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { getToday, calculateStreak, getRandomQuote } from '../utils/helpers';
import HabitCard from '../components/HabitCard';
import { showInterstitialAd } from '../components/AdBanner';
import GradientBackground from '../components/GradientBackground';

export default function HomeScreen({ navigation }) {
  const { colors, isDark } = useTheme();
  const styles = useStyles(colors);
  const { habits, completions, toggleHabitCompletion, deleteHabit, isPremium, username } = useApp();
  const { t, locale } = useLanguage();
  const today = getToday();

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t('home.goodMorning');
    if (hour < 20) return t('home.goodAfternoon');
    return t('home.goodEvening');
  };

  const quote = useMemo(() => getRandomQuote(t), [today, locale]);

  const completedToday = habits.filter(h =>
    completions[h.id] && completions[h.id].includes(today)
  ).length;

  const bestStreak = useMemo(() => {
    let max = 0;
    habits.forEach(h => {
      const streak = calculateStreak(completions[h.id] || []);
      if (streak > max) max = streak;
    });
    return max;
  }, [habits, completions]);

  const progressPercent = habits.length > 0
    ? Math.round((completedToday / habits.length) * 100)
    : 0;

  const allCompletedShownRef = useRef(false);

  const handleToggle = useCallback((habitId) => {
    toggleHabitCompletion(habitId);

    const today = getToday();
    const willBeCompleted = habits.every(h => {
      if (h.id === habitId) {
        return !(completions[h.id] && completions[h.id].includes(today));
      }
      return completions[h.id] && completions[h.id].includes(today);
    });

    if (willBeCompleted && habits.length > 0 && !isPremium && !allCompletedShownRef.current) {
      allCompletedShownRef.current = true;
      setTimeout(() => showInterstitialAd(), 800);
    }
  }, [habits, completions, isPremium, toggleHabitCompletion]);

  const handleDelete = (habitId) => {
    const habit = habits.find(h => h.id === habitId);
    Alert.alert(
      t('home.deleteHabit'),
      t('home.deleteConfirm', { name: habit?.name }),
      [
        { text: t('common.cancel'), style: 'cancel' },
        { text: t('common.delete'), style: 'destructive', onPress: () => deleteHabit(habitId) },
      ]
    );
  };

  return (
    <GradientBackground>
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} translucent backgroundColor="transparent" />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>
              {getGreeting()}{username ? `, ${username}` : ''}
            </Text>
            <Text style={styles.date}>
              {new Date().toLocaleDateString(locale, {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
              })}
            </Text>
          </View>
          {!isPremium && (
            <TouchableOpacity
              style={styles.premiumBadge}
              onPress={() => navigation.navigate('Premium')}
            >
              <View style={styles.premiumBadgeContent}>
                <Ionicons name="star" size={12} color={colors.primary} style={{ marginRight: 4 }} />
                <Text style={styles.premiumBadgeText}>PRO</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>

        {/* Quote Card */}
        <View style={styles.quoteCard}>
          <Text style={styles.quoteText}>"{quote.text}"</Text>
          <Text style={styles.quoteAuthor}>- {quote.author}</Text>
        </View>

        {/* Progress Summary */}
        <View style={styles.progressContainer}>
          <View style={styles.progressCard}>
            <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
            <Text style={styles.progressValue}>{completedToday}/{habits.length}</Text>
            <Text style={styles.progressLabel}>{t('common.today')}</Text>
          </View>
          <View style={styles.progressCard}>
            <Ionicons name="pie-chart" size={24} color={colors.accent} />
            <Text style={styles.progressValue}>{progressPercent}%</Text>
            <Text style={styles.progressLabel}>{t('home.completed')}</Text>
          </View>
          <View style={styles.progressCard}>
            <Ionicons name="flame" size={24} color={colors.accentOrange} />
            <Text style={styles.progressValue}>{bestStreak}</Text>
            <Text style={styles.progressLabel}>{t('home.bestStreak')}</Text>
          </View>
        </View>

        {/* Progress Bar */}
        {habits.length > 0 && (
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBg}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${progressPercent}%` },
                  progressPercent === 100 && styles.progressBarComplete,
                ]}
              />
            </View>
            {progressPercent === 100 && (
              <View style={styles.completeContainer}>
                <Ionicons name="trophy" size={16} color={colors.success} />
                <Text style={styles.completeText}>{t('home.allCompleted')}</Text>
              </View>
            )}
          </View>
        )}

        {/* Today's Habits */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{t('home.todayHabits')}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Habits')}>
            <Text style={styles.seeAll}>{t('home.seeAll')}</Text>
          </TouchableOpacity>
        </View>

        {habits.length === 0 ? (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconContainer}>
              <Ionicons name="leaf" size={48} color={colors.primary} />
            </View>
            <Text style={styles.emptyTitle}>{t('home.emptyTitle')}</Text>
            <Text style={styles.emptyText}>
              {t('home.emptyText')}
            </Text>
            <TouchableOpacity
              style={styles.emptyButton}
              onPress={() => navigation.navigate('Habits')}
            >
              <Text style={styles.emptyButtonText}>{t('home.createHabit')}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          habits.map(habit => (
            <HabitCard
              key={habit.id}
              habit={habit}
              completions={completions}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontSize: SIZES.xxl,
    fontWeight: '800',
    color: COLORS.text,
  },
  date: {
    fontSize: SIZES.md,
    color: COLORS.textSecondary,
    marginTop: 4,
    textTransform: 'capitalize',
  },
  premiumBadge: {
    backgroundColor: COLORS.primary + '30',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  premiumBadgeContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  premiumBadgeText: {
    color: COLORS.primary,
    fontSize: SIZES.sm,
    fontWeight: '700',
  },
  quoteCard: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radiusLg,
    padding: SIZES.paddingLg,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  quoteText: {
    fontSize: SIZES.md,
    color: COLORS.text,
    fontStyle: 'italic',
    lineHeight: 22,
  },
  quoteAuthor: {
    fontSize: SIZES.sm,
    color: COLORS.textMuted,
    marginTop: 8,
  },
  progressContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
  },
  progressCard: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    padding: 12,
    alignItems: 'center',
    gap: 4,
  },
  progressValue: {
    fontSize: SIZES.xl,
    fontWeight: '800',
    color: COLORS.text,
  },
  progressLabel: {
    fontSize: SIZES.xs,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  progressBarContainer: {
    marginBottom: 20,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: COLORS.card,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 4,
  },
  progressBarComplete: {
    backgroundColor: COLORS.success,
  },
  completeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    gap: 6,
  },
  completeText: {
    fontSize: SIZES.sm,
    color: COLORS.success,
    fontWeight: '600',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: SIZES.xl,
    fontWeight: '700',
    color: COLORS.text,
  },
  seeAll: {
    fontSize: SIZES.md,
    color: COLORS.primary,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    padding: SIZES.paddingLg,
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radiusLg,
    marginBottom: 16,
  },
  emptyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary + '15',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: SIZES.xl,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: SIZES.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 16,
  },
  emptyButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: SIZES.radiusXl,
  },
  emptyButtonText: {
    color: '#FFFFFF',
    fontSize: SIZES.lg,
    fontWeight: '700',
  },
}), [COLORS]);

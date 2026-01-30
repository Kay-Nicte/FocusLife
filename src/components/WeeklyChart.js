import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SIZES } from '../constants/theme';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { getLast7Days, getDayOfWeek, getToday } from '../utils/helpers';

export default function WeeklyChart({ habits, completions }) {
  const { colors } = useTheme();
  const { t } = useLanguage();
  const styles = useStyles(colors);
  const days = getLast7Days();
  const today = getToday();

  const getCompletionForDay = (day) => {
    if (!habits.length) return 0;
    let completed = 0;
    habits.forEach(habit => {
      if (completions[habit.id] && completions[habit.id].includes(day)) {
        completed++;
      }
    });
    return habits.length > 0 ? completed / habits.length : 0;
  };

  const maxBarHeight = 100;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('stats.thisWeek')}</Text>
      <View style={styles.chart}>
        {days.map((day) => {
          const rate = getCompletionForDay(day);
          const barHeight = Math.max(rate * maxBarHeight, 4);
          const isToday = day === today;

          return (
            <View key={day} style={styles.barContainer}>
              <Text style={styles.percentage}>
                {Math.round(rate * 100)}%
              </Text>
              <View style={styles.barBackground}>
                <View
                  style={[
                    styles.bar,
                    {
                      height: barHeight,
                      backgroundColor: rate >= 1
                        ? colors.success
                        : rate >= 0.5
                          ? colors.primary
                          : rate > 0
                            ? colors.primaryLight
                            : colors.border,
                    },
                  ]}
                />
              </View>
              <Text style={[styles.dayLabel, isToday && styles.dayLabelToday]}>
                {getDayOfWeek(day, t)}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const useStyles = (COLORS) => useMemo(() => StyleSheet.create({
  container: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginBottom: 16,
  },
  title: {
    fontSize: SIZES.lg,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 16,
  },
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 140,
  },
  barContainer: {
    flex: 1,
    alignItems: 'center',
  },
  percentage: {
    fontSize: 9,
    color: COLORS.textMuted,
    marginBottom: 4,
  },
  barBackground: {
    width: 24,
    height: 100,
    backgroundColor: COLORS.backgroundLight,
    borderRadius: 12,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  bar: {
    width: '100%',
    borderRadius: 12,
    minHeight: 4,
  },
  dayLabel: {
    fontSize: SIZES.xs,
    color: COLORS.textSecondary,
    marginTop: 6,
  },
  dayLabelToday: {
    color: COLORS.primary,
    fontWeight: '700',
  },
}), [COLORS]);

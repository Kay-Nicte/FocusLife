import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SIZES, SHADOWS } from '../constants/theme';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { calculateStreak, getToday } from '../utils/helpers';

export default function HabitCard({ habit, completions, onToggle, onDelete, onEdit }) {
  const { colors } = useTheme();
  const { t } = useLanguage();
  const styles = useStyles(colors);
  const today = getToday();
  const habitCompletions = completions[habit.id] || [];
  const isCompletedToday = habitCompletions.includes(today);
  const streak = calculateStreak(habitCompletions);

  return (
    <View
      style={[
        styles.card,
        isCompletedToday && styles.cardCompleted,
        { borderLeftColor: habit.color || colors.primary },
      ]}
    >
      <TouchableOpacity
        style={styles.left}
        onPress={() => onToggle(habit.id)}
        onLongPress={() => onDelete(habit.id)}
        activeOpacity={0.7}
      >
        <View style={[styles.iconContainer, { backgroundColor: (habit.color || colors.primary) + '20' }]}>
          <Ionicons name={habit.icon} size={22} color={habit.color || colors.primary} />
        </View>
        <View style={styles.info}>
          <Text style={[styles.name, isCompletedToday && styles.nameCompleted]}>
            {habit.name}
          </Text>
          {streak > 0 && (
            <View style={styles.streakRow}>
              <Ionicons name="flame" size={14} color={colors.accentOrange} style={{ marginRight: 4 }} />
              <Text style={styles.streakText}>{streak} {streak !== 1 ? t('common.days') : t('common.day')}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
      <View style={styles.actions}>
        {onEdit && (
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => onEdit(habit)}
          >
            <Ionicons name="pencil" size={18} color={colors.textMuted} />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.checkCircle, isCompletedToday && styles.checkCircleActive]}
          onPress={() => onToggle(habit.id)}
        >
          {isCompletedToday && (
            <Ionicons name="checkmark" size={20} color={colors.text} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const useStyles = (COLORS) => useMemo(() => StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginBottom: 12,
    borderLeftWidth: 4,
    ...SHADOWS.small,
  },
  cardCompleted: {
    backgroundColor: COLORS.cardLight,
    opacity: 0.85,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: SIZES.lg,
    fontWeight: '600',
    color: COLORS.text,
  },
  nameCompleted: {
    textDecorationLine: 'line-through',
    color: COLORS.textSecondary,
  },
  streakRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  streakText: {
    fontSize: SIZES.sm,
    color: COLORS.accentOrange,
    fontWeight: '500',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  editButton: {
    padding: 6,
  },
  checkCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkCircleActive: {
    backgroundColor: COLORS.success,
    borderColor: COLORS.success,
  },
}), [COLORS]);

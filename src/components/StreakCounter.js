import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SIZES } from '../constants/theme';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export default function StreakCounter({ streak, label }) {
  const { colors } = useTheme();
  const { t } = useLanguage();
  const styles = useStyles(colors);

  const getStreakColor = () => {
    if (streak >= 30) return colors.gold;
    if (streak >= 7) return colors.accentOrange;
    if (streak >= 3) return colors.accent;
    return colors.textSecondary;
  };

  const getStreakIcon = () => {
    if (streak >= 30) return 'trophy';
    if (streak >= 14) return 'flame';
    if (streak >= 7) return 'star';
    if (streak >= 3) return 'fitness';
    if (streak >= 1) return 'checkmark-circle';
    return 'time-outline';
  };

  const streakColor = getStreakColor();

  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: streakColor + '20' }]}>
        <Ionicons name={getStreakIcon()} size={28} color={streakColor} />
      </View>
      <Text style={[styles.number, { color: streakColor }]}>{streak}</Text>
      <Text style={styles.label}>{label || (streak !== 1 ? t('streak.daysInRow') : t('streak.dayInRow'))}</Text>
    </View>
  );
}

const useStyles = (COLORS) => useMemo(() => StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SIZES.padding,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  number: {
    fontSize: SIZES.xxxl,
    fontWeight: '800',
  },
  label: {
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
}), [COLORS]);

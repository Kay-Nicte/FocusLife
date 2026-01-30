import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SIZES, SHADOWS } from '../constants/theme';
import { useTheme } from '../context/ThemeContext';

export default function StatCard({ title, value, subtitle, iconName, color }) {
  const { colors } = useTheme();
  const styles = useStyles(colors);

  return (
    <View style={[styles.card, color && { borderTopColor: color }]}>
      <View style={[styles.iconContainer, { backgroundColor: (color || colors.primary) + '20' }]}>
        <Ionicons name={iconName} size={20} color={color || colors.primary} />
      </View>
      <Text style={[styles.value, color && { color }]}>{value}</Text>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

const useStyles = (COLORS) => useMemo(() => StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    alignItems: 'center',
    borderTopWidth: 3,
    borderTopColor: COLORS.primary,
    marginHorizontal: 4,
    ...SHADOWS.small,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  value: {
    fontSize: SIZES.xxl,
    fontWeight: '800',
    color: COLORS.text,
  },
  title: {
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: SIZES.xs,
    color: COLORS.textMuted,
    marginTop: 2,
    textAlign: 'center',
  },
}), [COLORS]);

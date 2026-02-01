import React, { useState, useMemo } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity,
  Modal, TextInput, Alert, FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { SIZES, HABIT_ICONS, FREE_HABIT_LIMIT } from '../constants/theme';
import { useTheme } from '../context/ThemeContext';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import HabitCard from '../components/HabitCard';
import { useRewardedAd } from '../components/AdBanner';
import GradientBackground from '../components/GradientBackground';

const HABIT_COLORS = [
  '#6C63FF', '#FF6584', '#43E97B', '#FFB347',
  '#63B3ED', '#F687B3', '#68D391', '#FC8181',
  '#B794F4', '#4FD1C5', '#FBD38D', '#90CDF4',
];

export default function HabitsScreen({ navigation }) {
  const { colors } = useTheme();
  const styles = useStyles(colors);
  const { habits, completions, toggleHabitCompletion, addHabit, updateHabit, deleteHabit, isPremium } = useApp();
  const { t } = useLanguage();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingHabit, setEditingHabit] = useState(null);
  const [newHabitName, setNewHabitName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState(HABIT_ICONS[0]);
  const [selectedColor, setSelectedColor] = useState(HABIT_COLORS[0]);
  const [bonusHabits, setBonusHabits] = useState(0);
  const { showRewardedAd, isLoaded: rewardedReady } = useRewardedAd();

  const MAX_BONUS_HABITS = 1; // Only 1 extra habit via ads
  const canAddHabit = isPremium || habits.length < (FREE_HABIT_LIMIT + bonusHabits);
  const canWatchAdForBonus = bonusHabits < MAX_BONUS_HABITS && habits.length < (FREE_HABIT_LIMIT + MAX_BONUS_HABITS);

  const resetModal = () => {
    setNewHabitName('');
    setSelectedIcon(HABIT_ICONS[0]);
    setSelectedColor(HABIT_COLORS[0]);
    setEditingHabit(null);
    setModalVisible(false);
  };

  const handleEditHabit = (habit) => {
    setEditingHabit(habit);
    setNewHabitName(habit.name);
    const iconObj = HABIT_ICONS.find(i => i.icon === habit.icon) || HABIT_ICONS[0];
    setSelectedIcon(iconObj);
    setSelectedColor(habit.color || HABIT_COLORS[0]);
    setModalVisible(true);
  };

  const handleSaveHabit = async () => {
    if (!newHabitName.trim()) {
      Alert.alert(t('common.error'), t('habits.nameRequired'));
      return;
    }

    if (editingHabit) {
      await updateHabit(editingHabit.id, {
        name: newHabitName.trim(),
        icon: selectedIcon.icon,
        color: selectedColor,
      });
      resetModal();
      return;
    }

    const result = await addHabit({
      name: newHabitName.trim(),
      icon: selectedIcon.icon,
      color: selectedColor,
    }, { bonusSlots: bonusHabits });

    if (result.error === 'PREMIUM_REQUIRED') {
      const options = [
        { text: t('common.cancel'), style: 'cancel' },
        { text: t('habits.seePremium'), onPress: () => { resetModal(); navigation.navigate('Premium'); } },
      ];
      if (rewardedReady && canWatchAdForBonus) {
        options.splice(1, 0, {
          text: t('habits.watchAd'),
          onPress: () => {
            showRewardedAd(() => {
              setBonusHabits(prev => prev + 1);
              Alert.alert(t('habits.reward'), t('habits.rewardUnlocked'));
            });
          },
        });
      }
      const message = canWatchAdForBonus
        ? t('habits.limitMessageAd', { limit: FREE_HABIT_LIMIT })
        : t('habits.limitMessageMax', { limit: FREE_HABIT_LIMIT + MAX_BONUS_HABITS });
      Alert.alert(t('habits.limitReached'), message, options);
      return;
    }

    resetModal();
  };

  const handleDeleteHabit = (habitId) => {
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
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{t('habits.title')}</Text>
          <Text style={styles.subtitle}>
            {habits.length === 1 ? t('habits.subtitle', { count: habits.length }) : t('habits.subtitlePlural', { count: habits.length })}
            {!isPremium && ` ${t('habits.maxFree', { limit: FREE_HABIT_LIMIT })}`}
          </Text>
        </View>

        {/* Habit List */}
        {habits.length === 0 ? (
          <View style={styles.emptyState}>
            <View style={[styles.emptyIconContainer, { backgroundColor: colors.primary + '15' }]}>
              <Ionicons name="list-outline" size={48} color={colors.primary} />
            </View>
            <Text style={styles.emptyTitle}>{t('habits.emptyTitle')}</Text>
            <Text style={styles.emptyText}>
              {t('habits.emptyText')}
            </Text>
          </View>
        ) : (
          habits.map(habit => (
            <HabitCard
              key={habit.id}
              habit={habit}
              completions={completions}
              onToggle={toggleHabitCompletion}
              onDelete={handleDeleteHabit}
              onEdit={handleEditHabit}
            />
          ))
        )}

        {/* Tip */}
        <View style={styles.tipCard}>
          <View style={[styles.tipIconContainer, { backgroundColor: colors.warning + '20' }]}>
            <Ionicons name="bulb-outline" size={18} color={colors.warning} />
          </View>
          <Text style={styles.tipText}>
            {t('habits.tip')}
          </Text>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* FAB - Add Habit */}
      <TouchableOpacity
        style={[styles.fab, !canAddHabit && styles.fabDisabled]}
        onPress={() => {
          if (canAddHabit) {
            setModalVisible(true);
          } else {
            const options = [
              { text: t('common.cancel'), style: 'cancel' },
              { text: t('habits.seePremium'), onPress: () => navigation.navigate('Premium') },
            ];
            if (rewardedReady && canWatchAdForBonus) {
              options.splice(1, 0, {
                text: t('habits.watchAd'),
                onPress: () => {
                  showRewardedAd(() => {
                    setBonusHabits(prev => prev + 1);
                    Alert.alert(t('habits.reward'), t('habits.rewardUnlockedCreate'));
                  });
                },
              });
            }
            const message = canWatchAdForBonus
              ? t('habits.needPremiumOrAd')
              : t('habits.limitMessageMax', { limit: FREE_HABIT_LIMIT + MAX_BONUS_HABITS });
            Alert.alert(t('habits.limitReached'), message, options);
          }
        }}
        activeOpacity={0.8}
      >
        <Ionicons
          name={canAddHabit ? 'add' : 'lock-closed'}
          size={28}
          color="#FFFFFF"
        />
      </TouchableOpacity>

      {/* Add/Edit Habit Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={resetModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {editingHabit ? t('habits.editHabit') : t('habits.newHabit')}
              </Text>
              <TouchableOpacity onPress={resetModal}>
                <Ionicons name="close" size={24} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>

            {/* Name Input */}
            <Text style={styles.inputLabel}>{t('habits.name')}</Text>
            <TextInput
              style={styles.input}
              placeholder={t('habits.namePlaceholder')}
              placeholderTextColor={colors.textMuted}
              value={newHabitName}
              onChangeText={setNewHabitName}
              maxLength={40}
              autoFocus
            />

            {/* Icon Selector */}
            <Text style={styles.inputLabel}>{t('habits.icon')}</Text>
            <FlatList
              data={HABIT_ICONS}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.iconOption,
                    selectedIcon.id === item.id && styles.iconOptionActive,
                    { backgroundColor: selectedIcon.id === item.id ? selectedColor + '20' : colors.card },
                  ]}
                  onPress={() => setSelectedIcon(item)}
                >
                  <Ionicons
                    name={item.icon}
                    size={24}
                    color={selectedIcon.id === item.id ? selectedColor : colors.textSecondary}
                  />
                </TouchableOpacity>
              )}
              style={styles.iconList}
            />

            {/* Color Selector */}
            <Text style={styles.inputLabel}>{t('habits.color')}</Text>
            <View style={styles.colorRow}>
              {HABIT_COLORS.map(color => (
                <TouchableOpacity
                  key={color}
                  style={[
                    styles.colorOption,
                    { backgroundColor: color },
                    selectedColor === color && styles.colorOptionActive,
                  ]}
                  onPress={() => setSelectedColor(color)}
                >
                  {selectedColor === color && (
                    <Ionicons name="checkmark" size={16} color="#FFF" />
                  )}
                </TouchableOpacity>
              ))}
            </View>

            {/* Save Button */}
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveHabit}>
              <Text style={styles.saveButtonText}>
                {editingHabit ? t('habits.saveChanges') : t('habits.createHabit')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    marginBottom: 24,
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
  },
  emptyState: {
    alignItems: 'center',
    padding: SIZES.paddingLg * 2,
  },
  emptyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
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
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginTop: 8,
  },
  tipIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  tipText: {
    flex: 1,
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  fabDisabled: {
    backgroundColor: COLORS.textMuted,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.backgroundLight,
    borderTopLeftRadius: SIZES.radiusXl,
    borderTopRightRadius: SIZES.radiusXl,
    padding: SIZES.paddingLg,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: SIZES.xl,
    fontWeight: '800',
    color: COLORS.text,
  },
  inputLabel: {
    fontSize: SIZES.md,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    fontSize: SIZES.lg,
    color: COLORS.text,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  iconList: {
    marginBottom: 20,
  },
  iconOption: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.card,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  iconOptionActive: {
    borderColor: COLORS.primary,
  },
  colorRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 24,
  },
  colorOption: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  colorOptionActive: {
    borderColor: COLORS.text,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radiusXl,
    padding: SIZES.padding,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: SIZES.lg,
    fontWeight: '700',
    color: '#FFFFFF',
  },
}), [COLORS]);

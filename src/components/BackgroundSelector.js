import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { useRewardedAd } from './AdBanner';
import { SIZES, BACKGROUNDS } from '../constants/theme';

export default function BackgroundSelector({ navigation }) {
  const { colors, currentBackground, setBackground, unlockBackground, isBackgroundUnlocked } = useTheme();
  const { isPremium } = useApp();
  const { t } = useLanguage();
  const { showRewardedAd, isLoaded: adReady } = useRewardedAd();
  const [modalVisible, setModalVisible] = useState(false);

  const freeBackgrounds = BACKGROUNDS.filter(b => b.type === 'free');
  const adBackgrounds = BACKGROUNDS.filter(b => b.type === 'ad');
  const premiumBackgrounds = BACKGROUNDS.filter(b => b.type === 'premium');

  // Check if a background is available to the user
  const checkUnlocked = (bgId) => {
    const bg = BACKGROUNDS.find(b => b.id === bgId);
    if (!bg) return false;
    if (bg.type === 'free') return true;
    if (isPremium) return true; // Premium users get ALL backgrounds
    if (bg.type === 'ad') return isBackgroundUnlocked(bgId, isPremium);
    return false;
  };

  const handleSelectBackground = (bg) => {
    // Premium users can select any background
    if (isPremium) {
      setBackground(bg.id);
      setModalVisible(false);
      return;
    }

    if (bg.type === 'free') {
      setBackground(bg.id);
      setModalVisible(false);
      return;
    }

    if (bg.type === 'ad') {
      if (checkUnlocked(bg.id)) {
        setBackground(bg.id);
        setModalVisible(false);
      } else {
        // Show ad to unlock
        if (adReady) {
          showRewardedAd(() => {
            unlockBackground(bg.id);
            setBackground(bg.id);
            setModalVisible(false);
            Alert.alert(t('backgroundSelector.unlocked'), t('backgroundSelector.unlockedMessage', { name: t('backgrounds.' + bg.id) }));
          });
        } else {
          Alert.alert(t('backgroundSelector.adNotAvailable'), t('backgroundSelector.adNotAvailableMessage'));
        }
      }
      return;
    }

    if (bg.type === 'premium') {
      Alert.alert(
        t('backgroundSelector.premiumBackground'),
        t('backgroundSelector.premiumBackgroundMessage'),
        [
          { text: t('common.cancel'), style: 'cancel' },
          { text: t('habits.seePremium'), onPress: () => { setModalVisible(false); navigation.navigate('Premium'); } },
        ]
      );
    }
  };

  const renderBackgroundItem = (bg) => {
    const isSelected = currentBackground.id === bg.id;
    const isUnlocked = checkUnlocked(bg.id);

    return (
      <TouchableOpacity
        key={bg.id}
        style={[styles.bgItem, isSelected && { borderColor: colors.primary, borderWidth: 3 }]}
        onPress={() => handleSelectBackground(bg)}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={bg.colors}
          style={styles.bgGradient}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        >
          {!isUnlocked && (
            <View style={styles.lockOverlay}>
              <Ionicons
                name={bg.type === 'premium' ? 'star' : 'play-circle'}
                size={24}
                color="rgba(255,255,255,0.9)"
              />
            </View>
          )}
          {isSelected && (
            <View style={styles.checkmark}>
              <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
            </View>
          )}
        </LinearGradient>
        <Text style={[styles.bgName, { color: colors.text }]} numberOfLines={1}>
          {t('backgrounds.' + bg.id)}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderSection = (title, backgrounds, icon, iconColor) => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Ionicons name={icon} size={18} color={iconColor} />
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>{title}</Text>
      </View>
      <View style={styles.bgGrid}>
        {backgrounds.map(renderBackgroundItem)}
      </View>
    </View>
  );

  return (
    <>
      {/* Trigger Button */}
      <TouchableOpacity
        style={[styles.triggerButton, { backgroundColor: colors.card, borderColor: colors.border }]}
        onPress={() => setModalVisible(true)}
      >
        <LinearGradient
          colors={currentBackground.colors}
          style={styles.triggerPreview}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        <View style={styles.triggerInfo}>
          <Text style={[styles.triggerTitle, { color: colors.text }]}>{t('backgroundSelector.title')}</Text>
          <Text style={[styles.triggerSubtitle, { color: colors.textSecondary }]}>
            {t('backgrounds.' + currentBackground.id)}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
      </TouchableOpacity>

      {/* Selection Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={[styles.modalOverlay, { backgroundColor: colors.overlay }]}>
          <View style={[styles.modalContent, { backgroundColor: colors.backgroundLight }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>{t('backgroundSelector.choose')}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>

            {renderSection(t('backgroundSelector.free'), freeBackgrounds, 'color-palette', colors.success)}
            {renderSection(t('backgroundSelector.watchAd'), adBackgrounds, 'play-circle', colors.warning)}
            {renderSection(t('backgroundSelector.premium'), premiumBackgrounds, 'star', colors.gold)}
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  triggerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    borderWidth: 1,
  },
  triggerPreview: {
    width: 44,
    height: 44,
    borderRadius: 10,
    marginRight: 12,
  },
  triggerInfo: {
    flex: 1,
  },
  triggerTitle: {
    fontSize: SIZES.md,
    fontWeight: '600',
  },
  triggerSubtitle: {
    fontSize: SIZES.sm,
    marginTop: 2,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: SIZES.radiusXl,
    borderTopRightRadius: SIZES.radiusXl,
    padding: SIZES.paddingLg,
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: SIZES.xl,
    fontWeight: '800',
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  sectionTitle: {
    fontSize: SIZES.sm,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  bgGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  bgItem: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: SIZES.radius,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  bgGradient: {
    flex: 1,
    borderRadius: SIZES.radius - 2,
  },
  lockOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: 'white',
    borderRadius: 12,
  },
  bgName: {
    fontSize: SIZES.xs,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 6,
  },
});

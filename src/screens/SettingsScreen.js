import React, { useMemo, useState, useEffect } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity, Switch, Alert, Linking, TextInput, Modal, Platform, Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SIZES } from '../constants/theme';
import { useTheme } from '../context/ThemeContext';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { clearAllData } from '../storage/storage';
import BackgroundSelector from '../components/BackgroundSelector';
import GradientBackground from '../components/GradientBackground';
import {
  requestNotificationPermissions,
  updateNotificationSchedules,
} from '../services/notificationService';

export default function SettingsScreen({ navigation }) {
  const { colors, isDark } = useTheme();
  const styles = useStyles(colors);
  const { settings, updateSettings, isPremium, upgradeToPremium, syncing, lastSync, username, updateUsername, reload } = useApp();
  const { user, isAnonymous, signOut, signInWithGoogle } = useAuth();
  const { t, currentLanguage, changeLanguage, languages } = useLanguage();
  const [showNameModal, setShowNameModal] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showPromoModal, setShowPromoModal] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [tempName, setTempName] = useState(username);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const getCurrentLanguageLabel = () => {
    const lang = languages.find(l => l.code === currentLanguage);
    return lang ? lang.nativeLabel : 'Sistema';
  };

  // Parse time string to Date for TimePicker
  const getTimeDate = () => {
    const [hours, minutes] = (settings.dailyReminderTime || '09:00').split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  };

  // Handle time change from picker
  const handleTimeChange = async (event, selectedDate) => {
    if (Platform.OS === 'android') {
      setShowTimePicker(false);
    }
    if (event.type === 'set' && selectedDate) {
      const hours = selectedDate.getHours().toString().padStart(2, '0');
      const minutes = selectedDate.getMinutes().toString().padStart(2, '0');
      const timeString = `${hours}:${minutes}`;
      const newSettings = { ...settings, dailyReminderTime: timeString };
      await updateSettings({ dailyReminderTime: timeString });
      if (settings.dailyReminder) {
        await updateNotificationSchedules(newSettings);
      }
    }
  };

  // Handle notification setting changes
  const handleNotificationToggle = async (key, value) => {
    if (value) {
      const hasPermission = await requestNotificationPermissions();
      if (!hasPermission) {
        Alert.alert(
          t('settings.permissionsRequired'),
          t('settings.permissionsMessage'),
          [
            { text: t('common.cancel'), style: 'cancel' },
            { text: t('settings.openSettings'), onPress: () => Linking.openSettings() },
          ]
        );
        return;
      }
    }
    const newSettings = { ...settings, [key]: value };
    await updateSettings({ [key]: value });
    await updateNotificationSchedules(newSettings);
  };

  const handleSaveName = () => {
    updateUsername(tempName.trim());
    setShowNameModal(false);
  };

  const VALID_PROMO_CODES = ['FOCUSLIFEVIP', 'FOCUSLIFEREVIEW'];

  const handleRedeemCode = async () => {
    const code = promoCode.trim().toUpperCase();
    if (VALID_PROMO_CODES.includes(code)) {
      await upgradeToPremium();
      setShowPromoModal(false);
      setPromoCode('');
      Alert.alert(t('settings.codeRedeemed'), t('settings.codeRedeemedMessage'));
    } else {
      Alert.alert(t('settings.invalidCode'), t('settings.invalidCodeMessage'));
    }
  };

  const handleCancelPremium = () => {
    Alert.alert(
      t('settings.cancelPremiumTitle'),
      t('settings.cancelPremiumManageMessage'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('settings.manageSubscription'),
          onPress: () => {
            Linking.openURL('https://play.google.com/store/account/subscriptions');
          },
        },
      ]
    );
  };

  const handleClearData = () => {
    Alert.alert(
      t('settings.clearDataTitle'),
      t('settings.clearDataMessage'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('settings.clearDataButton'),
          style: 'destructive',
          onPress: async () => {
            await clearAllData();
            await reload();
            Alert.alert(t('settings.dataCleared'), t('settings.dataClearedMessage'));
          },
        },
      ]
    );
  };

  const handleRate = () => {
    Linking.openURL('https://play.google.com/store/apps/details?id=com.focuslife.app');
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: t('settings.shareContent'),
      });
    } catch (error) {
      // User cancelled
    }
  };

  const SettingRow = ({ icon, iconColor, title, subtitle, onPress, rightComponent }) => (
    <TouchableOpacity
      style={styles.settingRow}
      onPress={onPress}
      disabled={!onPress && !rightComponent}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={[styles.iconContainer, { backgroundColor: (iconColor || colors.primary) + '20' }]}>
        <Ionicons name={icon} size={20} color={iconColor || colors.primary} />
      </View>
      <View style={styles.settingInfo}>
        <Text style={styles.settingTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
      {rightComponent || (
        onPress && <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
      )}
    </TouchableOpacity>
  );

  return (
    <GradientBackground>
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>{t('settings.title')}</Text>

        {/* Premium Status */}
        <TouchableOpacity
          style={[styles.premiumCard, isPremium && styles.premiumCardActive]}
          onPress={() => !isPremium && navigation.navigate('Premium')}
          activeOpacity={isPremium ? 1 : 0.7}
        >
          <Ionicons
            name={isPremium ? "star" : "star-outline"}
            size={28}
            color={isPremium ? colors.gold : colors.primary}
            style={{ marginRight: 12 }}
          />
          <View style={styles.premiumInfo}>
            <Text style={styles.premiumTitle}>
              {isPremium ? t('settings.premium') : t('settings.getPremium')}
            </Text>
            <Text style={styles.premiumSubtitle}>
              {isPremium
                ? t('settings.premiumActive')
                : t('settings.premiumDesc')}
            </Text>
          </View>
          {!isPremium && <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />}
        </TouchableOpacity>
        {isPremium ? (
          <TouchableOpacity style={styles.cancelPremiumButton} onPress={handleCancelPremium}>
            <Text style={styles.cancelPremiumText}>{t('settings.cancelSubscription')}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.cancelPremiumButton}
            onPress={() => { setPromoCode(''); setShowPromoModal(true); }}
          >
            <Text style={[styles.cancelPremiumText, { color: colors.primary }]}>{t('settings.redeemCode')}</Text>
          </TouchableOpacity>
        )}

        {/* Account */}
        <Text style={styles.sectionTitle}>{t('settings.account')}</Text>
        <View style={styles.card}>
          <SettingRow
            icon="happy-outline"
            iconColor={colors.primary}
            title={t('settings.yourName')}
            subtitle={username || t('settings.tapToAddName')}
            onPress={() => {
              setTempName(username);
              setShowNameModal(true);
            }}
          />
          {isAnonymous ? (
            <SettingRow
              icon="person-outline"
              iconColor={colors.warning}
              title={t('settings.noAccount')}
              subtitle={t('settings.loginToSync')}
              onPress={async () => {
                try {
                  await signInWithGoogle();
                } catch (e) {
                  Alert.alert(t('common.error'), t('settings.loginError'));
                }
              }}
            />
          ) : (
            <>
              <SettingRow
                icon="person-circle-outline"
                iconColor={colors.accent}
                title={user?.displayName || 'Usuario'}
                subtitle={user?.email || ''}
              />
              <SettingRow
                icon="log-out-outline"
                iconColor={colors.error}
                title={t('settings.logout')}
                subtitle={t('settings.disconnectAccount')}
                onPress={() => {
                  Alert.alert(
                    t('settings.logout'),
                    t('settings.logoutMessage'),
                    [
                      { text: t('common.cancel'), style: 'cancel' },
                      { text: t('settings.logout'), style: 'destructive', onPress: signOut },
                    ]
                  );
                }}
              />
              <SettingRow
                icon="cloud-done-outline"
                iconColor={colors.info}
                title={syncing ? t('settings.syncing') : t('settings.sync')}
                subtitle={lastSync
                  ? t('settings.lastSync', { date: new Date(lastSync).toLocaleString(undefined, { dateStyle: 'short', timeStyle: 'short' }) })
                  : t('settings.notSynced')}
              />
            </>
          )}
        </View>

        {/* Appearance */}
        <Text style={styles.sectionTitle}>{t('settings.appearance')}</Text>
        <View style={styles.card}>
          <SettingRow
            icon="language-outline"
            iconColor={colors.info}
            title={t('settings.language')}
            subtitle={getCurrentLanguageLabel()}
            onPress={() => setShowLanguageModal(true)}
          />
          <View style={styles.settingRow}>
            <View style={[styles.iconContainer, { backgroundColor: colors.accent + '20' }]}>
              <Ionicons name="color-palette-outline" size={20} color={colors.accent} />
            </View>
            <View style={styles.settingInfo}>
              <BackgroundSelector navigation={navigation} />
            </View>
          </View>
        </View>

        {/* Timer Settings */}
        <Text style={styles.sectionTitle}>{t('settings.timerSection')}</Text>
        <View style={styles.card}>
          <SettingRow
            icon="timer-outline"
            title={t('settings.focusDuration')}
            subtitle={`${settings.pomodoroDuration} ${t('common.minutes')}`}
            onPress={isPremium ? () => {
              Alert.alert(t('settings.focusDurationTitle'), '', [
                { text: '15 min', onPress: () => updateSettings({ pomodoroDuration: 15 }) },
                { text: '25 min', onPress: () => updateSettings({ pomodoroDuration: 25 }) },
                { text: '45 min', onPress: () => updateSettings({ pomodoroDuration: 45 }) },
                { text: '60 min', onPress: () => updateSettings({ pomodoroDuration: 60 }) },
                { text: t('common.cancel'), style: 'cancel' },
              ]);
            } : () => navigation.navigate('Premium')}
          />
          <SettingRow
            icon="cafe-outline"
            iconColor={colors.accent}
            title={t('settings.shortBreakDuration')}
            subtitle={`${settings.shortBreak} ${t('common.minutes')}`}
            onPress={isPremium ? () => {
              Alert.alert(t('settings.shortBreakDuration'), '', [
                { text: '3 min', onPress: () => updateSettings({ shortBreak: 3 }) },
                { text: '5 min', onPress: () => updateSettings({ shortBreak: 5 }) },
                { text: '10 min', onPress: () => updateSettings({ shortBreak: 10 }) },
                { text: t('common.cancel'), style: 'cancel' },
              ]);
            } : () => navigation.navigate('Premium')}
          />
          <SettingRow
            icon="leaf-outline"
            iconColor={colors.info}
            title={t('settings.longBreakDuration')}
            subtitle={`${settings.longBreak} ${t('common.minutes')}`}
            onPress={isPremium ? () => {
              Alert.alert(t('settings.longBreakDuration'), '', [
                { text: '10 min', onPress: () => updateSettings({ longBreak: 10 }) },
                { text: '15 min', onPress: () => updateSettings({ longBreak: 15 }) },
                { text: '20 min', onPress: () => updateSettings({ longBreak: 20 }) },
                { text: '30 min', onPress: () => updateSettings({ longBreak: 30 }) },
                { text: t('common.cancel'), style: 'cancel' },
              ]);
            } : () => navigation.navigate('Premium')}
          />
        </View>

        {/* Notifications */}
        <Text style={styles.sectionTitle}>{t('settings.notifications')}</Text>
        <View style={styles.card}>
          <SettingRow
            icon="calendar-outline"
            iconColor={colors.primary}
            title={t('settings.dailyReminder')}
            subtitle={t('settings.dailyReminderDesc')}
            rightComponent={
              <Switch
                value={settings.dailyReminder}
                onValueChange={(v) => handleNotificationToggle('dailyReminder', v)}
                trackColor={{ false: colors.border, true: colors.primary + '60' }}
                thumbColor={settings.dailyReminder ? colors.primary : colors.textMuted}
              />
            }
          />
          {settings.dailyReminder && (
            <SettingRow
              icon="time-outline"
              iconColor={colors.accent}
              title={t('settings.reminderTime')}
              subtitle={settings.dailyReminderTime || '09:00'}
              onPress={() => setShowTimePicker(true)}
            />
          )}
          <SettingRow
            icon="flame-outline"
            iconColor={colors.accentOrange}
            title={t('settings.streakAlert')}
            subtitle={t('settings.streakAlertDesc')}
            rightComponent={
              <Switch
                value={settings.streakReminder}
                onValueChange={(v) => handleNotificationToggle('streakReminder', v)}
                trackColor={{ false: colors.border, true: colors.primary + '60' }}
                thumbColor={settings.streakReminder ? colors.primary : colors.textMuted}
              />
            }
          />
          <SettingRow
            icon="timer-outline"
            iconColor={colors.info}
            title={t('settings.timerEnd')}
            subtitle={t('settings.timerEndDesc')}
            rightComponent={
              <Switch
                value={settings.timerNotification}
                onValueChange={(v) => updateSettings({ timerNotification: v })}
                trackColor={{ false: colors.border, true: colors.primary + '60' }}
                thumbColor={settings.timerNotification ? colors.primary : colors.textMuted}
              />
            }
          />
          <SettingRow
            icon="phone-portrait-outline"
            title={t('settings.vibration')}
            subtitle={t('settings.vibrationDesc')}
            rightComponent={
              <Switch
                value={settings.vibration}
                onValueChange={(v) => updateSettings({ vibration: v })}
                trackColor={{ false: colors.border, true: colors.primary + '60' }}
                thumbColor={settings.vibration ? colors.primary : colors.textMuted}
              />
            }
          />
        </View>

        {/* About */}
        <Text style={styles.sectionTitle}>{t('settings.about')}</Text>
        <View style={styles.card}>
          <SettingRow
            icon="star-outline"
            iconColor={colors.gold}
            title={t('settings.rateApp')}
            subtitle={t('settings.rateAppDesc')}
            onPress={handleRate}
          />
          <SettingRow
            icon="share-social-outline"
            iconColor={colors.info}
            title={t('settings.share')}
            subtitle={t('settings.shareDesc')}
            onPress={handleShare}
          />
          <SettingRow
            icon="mail-outline"
            iconColor={colors.accent}
            title={t('settings.contact')}
            subtitle={t('settings.contactDesc')}
            onPress={() => Linking.openURL('mailto:soporte@focuslifeapp.com')}
          />
        </View>

        {/* Danger Zone */}
        <Text style={styles.sectionTitle}>{t('settings.data')}</Text>
        <View style={styles.card}>
          <SettingRow
            icon="trash-outline"
            iconColor={colors.error}
            title={t('settings.clearAllData')}
            subtitle={t('settings.clearDataDesc')}
            onPress={handleClearData}
          />
        </View>

        {/* Version */}
        <Text style={styles.version}>{t('settings.version')}</Text>
        <Text style={styles.copyright}>{t('settings.madeWith')}</Text>

        <View style={{ height: 32 }} />
      </ScrollView>

      {/* Name Edit Modal */}
      <Modal
        visible={showNameModal}
        animationType="fade"
        transparent
        onRequestClose={() => setShowNameModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{t('settings.nameModalTitle')}</Text>
            <Text style={styles.modalSubtitle}>
              {t('settings.nameModalSubtitle')}
            </Text>
            <TextInput
              style={styles.nameInput}
              placeholder={t('settings.namePlaceholder')}
              placeholderTextColor={colors.textMuted}
              value={tempName}
              onChangeText={setTempName}
              maxLength={20}
              autoFocus
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonCancel]}
                onPress={() => setShowNameModal(false)}
              >
                <Text style={styles.modalButtonTextCancel}>{t('common.cancel')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonSave]}
                onPress={handleSaveName}
              >
                <Text style={styles.modalButtonTextSave}>{t('common.save')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Language Modal */}
      <Modal
        visible={showLanguageModal}
        animationType="fade"
        transparent
        onRequestClose={() => setShowLanguageModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{t('settings.language')}</Text>
            <View style={styles.languageList}>
              {languages.map((lang) => (
                <TouchableOpacity
                  key={lang.code}
                  style={[
                    styles.languageOption,
                    currentLanguage === lang.code && styles.languageOptionActive,
                  ]}
                  onPress={() => {
                    changeLanguage(lang.code);
                    setShowLanguageModal(false);
                  }}
                >
                  <Text style={[
                    styles.languageText,
                    currentLanguage === lang.code && styles.languageTextActive,
                  ]}>
                    {lang.nativeLabel}
                  </Text>
                  {currentLanguage === lang.code && (
                    <Ionicons name="checkmark" size={20} color={colors.primary} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              style={[styles.modalButton, styles.modalButtonCancel]}
              onPress={() => setShowLanguageModal(false)}
            >
              <Text style={styles.modalButtonTextCancel}>{t('common.cancel')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Promo Code Modal */}
      <Modal
        visible={showPromoModal}
        animationType="fade"
        transparent
        onRequestClose={() => setShowPromoModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{t('settings.redeemCodeTitle')}</Text>
            <Text style={styles.modalSubtitle}>
              {t('settings.redeemCodeDesc')}
            </Text>
            <TextInput
              style={styles.nameInput}
              placeholder={t('settings.redeemCodePlaceholder')}
              placeholderTextColor={colors.textMuted}
              value={promoCode}
              onChangeText={setPromoCode}
              autoCapitalize="characters"
              autoCorrect={false}
              autoFocus
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonCancel]}
                onPress={() => setShowPromoModal(false)}
              >
                <Text style={styles.modalButtonTextCancel}>{t('common.cancel')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonSave]}
                onPress={handleRedeemCode}
              >
                <Text style={styles.modalButtonTextSave}>{t('settings.redeem')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Time Picker */}
      {showTimePicker && (
        Platform.OS === 'ios' ? (
          <Modal
            visible={showTimePicker}
            animationType="slide"
            transparent
            onRequestClose={() => setShowTimePicker(false)}
          >
            <View style={styles.timePickerModal}>
              <View style={styles.timePickerContainer}>
                <View style={styles.timePickerHeader}>
                  <TouchableOpacity onPress={() => setShowTimePicker(false)}>
                    <Text style={styles.timePickerCancel}>{t('common.cancel')}</Text>
                  </TouchableOpacity>
                  <Text style={styles.timePickerTitle}>{t('settings.reminderTime')}</Text>
                  <TouchableOpacity onPress={() => {
                    handleTimeChange({ type: 'set' }, getTimeDate());
                    setShowTimePicker(false);
                  }}>
                    <Text style={styles.timePickerDone}>{t('common.done')}</Text>
                  </TouchableOpacity>
                </View>
                <DateTimePicker
                  value={getTimeDate()}
                  mode="time"
                  display="spinner"
                  onChange={(event, date) => {
                    if (date) {
                      const hours = date.getHours().toString().padStart(2, '0');
                      const minutes = date.getMinutes().toString().padStart(2, '0');
                      updateSettings({ dailyReminderTime: `${hours}:${minutes}` });
                    }
                  }}
                  textColor={colors.text}
                  style={styles.timePicker}
                />
              </View>
            </View>
          </Modal>
        ) : (
          <DateTimePicker
            value={getTimeDate()}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={handleTimeChange}
          />
        )
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
    marginBottom: 20,
  },
  premiumCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radiusLg,
    padding: SIZES.padding,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: COLORS.primary + '40',
  },
  premiumCardActive: {
    borderColor: COLORS.gold,
    backgroundColor: COLORS.gold + '10',
  },
  premiumEmoji: {
    fontSize: 32,
    marginRight: 12,
  },
  premiumInfo: {
    flex: 1,
  },
  premiumTitle: {
    fontSize: SIZES.lg,
    fontWeight: '700',
    color: COLORS.text,
  },
  premiumSubtitle: {
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  cancelPremiumButton: {
    alignItems: 'center',
    paddingVertical: 8,
    marginTop: -16,
    marginBottom: 16,
  },
  cancelPremiumText: {
    fontSize: SIZES.sm,
    color: COLORS.textMuted,
    textDecorationLine: 'underline',
  },
  sectionTitle: {
    fontSize: SIZES.md,
    fontWeight: '600',
    color: COLORS.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
    marginTop: 4,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    marginBottom: 20,
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: SIZES.md,
    fontWeight: '600',
    color: COLORS.text,
  },
  settingSubtitle: {
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  version: {
    textAlign: 'center',
    fontSize: SIZES.sm,
    color: COLORS.textMuted,
    marginTop: 20,
  },
  copyright: {
    textAlign: 'center',
    fontSize: SIZES.sm,
    color: COLORS.textMuted,
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.paddingLg,
  },
  modalContent: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: SIZES.radiusLg,
    padding: SIZES.paddingLg,
    width: '100%',
    maxWidth: 320,
  },
  modalTitle: {
    fontSize: SIZES.xl,
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
  },
  nameInput: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    fontSize: SIZES.lg,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: SIZES.radius,
    alignItems: 'center',
  },
  modalButtonCancel: {
    backgroundColor: COLORS.card,
  },
  modalButtonSave: {
    backgroundColor: COLORS.primary,
  },
  modalButtonTextCancel: {
    fontSize: SIZES.md,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  modalButtonTextSave: {
    fontSize: SIZES.md,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  timePickerModal: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: COLORS.overlay,
  },
  timePickerContainer: {
    backgroundColor: COLORS.backgroundLight,
    borderTopLeftRadius: SIZES.radiusXl,
    borderTopRightRadius: SIZES.radiusXl,
    paddingBottom: 20,
  },
  timePickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  timePickerTitle: {
    fontSize: SIZES.lg,
    fontWeight: '600',
    color: COLORS.text,
  },
  timePickerCancel: {
    fontSize: SIZES.md,
    color: COLORS.textSecondary,
  },
  timePickerDone: {
    fontSize: SIZES.md,
    fontWeight: '600',
    color: COLORS.primary,
  },
  timePicker: {
    height: 200,
  },
  languageList: {
    marginBottom: 16,
  },
  languageOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: SIZES.radius,
    marginBottom: 8,
    backgroundColor: COLORS.card,
  },
  languageOptionActive: {
    backgroundColor: COLORS.primary + '20',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  languageText: {
    fontSize: SIZES.md,
    color: COLORS.text,
  },
  languageTextActive: {
    fontWeight: '600',
    color: COLORS.primary,
  },
}), [COLORS]);

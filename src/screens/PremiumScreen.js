import React, { useMemo, useState, useEffect } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert, ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { SIZES } from '../constants/theme';
import { useTheme } from '../context/ThemeContext';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import GradientBackground from '../components/GradientBackground';
import {
  getOfferings,
  purchasePackage,
  restorePurchases,
} from '../services/purchaseService';

const FEATURE_KEYS = [
  { iconName: 'infinite', key: 'unlimitedHabits' },
  { iconName: 'ban', key: 'noAds' },
  { iconName: 'bar-chart', key: 'advancedStats' },
  { iconName: 'timer', key: 'customTimer' },
  { iconName: 'color-palette', key: 'themes' },
  { iconName: 'cloud', key: 'backup' },
];

const STATIC_PLAN_KEYS = [
  { id: 'monthly', key: 'monthly', price: '2,99', popular: false },
  { id: 'annual', key: 'annual', price: '19,99', popular: true, hasSavings: true },
  { id: 'lifetime', key: 'lifetime', price: '39,99', popular: false },
];

// Map RevenueCat package type to plan key
const PACKAGE_TYPE_MAP = {
  MONTHLY: 'monthly',
  ANNUAL: 'annual',
  LIFETIME: 'lifetime',
};

export default function PremiumScreen({ navigation }) {
  const { colors } = useTheme();
  const styles = useStyles(colors);
  const { isPremium, upgradeToPremium } = useApp();
  const { t } = useLanguage();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    loadOfferings();
  }, []);

  const loadOfferings = async () => {
    setLoading(true);
    const pkgs = await getOfferings();
    setPackages(pkgs);
    setLoading(false);
  };

  const FEATURES = FEATURE_KEYS.map(f => ({
    iconName: f.iconName,
    title: t(`premium.features.${f.key}.title`),
    description: t(`premium.features.${f.key}.description`),
  }));

  // Build PLANS from RevenueCat packages with fallback to static data
  const PLANS = useMemo(() => {
    if (packages.length > 0) {
      return packages.map(pkg => {
        const planKey = PACKAGE_TYPE_MAP[pkg.packageType] || 'monthly';
        const staticPlan = STATIC_PLAN_KEYS.find(p => p.key === planKey) || STATIC_PLAN_KEYS[0];
        return {
          id: staticPlan.id,
          name: t(`premium.plans.${planKey}.name`),
          price: pkg.product.priceString,
          period: t(`premium.plans.${planKey}.period`),
          popular: staticPlan.popular,
          savings: staticPlan.hasSavings ? t('premium.plans.annual.savings') : undefined,
          packageObj: pkg,
          useLocalizedPrice: true,
        };
      });
    }
    // Fallback to static plans when offerings unavailable
    return STATIC_PLAN_KEYS.map(p => ({
      id: p.id,
      name: t(`premium.plans.${p.key}.name`),
      price: p.price,
      period: t(`premium.plans.${p.key}.period`),
      popular: p.popular,
      savings: p.hasSavings ? t('premium.plans.annual.savings') : undefined,
      packageObj: null,
      useLocalizedPrice: false,
    }));
  }, [packages, t]);

  const handlePurchase = async (plan) => {
    if (!plan.packageObj) {
      Alert.alert(t('common.error'), t('premium.purchaseUnavailable'));
      return;
    }
    setPurchasing(true);
    try {
      const result = await purchasePackage(plan.packageObj);
      if (result.success && result.isPremium) {
        await upgradeToPremium();
        Alert.alert(
          t('premium.welcomeTitle'),
          t('premium.welcomeMessage'),
          [{ text: t('premium.great'), onPress: () => navigation.goBack() }]
        );
      }
    } catch (error) {
      if (!error.userCancelled) {
        Alert.alert(t('common.error'), error.message);
      }
    } finally {
      setPurchasing(false);
    }
  };

  const handleRestore = async () => {
    setPurchasing(true);
    try {
      const result = await restorePurchases();
      if (result.isPremium) {
        await upgradeToPremium();
        Alert.alert(
          t('premium.welcomeTitle'),
          t('premium.welcomeMessage'),
          [{ text: t('premium.great'), onPress: () => navigation.goBack() }]
        );
      } else {
        Alert.alert(t('premium.restoreTitle'), t('premium.restoreNoPurchases'));
      }
    } catch (error) {
      Alert.alert(t('common.error'), error.message);
    } finally {
      setPurchasing(false);
    }
  };

  if (isPremium) {
    return (
      <GradientBackground>
      <SafeAreaView style={styles.container}>
        <View style={styles.premiumActive}>
          <View style={[styles.premiumActiveIcon, { backgroundColor: colors.gold + '20' }]}>
            <Ionicons name="trophy" size={48} color={colors.gold} />
          </View>
          <Text style={styles.premiumActiveTitle}>{t('premium.youArePremium')}</Text>
          <Text style={styles.premiumActiveText}>
            {t('premium.enjoyAllFeatures')}
          </Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>{t('common.back')}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      </GradientBackground>
    );
  }

  return (
    <GradientBackground>
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="close" size={24} color={colors.textSecondary} />
        </TouchableOpacity>

        <View style={styles.header}>
          <View style={[styles.headerIconContainer, { backgroundColor: colors.primary + '15' }]}>
            <Ionicons name="star" size={40} color={colors.primary} />
          </View>
          <Text style={styles.headerTitle}>{t('premium.title')}</Text>
          <Text style={styles.headerSubtitle}>
            {t('premium.subtitle')}
          </Text>
        </View>

        {/* Features Comparison */}
        <View style={styles.featuresContainer}>
          {FEATURES.map((feature, index) => (
            <View key={index} style={styles.featureRow}>
              <View style={[styles.featureIconContainer, { backgroundColor: colors.primary + '15' }]}>
                <Ionicons name={feature.iconName} size={20} color={colors.primary} />
              </View>
              <View style={styles.featureInfo}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDesc}>{feature.description}</Text>
              </View>
              <Ionicons name="checkmark-circle" size={22} color={colors.accent} />
            </View>
          ))}
        </View>

        {/* Plans */}
        <Text style={styles.plansTitle}>{t('premium.choosePlan')}</Text>
        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} style={{ marginVertical: 32 }} />
        ) : (
          <View style={styles.plansContainer}>
            {PLANS.map(plan => (
              <TouchableOpacity
                key={plan.id}
                style={[styles.planCard, plan.popular && styles.planCardPopular]}
                onPress={() => handlePurchase(plan)}
                activeOpacity={0.8}
                disabled={purchasing}
              >
                {plan.popular && (
                  <View style={styles.popularBadge}>
                    <Text style={styles.popularText}>{t('premium.mostPopular')}</Text>
                  </View>
                )}
                {plan.savings && (
                  <View style={styles.savingsBadge}>
                    <Text style={styles.savingsText}>{plan.savings}</Text>
                  </View>
                )}
                <Text style={styles.planName}>{plan.name}</Text>
                <View style={styles.priceRow}>
                  <Text style={[styles.planPrice, plan.popular && styles.planPricePopular]}>
                    {plan.useLocalizedPrice ? plan.price : `${plan.price}\u{20AC}`}
                  </Text>
                </View>
                <Text style={styles.planPeriod}>{plan.period}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Purchasing overlay */}
        {purchasing && (
          <View style={styles.purchasingOverlay}>
            <ActivityIndicator size="small" color={colors.primary} />
            <Text style={styles.purchasingText}>{t('premium.purchasing')}</Text>
          </View>
        )}

        {/* Restore purchases */}
        <TouchableOpacity style={styles.restoreButton} onPress={handleRestore} disabled={purchasing}>
          <Text style={styles.restoreText}>{t('premium.restorePurchases')}</Text>
        </TouchableOpacity>

        {/* Legal */}
        <Text style={styles.legalText}>
          {t('premium.legalText')}
        </Text>

        <View style={{ height: 40 }} />
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
  closeButton: {
    alignSelf: 'flex-end',
    padding: 8,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  headerIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: SIZES.xxxl,
    fontWeight: '900',
    color: COLORS.text,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: SIZES.lg,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  featuresContainer: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radiusLg,
    padding: SIZES.padding,
    marginBottom: 32,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  featureIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  featureInfo: {
    flex: 1,
  },
  featureTitle: {
    fontSize: SIZES.md,
    fontWeight: '700',
    color: COLORS.text,
  },
  featureDesc: {
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  plansTitle: {
    fontSize: SIZES.xl,
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 16,
  },
  plansContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 24,
  },
  planCard: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  planCardPopular: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary + '15',
  },
  popularBadge: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginBottom: 8,
  },
  popularText: {
    fontSize: 8,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  savingsBadge: {
    backgroundColor: COLORS.accent + '30',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginBottom: 4,
  },
  savingsText: {
    fontSize: 9,
    fontWeight: '700',
    color: COLORS.accent,
  },
  planName: {
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
    fontWeight: '600',
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  planPrice: {
    fontSize: SIZES.xl,
    fontWeight: '800',
    color: COLORS.text,
  },
  planPricePopular: {
    color: COLORS.primary,
  },
  planPeriod: {
    fontSize: SIZES.xs,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  purchasingOverlay: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 8,
  },
  purchasingText: {
    fontSize: SIZES.md,
    color: COLORS.textSecondary,
  },
  restoreButton: {
    alignItems: 'center',
    padding: 12,
  },
  restoreText: {
    fontSize: SIZES.md,
    color: COLORS.primary,
    fontWeight: '600',
  },
  legalText: {
    fontSize: SIZES.xs,
    color: COLORS.textMuted,
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 12,
    paddingHorizontal: 16,
  },
  premiumActive: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SIZES.paddingLg,
  },
  premiumActiveIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  premiumActiveTitle: {
    fontSize: SIZES.xxxl,
    fontWeight: '900',
    color: COLORS.gold,
    marginBottom: 8,
  },
  premiumActiveText: {
    fontSize: SIZES.lg,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
  },
  backButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: SIZES.radiusXl,
  },
  backButtonText: {
    fontSize: SIZES.lg,
    fontWeight: '700',
    color: '#FFFFFF',
  },
}), [COLORS]);

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { BANNER_AD_ID, INTERSTITIAL_AD_ID, REWARDED_AD_ID } from '../constants/ads';
import { useApp } from '../context/AppContext';
import { SIZES } from '../constants/theme';

// Importación lazy para evitar el crash de EventEmitter al cargar el módulo
let MobileAds = null;
let BannerAd = null;
let BannerAdSize = null;
let InterstitialAd = null;
let RewardedAd = null;
let AdEventType = null;
let RewardedAdEventType = null;
let adsInitialized = false;

function getAdsModule() {
  if (!MobileAds) {
    try {
      const ads = require('react-native-google-mobile-ads');
      MobileAds = ads.default;
      BannerAd = ads.BannerAd;
      BannerAdSize = ads.BannerAdSize;
      InterstitialAd = ads.InterstitialAd;
      RewardedAd = ads.RewardedAd;
      AdEventType = ads.AdEventType;
      RewardedAdEventType = ads.RewardedAdEventType;
    } catch (e) {
      console.warn('AdMob module not available:', e.message);
      return false;
    }
  }
  return true;
}

async function initializeAds() {
  if (adsInitialized) return;
  if (!getAdsModule() || !MobileAds) return;
  try {
    await MobileAds().initialize();
    adsInitialized = true;
  } catch (e) {
    console.warn('AdMob init failed:', e.message);
  }
}

// ============================
// 1) BANNER AD COMPONENT
// ============================
export default function AdBanner({ style }) {
  const { isPremium } = useApp();
  const [adReady, setAdReady] = useState(false);

  useEffect(() => {
    initializeAds().then(() => {
      if (getAdsModule()) setAdReady(true);
    });
  }, []);

  if (isPremium || !adReady || !BannerAd) return null;

  return (
    <View style={[styles.container, style]}>
      <BannerAd
        unitId={BANNER_AD_ID}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
        onAdFailedToLoad={(error) => {
          console.warn('Banner ad failed:', error.message);
        }}
      />
    </View>
  );
}

// ============================
// 2) INTERSTITIAL AD
// ============================
let interstitialInstance = null;
let interstitialLoaded = false;

function getInterstitial() {
  if (interstitialInstance) return interstitialInstance;
  if (!getAdsModule() || !InterstitialAd) return null;
  try {
    interstitialInstance = InterstitialAd.createForAdRequest(INTERSTITIAL_AD_ID, {
      requestNonPersonalizedAdsOnly: true,
    });
    interstitialInstance.addAdEventListener(AdEventType.LOADED, () => {
      interstitialLoaded = true;
    });
    interstitialInstance.addAdEventListener(AdEventType.CLOSED, () => {
      interstitialLoaded = false;
      // Recargar para la próxima vez
      try { interstitialInstance.load(); } catch (e) { /* ignore */ }
    });
    return interstitialInstance;
  } catch (e) {
    console.warn('Interstitial create failed:', e.message);
    return null;
  }
}

function loadInterstitial() {
  initializeAds().then(() => {
    const inst = getInterstitial();
    if (inst) {
      try {
        interstitialLoaded = false;
        inst.load();
      } catch (e) {
        console.warn('Interstitial load failed:', e.message);
      }
    }
  });
}

// Pre-cargar después de un delay para dar tiempo al bridge nativo
setTimeout(loadInterstitial, 3000);

/**
 * Muestra un anuncio intersticial.
 * @param {Function} onComplete - Callback al cerrar el anuncio
 */
export function showInterstitialAd(onComplete) {
  const inst = getInterstitial();
  if (inst && interstitialLoaded) {
    try {
      const unsubscribe = inst.addAdEventListener(AdEventType.CLOSED, () => {
        unsubscribe();
        if (onComplete) onComplete();
      });
      inst.show();
    } catch (e) {
      console.warn('Interstitial show failed:', e.message);
      if (onComplete) onComplete();
    }
  } else {
    if (onComplete) onComplete();
    loadInterstitial();
  }
}

// ============================
// 3) REWARDED AD HOOK
// ============================
export function useRewardedAd() {
  const rewardedRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const onRewardRef = useRef(null);

  useEffect(() => {
    let unsubLoaded, unsubEarned, unsubClosed;
    let mounted = true;

    async function setup() {
      await initializeAds();
      if (!mounted || !getAdsModule() || !RewardedAd) return;

      try {
        const rewarded = RewardedAd.createForAdRequest(REWARDED_AD_ID, {
          requestNonPersonalizedAdsOnly: true,
        });
        rewardedRef.current = rewarded;

        unsubLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
          if (mounted) setIsLoaded(true);
        });

        unsubEarned = rewarded.addAdEventListener(
          RewardedAdEventType.EARNED_REWARD,
          () => {
            if (onRewardRef.current) {
              onRewardRef.current();
              onRewardRef.current = null;
            }
          },
        );

        unsubClosed = rewarded.addAdEventListener(AdEventType.CLOSED, () => {
          if (mounted) setIsLoaded(false);
          try { rewarded.load(); } catch (e) { /* ignore */ }
        });

        rewarded.load();
      } catch (e) {
        console.warn('Rewarded ad setup failed:', e.message);
      }
    }

    setup();

    return () => {
      mounted = false;
      if (unsubLoaded) unsubLoaded();
      if (unsubEarned) unsubEarned();
      if (unsubClosed) unsubClosed();
    };
  }, []);

  const showRewardedAd = useCallback((onReward) => {
    if (isLoaded && rewardedRef.current) {
      try {
        onRewardRef.current = onReward;
        rewardedRef.current.show();
      } catch (e) {
        console.warn('Rewarded show failed:', e.message);
      }
    }
  }, [isLoaded]);

  return { showRewardedAd, isLoaded };
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: SIZES.paddingSm,
  },
});

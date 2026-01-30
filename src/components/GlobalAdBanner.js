import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { BANNER_AD_ID } from '../constants/ads';
import { useApp } from '../context/AppContext';

let MobileAds = null;
let BannerAd = null;
let BannerAdSize = null;
let adsInitialized = false;

function getAdsModule() {
  if (!MobileAds) {
    try {
      const ads = require('react-native-google-mobile-ads');
      MobileAds = ads.default;
      BannerAd = ads.BannerAd;
      BannerAdSize = ads.BannerAdSize;
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

export default function GlobalAdBanner() {
  const { isPremium } = useApp();
  const [adReady, setAdReady] = useState(false);
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    initializeAds().then(() => {
      if (getAdsModule()) setAdReady(true);
    });
  }, []);

  // Don't render anything if premium or ads not ready
  if (isPremium || !adReady || !BannerAd) {
    return null;
  }

  // Only show container if ad is loaded (prevents gap when no ad)
  return (
    <View style={[styles.container, !adLoaded && styles.hidden]}>
      <BannerAd
        unitId={BANNER_AD_ID}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
        onAdLoaded={() => setAdLoaded(true)}
        onAdFailedToLoad={(error) => {
          console.warn('Banner ad failed:', error.message);
          setAdLoaded(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
  },
  hidden: {
    height: 0,
    overflow: 'hidden',
  },
});

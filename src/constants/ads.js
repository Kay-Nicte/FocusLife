import { Platform } from 'react-native';

// Test Ad IDs from Google (use in development)
const TEST_AD_IDS = {
  android: {
    banner: 'ca-app-pub-3940256099942544/6300978111',
    interstitial: 'ca-app-pub-3940256099942544/1033173712',
    rewarded: 'ca-app-pub-3940256099942544/5224354917',
  },
  ios: {
    banner: 'ca-app-pub-3940256099942544/2934735716',
    interstitial: 'ca-app-pub-3940256099942544/4411468910',
    rewarded: 'ca-app-pub-3940256099942544/1712485313',
  },
};

// FocusLife Production AdMob IDs
const PROD_AD_IDS = {
  android: {
    banner: 'ca-app-pub-4638960090268476/6494809789',
    interstitial: 'ca-app-pub-4638960090268476/2419773335',
    rewarded: 'ca-app-pub-4638960090268476/2607535665',
  },
  ios: {
    // Cuando crees los bloques de anuncios para iOS, pon los IDs aquí
    banner: 'ca-app-pub-4638960090268476/6494809789',
    interstitial: 'ca-app-pub-4638960090268476/2419773335',
    rewarded: 'ca-app-pub-4638960090268476/2607535665',
  },
};

// Use test ads in development, production ads in release
const AD_IDS = __DEV__ ? TEST_AD_IDS : PROD_AD_IDS;
const ids = Platform.OS === 'ios' ? AD_IDS.ios : AD_IDS.android;

export const BANNER_AD_ID = ids.banner;
export const INTERSTITIAL_AD_ID = ids.interstitial;
export const REWARDED_AD_ID = ids.rewarded;

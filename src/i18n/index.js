import { I18n } from "i18n-js";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";

import es from "./locales/es";
import eu from "./locales/eu";
import ca from "./locales/ca";
import ga from "./locales/ga";
import en from "./locales/en";
import fr from "./locales/fr";
import pt from "./locales/pt";
import it from "./locales/it";

const i18n = new I18n({
  es,
  eu,
  ca,
  ga,
  en,
  fr,
  pt,
  it,
});

// Available languages
export const LANGUAGES = [
  { code: "system", label: "Sistema", nativeLabel: "Sistema" },
  { code: "es", label: "Español", nativeLabel: "Español" },
  { code: "eu", label: "Euskera", nativeLabel: "Euskera" },
  { code: "ca", label: "Català", nativeLabel: "Català" },
  { code: "ga", label: "Galego", nativeLabel: "Galego" },
  { code: "en", label: "English", nativeLabel: "English" },
  { code: "fr", label: "Français", nativeLabel: "Français" },
  { code: "pt", label: "Português", nativeLabel: "Português" },
  { code: "it", label: "Italiano", nativeLabel: "Italiano" },
];

// Supported language codes
const SUPPORTED_LANGUAGES = ["es", "eu", "ca", "ga", "en", "fr", "pt", "it"];

// Storage key
const LANGUAGE_KEY = "@focuslife_language";

// Get system language (first 2 characters)
export const getSystemLanguage = () => {
  const locale = Localization.locale || "en";
  const langCode = locale.split("-")[0].toLowerCase();
  return SUPPORTED_LANGUAGES.includes(langCode) ? langCode : "en";
};

// Initialize i18n with saved or system language
export const initializeI18n = async () => {
  try {
    const savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
    if (savedLanguage && savedLanguage !== "system") {
      i18n.locale = savedLanguage;
    } else {
      i18n.locale = getSystemLanguage();
    }
  } catch {
    i18n.locale = getSystemLanguage();
  }
  i18n.enableFallback = true;
  i18n.defaultLocale = "en";
  return i18n.locale;
};

// Get current language setting (might be 'system')
export const getLanguageSetting = async () => {
  try {
    const savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
    return savedLanguage || "system";
  } catch {
    return "system";
  }
};

// Set language
export const setLanguage = async (langCode) => {
  try {
    await AsyncStorage.setItem(LANGUAGE_KEY, langCode);
    if (langCode === "system") {
      i18n.locale = getSystemLanguage();
    } else {
      i18n.locale = langCode;
    }
    return i18n.locale;
  } catch {
    return i18n.locale;
  }
};

// Get current active locale
export const getCurrentLocale = () => i18n.locale;

// Translation function
export const t = (key, options) => i18n.t(key, options);

export default i18n;

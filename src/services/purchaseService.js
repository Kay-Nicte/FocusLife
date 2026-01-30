import Purchases from 'react-native-purchases';

const REVENUECAT_API_KEY = 'goog_QvDUzFlzFxARUFLsNEHthiqKhCc';

const ENTITLEMENT_ID = 'FocusLife Pro';

/**
 * Initialize RevenueCat SDK. Call once at app startup.
 */
export async function initializePurchases() {
  try {
    await Purchases.configure({ apiKey: REVENUECAT_API_KEY });
  } catch (error) {
    console.warn('RevenueCat init error:', error.message);
  }
}

/**
 * Sync RevenueCat identity with Firebase Auth user.
 */
export async function loginUser(uid) {
  try {
    await Purchases.logIn(uid);
  } catch (error) {
    console.warn('RevenueCat login error:', error.message);
  }
}

/**
 * Clear RevenueCat identity on logout.
 */
export async function logoutUser() {
  try {
    await Purchases.logOut();
  } catch (error) {
    console.warn('RevenueCat logout error:', error.message);
  }
}

/**
 * Check if user has active "premium" entitlement.
 * Works offline via RevenueCat's internal cache.
 * @returns {boolean}
 */
export async function checkPremiumStatus() {
  try {
    const customerInfo = await Purchases.getCustomerInfo();
    return customerInfo.entitlements.active[ENTITLEMENT_ID] !== undefined;
  } catch (error) {
    console.warn('RevenueCat check premium error:', error.message);
    return false;
  }
}

/**
 * Get available offerings (packages with real store prices).
 * @returns {Array} packages from the default offering, or empty array
 */
export async function getOfferings() {
  try {
    const offerings = await Purchases.getOfferings();
    if (offerings.current && offerings.current.availablePackages.length > 0) {
      return offerings.current.availablePackages;
    }
    return [];
  } catch (error) {
    console.warn('RevenueCat offerings error:', error.message);
    return [];
  }
}

/**
 * Execute a real purchase via Google Play.
 * @param {object} pkg - RevenueCat package object
 * @returns {{ success: boolean, isPremium: boolean }}
 */
export async function purchasePackage(pkg) {
  try {
    const { customerInfo } = await Purchases.purchasePackage(pkg);
    const isPremium = customerInfo.entitlements.active[ENTITLEMENT_ID] !== undefined;
    return { success: true, isPremium };
  } catch (error) {
    if (error.userCancelled) {
      return { success: false, isPremium: false, cancelled: true };
    }
    console.warn('RevenueCat purchase error:', error.message);
    throw error;
  }
}

/**
 * Restore previous purchases.
 * @returns {{ isPremium: boolean }}
 */
export async function restorePurchases() {
  try {
    const customerInfo = await Purchases.restorePurchases();
    const isPremium = customerInfo.entitlements.active[ENTITLEMENT_ID] !== undefined;
    return { isPremium };
  } catch (error) {
    console.warn('RevenueCat restore error:', error.message);
    throw error;
  }
}

/**
 * Listen for real-time subscription changes (renewal, cancellation, etc.).
 * @param {function} callback - receives (isPremium: boolean)
 * @returns {function} remove listener
 */
export function addCustomerInfoListener(callback) {
  const listener = (customerInfo) => {
    const isPremium = customerInfo.entitlements.active[ENTITLEMENT_ID] !== undefined;
    callback(isPremium);
  };
  Purchases.addCustomerInfoUpdateListener(listener);
  return () => {
    Purchases.removeCustomerInfoUpdateListener(listener);
  };
}

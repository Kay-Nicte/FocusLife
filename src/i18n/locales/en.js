export default {
  // Common
  common: {
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    error: 'Error',
    done: 'Done',
    back: 'Back',
    yes: 'Yes',
    no: 'No',
    ok: 'OK',
    loading: 'Loading...',
    today: 'Today',
    minutes: 'minutes',
    minute: 'minute',
    days: 'days',
    day: 'day',
  },

  // Navigation
  nav: {
    home: 'Home',
    habits: 'Habits',
    timer: 'Timer',
    stats: 'Stats',
    settings: 'Settings',
  },

  // Home Screen
  home: {
    goodMorning: 'Good morning',
    goodAfternoon: 'Good afternoon',
    goodEvening: 'Good evening',
    completed: 'Completed',
    bestStreak: 'Best streak',
    allCompleted: 'All habits completed',
    todayHabits: "Today's habits",
    seeAll: 'See all',
    emptyTitle: 'Start your first habit',
    emptyText: 'Go to the "Habits" tab to create your first habit and start building your best self.',
    createHabit: 'Create habit',
    deleteHabit: 'Delete habit',
    deleteConfirm: 'Are you sure you want to delete "{{name}}"? All progress will be lost.',
  },

  // Auth Screen
  auth: {
    tagline: 'Build better habits, one day at a time',
    loggingIn: 'Logging in...',
    login: 'Log in',
    register: 'Sign up',
    email: 'Email',
    password: 'Password (min. 6 characters)',
    emailPasswordRequired: 'Enter your email and password',
    passwordMinLength: 'Password must be at least 6 characters',
    createAccount: 'Create account',
    continueWithGoogle: 'Continue with Google',
    continueWithEmail: 'Continue with Email',
    terms: 'By continuing, you accept the terms of use and privacy policy.',
  },

  // Habits Screen
  habits: {
    title: 'My Habits',
    subtitle: '{{count}} habit',
    subtitlePlural: '{{count}} habits',
    maxFree: '(max {{limit}} free)',
    emptyTitle: 'No habits yet',
    emptyText: 'Tap the + button to create your first habit',
    tip: 'Tap to complete • Pencil to edit • Long press to delete',
    editHabit: 'Edit habit',
    newHabit: 'New habit',
    name: 'Name',
    namePlaceholder: 'E.g.: Drink 8 glasses of water',
    icon: 'Icon',
    color: 'Color',
    saveChanges: 'Save changes',
    createHabit: 'Create habit',
    nameRequired: 'Enter a name for your habit',
    reward: 'Reward',
    rewardUnlocked: "You've unlocked 1 extra habit. Now create your habit.",
    rewardUnlockedCreate: "You've unlocked 1 extra habit. Now tap + to create it.",
    limitReached: 'Limit reached',
    limitMessageAd: 'The free version allows {{limit}} habits. Go Premium for unlimited habits, or watch an ad to unlock one more.',
    limitMessageMax: "You've reached the limit of {{limit}} habits. Go Premium for unlimited habits.",
    needPremiumOrAd: 'You need Premium or you can watch an ad to unlock 1 extra habit.',
    watchAd: 'Watch ad (+1 free)',
    seePremium: 'See Premium',
  },

  // Timer Screen
  timer: {
    focus: 'Focus',
    shortBreak: 'Short',
    longBreak: 'Long',
    focusTime: 'Focus time',
    breakTime: 'Break time',
    sessionsToday: 'Sessions completed today: {{count}}',
    focusMinutes: '= {{minutes}} minutes of focus',
    premiumTip: 'Premium: customize timer duration',
  },

  // Stats Screen
  stats: {
    title: 'Statistics',
    subtitle: 'Your progress in detail',
    today: 'Today',
    bestStreak: 'Best streak',
    week: 'Week',
    month: 'Month',
    pomodoroFocus: 'Pomodoro Focus',
    total: 'Total',
    sessions: '{{count}} sessions',
    totalAchievements: 'Total achievements',
    habitsCompletedTotal: 'habits completed in total',
    activeHabits: 'active habits',
    focusSessionsWeek: 'focus sessions this week',
    advancedStats: 'Advanced statistics',
    advancedStatsDesc: 'With Premium you get monthly charts, data export, and detailed productivity analysis.',
    premiumDescription: 'With Premium you get monthly charts, data export, and detailed productivity analysis.',
    thisWeek: 'This week',
    habitStreaks: 'Streaks by habit',
    currentStreak: 'current streak',
    bestDay: 'Best day',
    bestDayDesc: 'Day with most completed habits',
    consistency: 'Consistency',
    consistencyDesc: 'Days with at least 1 completed habit',
    noStreakData: 'Complete habits to see your streaks',
  },

  // Settings Screen
  settings: {
    title: 'Settings',
    premium: 'FocusLife Premium',
    getPremium: 'Go Premium',
    premiumActive: 'You enjoy all features',
    premiumDesc: 'Unlimited habits, no ads and more',
    cancelSubscription: 'Cancel subscription',
    cancelPremiumTitle: 'Cancel Premium',
    cancelPremiumMessage: 'Are you sure you want to cancel your Premium subscription? You will lose access to exclusive features.',
    cancelPremiumManageMessage: 'To manage or cancel your subscription, you need to do it from Google Play Store.',
    manageSubscription: 'Manage subscription',
    keepIt: 'No, keep it',
    yesCancel: 'Yes, cancel',

    // Account
    account: 'Account',
    yourName: 'Your name',
    tapToAddName: 'Tap to add your name',
    noAccount: 'No account',
    loginToSync: 'Log in to sync your data',
    loginError: 'Could not log in',
    logout: 'Log out',
    disconnectAccount: 'Disconnect your account',
    logoutMessage: 'Your local data will remain on this device.',
    sync: 'Sync',
    syncing: 'Syncing...',
    lastSync: 'Last: {{date}}',
    notSynced: 'Not synced yet',

    // Appearance
    appearance: 'Appearance',
    language: 'Language',

    // Timer
    timerSection: 'Timer',
    focusDuration: 'Focus',
    focusDurationTitle: 'Focus duration',
    shortBreakDuration: 'Short break',
    longBreakDuration: 'Long break',

    // Notifications
    notifications: 'Notifications',
    dailyReminder: 'Daily reminder',
    dailyReminderDesc: 'Review your habits every day',
    permissionsRequired: 'Permissions required',
    permissionsMessage: 'To receive notifications, you must allow access in your device settings.',
    openSettings: 'Open settings',
    reminderTime: 'Reminder time',
    streakAlert: 'Streak alert',
    streakAlertDesc: 'Alert at 8 PM if you haven\'t completed habits',
    timerEnd: 'Timer end',
    timerEndDesc: 'Notification when Pomodoro finishes',
    vibration: 'Vibration',
    vibrationDesc: 'When timer completes',

    // About
    about: 'About',
    rateApp: 'Rate the app',
    rateAppDesc: 'Help us with 5 stars',
    share: 'Share',
    shareDesc: 'Recommend FocusLife',
    contact: 'Contact',
    contactDesc: 'Write to us with suggestions',

    // Data
    data: 'Data',
    clearAllData: 'Clear all data',
    clearDataDesc: 'Delete all your progress',
    clearDataTitle: 'Clear all data',
    clearDataMessage: 'All your progress, habits and statistics will be deleted. This action cannot be undone.',
    clearDataButton: 'Clear all',
    dataCleared: 'Data cleared',
    dataClearedMessage: 'All your data has been deleted.',

    // Rate & Share
    rateTitle: 'Rate FocusLife',
    rateMessage: 'Your rating helps us improve. You will be redirected to the store.',
    notNow: 'Not now',
    rate: 'Rate',
    shareTitle: 'Share FocusLife',
    shareMessage: 'Share the app with your friends and help them be more productive.',
    shareContent: "I'm using FocusLife to improve my habits and productivity. Try it! https://play.google.com/store/apps/details?id=com.focuslife.app",

    // Name Modal
    nameModalTitle: 'Your name',
    nameModalSubtitle: 'This name will appear in the greeting',
    namePlaceholder: 'E.g.: Mary, John...',

    // Version
    version: 'FocusLife v1.0.1',
    madeWith: 'Made with dedication',
  },

  // Premium Screen
  premium: {
    title: 'FocusLife Premium',
    subtitle: 'Unlock your full productivity potential',
    choosePlan: 'Choose your plan',
    mostPopular: 'MOST POPULAR',
    restorePurchases: 'Restore purchases',
    legalText: 'Payment will be charged to your Google Play / App Store account. Subscription auto-renews unless cancelled at least 24 hours before the end of the current period.',

    // Features (nested structure)
    features: {
      unlimitedHabits: {
        title: 'Unlimited habits',
        description: 'Create as many habits as you want without limits',
      },
      noAds: {
        title: 'No ads',
        description: 'Enjoy the app without ad interruptions',
      },
      advancedStats: {
        title: 'Advanced statistics',
        description: 'Monthly charts, CSV export and detailed analysis',
      },
      customTimer: {
        title: 'Customizable timer',
        description: 'Set the exact duration of your focus sessions',
      },
      themes: {
        title: 'Themes and customization',
        description: 'Customize the colors and look of the app',
      },
      backup: {
        title: 'Cloud backup',
        description: 'Your data safe in the cloud, sync between devices',
      },
    },

    // Plans (nested structure)
    plans: {
      monthly: {
        name: 'Monthly',
        period: '/month',
      },
      annual: {
        name: 'Annual',
        period: '/year',
        savings: 'Save 44%',
      },
      lifetime: {
        name: 'Lifetime',
        period: 'one-time payment',
      },
    },

    // Purchase
    purchaseTitle: 'Buy Premium',
    purchaseMessage: 'Plan {{name}}: €{{price}} {{period}}\n\nIn production, this will connect to your device store to process the payment securely.',
    simulatePurchase: 'Simulate purchase',
    welcomeTitle: 'Welcome to Premium',
    welcomeMessage: 'You now have access to all features. Enjoy FocusLife without limits.',
    great: 'Great',
    purchaseUnavailable: 'Purchase not available right now. Please try again later.',
    purchasing: 'Processing...',
    restoreTitle: 'Restore purchase',
    restoreMessage: 'In production, this will verify your previous purchases on Google Play / App Store.',
    restoreNoPurchases: 'No previous purchases found.',

    // Already Premium
    youArePremium: "You're Premium",
    enjoyAllFeatures: 'You enjoy all FocusLife features without limits.',
  },

  // Notifications
  notifications: {
    dailyTitle: "📋 Time for your habits!",
    dailyBody: "Review and update your habits progress for today.",
    streakTitle: "🔥 Don't lose your streak!",
    streakBody: "You still have time to complete your habits today.",
    timerFocusTitle: '🎯 Session completed!',
    timerFocusBody: 'Great job! Take a break.',
    timerBreakTitle: '☕ Break is over!',
    timerBreakBody: "Time to get back to focus.",
  },

  // Backgrounds (keys match BACKGROUNDS ids in theme.js)
  backgrounds: {
    midnight: 'Midnight',
    snow: 'Snow',
    rosegarden: 'Pink Garden',
    sakura: 'Sakura',
    oceanbreeze: 'Sea Breeze',
    mint: 'Fresh Mint',
    sunset: 'Sunset',
    lavender: 'Lavender',
    cottoncandy: 'Cotton Candy',
    aurora: 'Northern Lights',
    twilight: 'Twilight',
    forest: 'Forest',
  },

  // Background Selector
  backgroundSelector: {
    title: 'Background',
    choose: 'Choose a background',
    free: 'Free',
    watchAd: 'Watch ad',
    premium: 'Premium',
    unlocked: 'Unlocked',
    unlockedMessage: 'You\'ve unlocked the "{{name}}" background',
    adNotAvailable: 'Ad not available',
    adNotAvailableMessage: 'Try again in a few seconds.',
    premiumBackground: 'Premium Background',
    premiumBackgroundMessage: 'This exclusive background is only available for Premium users.',
  },

  // Habit Icons
  habitIcons: {
    water: 'Water',
    exercise: 'Exercise',
    read: 'Read',
    meditate: 'Meditate',
    sleep: 'Sleep',
    eatHealthy: 'Eat healthy',
    walk: 'Walk',
    study: 'Study',
    code: 'Code',
    music: 'Music',
    gratitude: 'Gratitude',
    noPhone: 'No phone',
    run: 'Run',
    medicine: 'Medicine',
    coffee: 'Coffee',
    wakeEarly: 'Wake early',
  },

  // Days
  days: {
    sun: 'Sun',
    mon: 'Mon',
    tue: 'Tue',
    wed: 'Wed',
    thu: 'Thu',
    fri: 'Fri',
    sat: 'Sat',
  },

  // Streak
  streak: {
    daysInRow: 'days in a row',
    dayInRow: 'day in a row',
  },

  // Quotes
  quotes: {
    quote1: { text: 'The only way to do great work is to love what you do.', author: 'Steve Jobs' },
    quote2: { text: "Don't count the days, make the days count.", author: 'Muhammad Ali' },
    quote3: { text: 'Success is the sum of small efforts repeated day in and day out.', author: 'Robert Collier' },
    quote4: { text: 'Discipline is the bridge between goals and accomplishment.', author: 'Jim Rohn' },
    quote5: { text: 'Every day is a new opportunity to change your life.', author: 'Anonymous' },
    quote6: { text: 'Great achievements require time and consistency.', author: 'Anonymous' },
    quote7: { text: 'Your future is created by what you do today, not tomorrow.', author: 'Robert Kiyosaki' },
    quote8: { text: 'Consistency is the mother of mastery.', author: 'Robin Sharma' },
    quote9: { text: "It doesn't matter how slowly you go, as long as you don't stop.", author: 'Confucius' },
    quote10: { text: 'Believe in yourself and everything is possible.', author: 'Anonymous' },
    quote11: { text: 'Every expert was once a beginner.', author: 'Helen Hayes' },
    quote12: { text: "Do today what others won't, and tomorrow you'll live like others can't.", author: 'Anonymous' },
  },
};

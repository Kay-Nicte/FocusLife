export default {
  // Common
  common: {
    cancel: 'Annuler',
    save: 'Enregistrer',
    delete: 'Supprimer',
    error: 'Erreur',
    done: 'Terminé',
    back: 'Retour',
    yes: 'Oui',
    no: 'Non',
    ok: 'OK',
    loading: 'Chargement...',
    today: "Aujourd'hui",
    minutes: 'minutes',
    minute: 'minute',
    days: 'jours',
    day: 'jour',
  },

  // Navigation
  nav: {
    home: 'Accueil',
    habits: 'Habitudes',
    timer: 'Minuteur',
    stats: 'Stats',
    settings: 'Réglages',
  },

  // Home Screen
  home: {
    goodMorning: 'Bonjour',
    goodAfternoon: 'Bon après-midi',
    goodEvening: 'Bonsoir',
    completed: 'Complété',
    bestStreak: 'Meilleure série',
    allCompleted: 'Toutes les habitudes complétées',
    todayHabits: "Habitudes d'aujourd'hui",
    seeAll: 'Voir tout',
    emptyTitle: 'Commencez votre première habitude',
    emptyText: 'Allez dans l\'onglet "Habitudes" pour créer votre première habitude et commencer à construire la meilleure version de vous-même.',
    createHabit: 'Créer une habitude',
    deleteHabit: 'Supprimer l\'habitude',
    deleteConfirm: 'Êtes-vous sûr de vouloir supprimer "{{name}}" ? Tout le progrès sera perdu.',
  },

  // Auth Screen
  auth: {
    tagline: 'Construisez de meilleures habitudes, un jour à la fois',
    loggingIn: 'Connexion...',
    login: 'Se connecter',
    register: "S'inscrire",
    email: 'Email',
    password: 'Mot de passe (min. 6 caractères)',
    emailPasswordRequired: 'Entrez votre email et mot de passe',
    passwordMinLength: 'Le mot de passe doit contenir au moins 6 caractères',
    createAccount: 'Créer un compte',
    continueWithGoogle: 'Continuer avec Google',
    continueWithEmail: 'Continuer avec Email',
    forgotPassword: 'Mot de passe oublié ?',
    enterEmailForReset: 'Entrez votre email ci-dessus pour réinitialiser votre mot de passe',
    resetSent: 'Email envoyé',
    resetSentMessage: 'Si un compte existe avec cet email, vous recevrez un lien pour réinitialiser votre mot de passe.',
    terms: "En continuant, vous acceptez les conditions d'utilisation et la politique de confidentialité.",
  },

  // Habits Screen
  habits: {
    title: 'Mes Habitudes',
    subtitle: '{{count}} habitude',
    subtitlePlural: '{{count}} habitudes',
    maxFree: '(max {{limit}} gratuites)',
    emptyTitle: 'Pas encore d\'habitudes',
    emptyText: 'Appuyez sur le bouton + pour créer votre première habitude',
    tip: 'Appuyez pour compléter • Crayon pour modifier • Appui long pour supprimer',
    editHabit: 'Modifier l\'habitude',
    newHabit: 'Nouvelle habitude',
    name: 'Nom',
    namePlaceholder: 'Ex : Boire 8 verres d\'eau',
    icon: 'Icône',
    color: 'Couleur',
    saveChanges: 'Enregistrer',
    createHabit: 'Créer l\'habitude',
    nameRequired: 'Entrez un nom pour votre habitude',
    reward: 'Récompense',
    rewardUnlocked: 'Vous avez débloqué 1 habitude supplémentaire. Créez votre habitude maintenant.',
    rewardUnlockedCreate: 'Vous avez débloqué 1 habitude supplémentaire. Appuyez sur + pour la créer.',
    limitReached: 'Limite atteinte',
    limitMessageAd: 'La version gratuite permet {{limit}} habitudes. Passez Premium pour des habitudes illimitées, ou regardez une pub pour en débloquer une de plus.',
    limitMessageMax: 'Vous avez atteint la limite de {{limit}} habitudes. Passez Premium pour des habitudes illimitées.',
    needPremiumOrAd: 'Vous avez besoin de Premium ou vous pouvez regarder une pub pour débloquer 1 habitude supplémentaire.',
    watchAd: 'Voir la pub (+1 gratuite)',
    seePremium: 'Voir Premium',
  },

  // Timer Screen
  timer: {
    focus: 'Focus',
    shortBreak: 'Court',
    longBreak: 'Long',
    focusTime: 'Temps de focus',
    breakTime: 'Temps de pause',
    sessionsToday: 'Sessions complétées aujourd\'hui : {{count}}',
    focusMinutes: '= {{minutes}} minutes de focus',
    premiumTip: 'Premium : personnalisez la durée du minuteur',
  },

  // Stats Screen
  stats: {
    title: 'Statistiques',
    subtitle: 'Votre progrès en détail',
    today: "Aujourd'hui",
    bestStreak: 'Meilleure série',
    week: 'Semaine',
    month: 'Mois',
    pomodoroFocus: 'Focus Pomodoro',
    total: 'Total',
    sessions: '{{count}} sessions',
    totalAchievements: 'Accomplissements totaux',
    habitsCompletedTotal: 'habitudes complétées au total',
    activeHabits: 'habitudes actives',
    focusSessionsWeek: 'sessions de focus cette semaine',
    advancedStats: 'Statistiques avancées',
    advancedStatsDesc: 'Avec Premium, accédez aux graphiques mensuels, export de données et analyses détaillées de productivité.',
    premiumDescription: 'Avec Premium, accédez aux graphiques mensuels, export de données et analyses détaillées de productivité.',
    thisWeek: 'Cette semaine',
    habitStreaks: 'Séries par habitude',
    currentStreak: 'série actuelle',
    bestDay: 'Meilleur jour',
    bestDayDesc: 'Jour avec le plus d\'habitudes complétées',
    consistency: 'Régularité',
    consistencyDesc: 'Jours avec au moins 1 habitude complétée',
    noStreakData: 'Complétez des habitudes pour voir vos séries',
  },

  // Settings Screen
  settings: {
    title: 'Réglages',
    premium: 'FocusLife Premium',
    getPremium: 'Passer Premium',
    premiumActive: 'Vous profitez de toutes les fonctionnalités',
    premiumDesc: 'Habitudes illimitées, sans pubs et plus',
    cancelSubscription: 'Annuler l\'abonnement',
    cancelPremiumTitle: 'Annuler Premium',
    cancelPremiumMessage: 'Êtes-vous sûr de vouloir annuler votre abonnement Premium ? Vous perdrez l\'accès aux fonctionnalités exclusives.',
    cancelPremiumManageMessage: 'Pour gérer ou annuler votre abonnement, vous devez le faire depuis Google Play Store.',
    manageSubscription: 'Gérer l\'abonnement',
    keepIt: 'Non, garder',
    yesCancel: 'Oui, annuler',

    // Account
    account: 'Compte',
    yourName: 'Votre nom',
    tapToAddName: 'Appuyez pour ajouter votre nom',
    noAccount: 'Pas de compte',
    loginToSync: 'Connectez-vous pour synchroniser vos données',
    loginError: 'Impossible de se connecter',
    logout: 'Déconnexion',
    disconnectAccount: 'Déconnecter votre compte',
    logoutMessage: 'Vos données locales resteront sur cet appareil.',
    sync: 'Synchronisation',
    syncing: 'Synchronisation...',
    lastSync: 'Dernière : {{date}}',
    notSynced: 'Pas encore synchronisé',

    // Appearance
    appearance: 'Apparence',
    language: 'Langue',

    // Timer
    timerSection: 'Minuteur',
    focusDuration: 'Focus',
    focusDurationTitle: 'Durée de focus',
    shortBreakDuration: 'Pause courte',
    longBreakDuration: 'Pause longue',

    // Notifications
    notifications: 'Notifications',
    dailyReminder: 'Rappel quotidien',
    dailyReminderDesc: 'Revoir vos habitudes chaque jour',
    permissionsRequired: 'Permissions requises',
    permissionsMessage: 'Pour recevoir des notifications, vous devez autoriser l\'accès dans les paramètres de votre appareil.',
    openSettings: 'Ouvrir les paramètres',
    reminderTime: 'Heure du rappel',
    streakAlert: 'Alerte de série',
    streakAlertDesc: 'Alerte à 20h si vous n\'avez pas complété vos habitudes',
    timerEnd: 'Fin du minuteur',
    timerEndDesc: 'Notification quand le Pomodoro se termine',
    vibration: 'Vibration',
    vibrationDesc: 'À la fin du minuteur',

    // About
    about: 'À propos',
    rateApp: 'Noter l\'app',
    rateAppDesc: 'Aidez-nous avec 5 étoiles',
    share: 'Partager',
    shareDesc: 'Recommandez FocusLife',
    contact: 'Contact',
    contactDesc: 'Écrivez-nous vos suggestions',

    // Data
    data: 'Données',
    clearAllData: 'Effacer toutes les données',
    clearDataDesc: 'Supprimer tout votre progrès',
    clearDataTitle: 'Effacer toutes les données',
    clearDataMessage: 'Tout votre progrès, habitudes et statistiques seront supprimés. Cette action est irréversible.',
    clearDataButton: 'Tout effacer',
    dataCleared: 'Données effacées',
    dataClearedMessage: 'Toutes vos données ont été supprimées.',

    // Rate & Share
    rateTitle: 'Noter FocusLife',
    rateMessage: 'Votre note nous aide à nous améliorer. Vous serez redirigé vers le store.',
    notNow: 'Pas maintenant',
    rate: 'Noter',
    shareTitle: 'Partager FocusLife',
    shareMessage: 'Partagez l\'app avec vos amis et aidez-les à être plus productifs.',
    shareContent: 'J\'utilise FocusLife pour améliorer mes habitudes et ma productivité. Essayez-la ! https://play.google.com/store/apps/details?id=com.focuslife.app',

    // Name Modal
    nameModalTitle: 'Votre nom',
    nameModalSubtitle: 'Ce nom apparaîtra dans la salutation',
    namePlaceholder: 'Ex : Marie, Pierre...',

    // Version
    version: 'FocusLife v1.0.1',
    madeWith: 'Fait avec dévouement',
  },

  // Premium Screen
  premium: {
    title: 'FocusLife Premium',
    subtitle: 'Débloquez tout votre potentiel de productivité',
    choosePlan: 'Choisissez votre plan',
    mostPopular: 'PLUS POPULAIRE',
    restorePurchases: 'Restaurer les achats',
    legalText: 'Le paiement sera débité de votre compte Google Play / App Store. L\'abonnement se renouvelle automatiquement sauf annulation au moins 24 heures avant la fin de la période en cours.',

    // Features (nested structure)
    features: {
      unlimitedHabits: {
        title: 'Habitudes illimitées',
        description: 'Créez autant d\'habitudes que vous voulez sans limites',
      },
      noAds: {
        title: 'Sans publicité',
        description: 'Profitez de l\'app sans interruptions publicitaires',
      },
      advancedStats: {
        title: 'Statistiques avancées',
        description: 'Graphiques mensuels, export CSV et analyses détaillées',
      },
      customTimer: {
        title: 'Minuteur personnalisable',
        description: 'Définissez la durée exacte de vos sessions de focus',
      },
      themes: {
        title: 'Thèmes et personnalisation',
        description: 'Personnalisez les couleurs et l\'apparence de l\'app',
      },
      backup: {
        title: 'Sauvegarde cloud',
        description: 'Vos données en sécurité dans le cloud, synchronisez entre appareils',
      },
    },

    // Plans (nested structure)
    plans: {
      monthly: {
        name: 'Mensuel',
        period: '/mois',
      },
      annual: {
        name: 'Annuel',
        period: '/an',
        savings: 'Économisez 44%',
      },
      lifetime: {
        name: 'À vie',
        period: 'paiement unique',
      },
    },

    // Purchase
    purchaseTitle: 'Acheter Premium',
    purchaseMessage: 'Plan {{name}} : {{price}}€ {{period}}\n\nEn production, ceci connectera au store de votre appareil pour traiter le paiement de manière sécurisée.',
    simulatePurchase: 'Simuler l\'achat',
    welcomeTitle: 'Bienvenue dans Premium',
    welcomeMessage: 'Vous avez maintenant accès à toutes les fonctionnalités. Profitez de FocusLife sans limites.',
    great: 'Génial',
    purchaseUnavailable: 'Achat non disponible pour le moment. Veuillez réessayer plus tard.',
    purchasing: 'Traitement...',
    restoreTitle: 'Restaurer l\'achat',
    restoreMessage: 'En production, ceci vérifiera vos achats précédents sur Google Play / App Store.',
    restoreNoPurchases: 'Aucun achat précédent trouvé.',

    // Already Premium
    youArePremium: 'Vous êtes Premium',
    enjoyAllFeatures: 'Vous profitez de toutes les fonctionnalités de FocusLife sans limites.',
  },

  // Notifications
  notifications: {
    dailyTitle: '📋 L\'heure de vos habitudes !',
    dailyBody: 'Vérifiez et mettez à jour le progrès de vos habitudes aujourd\'hui.',
    streakTitle: '🔥 Ne perdez pas votre série !',
    streakBody: 'Vous avez encore le temps de compléter vos habitudes aujourd\'hui.',
    timerFocusTitle: '🎯 Session terminée !',
    timerFocusBody: 'Excellent travail ! Prenez une pause.',
    timerBreakTitle: '☕ Pause terminée !',
    timerBreakBody: 'Il est temps de revenir au focus.',
  },

  // Backgrounds (keys match BACKGROUNDS ids in theme.js)
  backgrounds: {
    midnight: 'Minuit',
    snow: 'Neige',
    rosegarden: 'Jardin Rose',
    sakura: 'Sakura',
    oceanbreeze: 'Brise Marine',
    mint: 'Menthe Fraîche',
    sunset: 'Coucher de soleil',
    lavender: 'Lavande',
    cottoncandy: 'Barbe à Papa',
    aurora: 'Aurore Boréale',
    twilight: 'Crépuscule',
    forest: 'Forêt',
  },

  // Background Selector
  backgroundSelector: {
    title: 'Fond',
    choose: 'Choisissez un fond',
    free: 'Gratuit',
    watchAd: 'Voir la pub',
    premium: 'Premium',
    unlocked: 'Débloqué',
    unlockedMessage: 'Vous avez débloqué le fond "{{name}}"',
    adNotAvailable: 'Pub non disponible',
    adNotAvailableMessage: 'Réessayez dans quelques secondes.',
    premiumBackground: 'Fond Premium',
    premiumBackgroundMessage: 'Ce fond exclusif est disponible uniquement pour les utilisateurs Premium.',
  },

  // Habit Icons
  habitIcons: {
    water: 'Eau',
    exercise: 'Exercice',
    read: 'Lire',
    meditate: 'Méditer',
    sleep: 'Dormir',
    eatHealthy: 'Manger sainement',
    walk: 'Marcher',
    study: 'Étudier',
    code: 'Programmer',
    music: 'Musique',
    gratitude: 'Gratitude',
    noPhone: 'Sans téléphone',
    run: 'Courir',
    medicine: 'Médicaments',
    coffee: 'Café',
    wakeEarly: 'Se lever tôt',
  },

  // Days
  days: {
    sun: 'Dim',
    mon: 'Lun',
    tue: 'Mar',
    wed: 'Mer',
    thu: 'Jeu',
    fri: 'Ven',
    sat: 'Sam',
  },

  // Streak
  streak: {
    daysInRow: 'jours consécutifs',
    dayInRow: 'jour consécutif',
  },

  // Quotes
  quotes: {
    quote1: { text: 'La seule façon de faire un excellent travail est d\'aimer ce que vous faites.', author: 'Steve Jobs' },
    quote2: { text: 'Ne comptez pas les jours, faites que les jours comptent.', author: 'Muhammad Ali' },
    quote3: { text: 'Le succès est la somme de petits efforts répétés jour après jour.', author: 'Robert Collier' },
    quote4: { text: 'La discipline est le pont entre les objectifs et les accomplissements.', author: 'Jim Rohn' },
    quote5: { text: 'Chaque jour est une nouvelle opportunité de changer votre vie.', author: 'Anonyme' },
    quote6: { text: 'Les grandes réalisations demandent du temps et de la constance.', author: 'Anonyme' },
    quote7: { text: 'Votre avenir est créé par ce que vous faites aujourd\'hui, pas demain.', author: 'Robert Kiyosaki' },
    quote8: { text: 'La constance est la mère de la maîtrise.', author: 'Robin Sharma' },
    quote9: { text: 'Peu importe la lenteur de votre progression, tant que vous ne vous arrêtez pas.', author: 'Confucius' },
    quote10: { text: 'Croyez en vous et tout devient possible.', author: 'Anonyme' },
    quote11: { text: 'Chaque expert a un jour été un débutant.', author: 'Helen Hayes' },
    quote12: { text: 'Faites aujourd\'hui ce que les autres ne veulent pas, et demain vous vivrez comme les autres ne peuvent pas.', author: 'Anonyme' },
  },
};

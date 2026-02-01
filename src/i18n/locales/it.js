export default {
  // Common
  common: {
    cancel: 'Annulla',
    save: 'Salva',
    delete: 'Elimina',
    error: 'Errore',
    done: 'Fatto',
    back: 'Indietro',
    yes: 'Sì',
    no: 'No',
    ok: 'OK',
    loading: 'Caricamento...',
    today: 'Oggi',
    minutes: 'minuti',
    minute: 'minuto',
    days: 'giorni',
    day: 'giorno',
  },

  // Navigation
  nav: {
    home: 'Home',
    habits: 'Abitudini',
    timer: 'Timer',
    stats: 'Stats',
    settings: 'Impostazioni',
  },

  // Home Screen
  home: {
    goodMorning: 'Buongiorno',
    goodAfternoon: 'Buon pomeriggio',
    goodEvening: 'Buonasera',
    completed: 'Completato',
    bestStreak: 'Miglior serie',
    allCompleted: 'Tutte le abitudini completate',
    todayHabits: 'Abitudini di oggi',
    seeAll: 'Vedi tutto',
    emptyTitle: 'Inizia la tua prima abitudine',
    emptyText: 'Vai alla scheda "Abitudini" per creare la tua prima abitudine e iniziare a costruire la versione migliore di te stesso.',
    createHabit: 'Crea abitudine',
    deleteHabit: 'Elimina abitudine',
    deleteConfirm: 'Sei sicuro di voler eliminare "{{name}}"? Tutti i progressi saranno persi.',
  },

  // Auth Screen
  auth: {
    tagline: 'Costruisci abitudini migliori, un giorno alla volta',
    loggingIn: 'Accesso in corso...',
    login: 'Accedi',
    register: 'Registrati',
    email: 'Email',
    password: 'Password (min. 6 caratteri)',
    emailPasswordRequired: 'Inserisci email e password',
    passwordMinLength: 'La password deve avere almeno 6 caratteri',
    createAccount: 'Crea account',
    continueWithGoogle: 'Continua con Google',
    continueWithEmail: 'Continua con Email',
    forgotPassword: 'Password dimenticata?',
    enterEmailForReset: 'Inserisci la tua email sopra per reimpostare la password',
    resetSent: 'Email inviata',
    resetSentMessage: 'Se esiste un account con questa email, riceverai un link per reimpostare la password.',
    terms: "Continuando, accetti i termini d'uso e l'informativa sulla privacy.",
  },

  // Habits Screen
  habits: {
    title: 'Le Mie Abitudini',
    subtitle: '{{count}} abitudine',
    subtitlePlural: '{{count}} abitudini',
    maxFree: '(max {{limit}} gratis)',
    emptyTitle: 'Nessuna abitudine ancora',
    emptyText: 'Tocca il pulsante + per creare la tua prima abitudine',
    tip: 'Tocca per completare • Matita per modificare • Tieni premuto per eliminare',
    editHabit: 'Modifica abitudine',
    newHabit: 'Nuova abitudine',
    name: 'Nome',
    namePlaceholder: 'Es: Bere 8 bicchieri d\'acqua',
    icon: 'Icona',
    color: 'Colore',
    saveChanges: 'Salva modifiche',
    createHabit: 'Crea abitudine',
    nameRequired: 'Inserisci un nome per la tua abitudine',
    reward: 'Ricompensa',
    rewardUnlocked: 'Hai sbloccato 1 abitudine extra. Ora crea la tua abitudine.',
    rewardUnlockedCreate: 'Hai sbloccato 1 abitudine extra. Ora tocca + per crearla.',
    limitReached: 'Limite raggiunto',
    limitMessageAd: 'La versione gratuita permette {{limit}} abitudini. Diventa Premium per abitudini illimitate, o guarda una pubblicità per sbloccarne un\'altra.',
    limitMessageMax: 'Hai raggiunto il limite di {{limit}} abitudini. Diventa Premium per abitudini illimitate.',
    needPremiumOrAd: 'Hai bisogno di Premium o puoi guardare una pubblicità per sbloccare 1 abitudine extra.',
    watchAd: 'Guarda pubblicità (+1 gratis)',
    seePremium: 'Vedi Premium',
  },

  // Timer Screen
  timer: {
    focus: 'Focus',
    shortBreak: 'Breve',
    longBreak: 'Lungo',
    focusTime: 'Tempo di focus',
    breakTime: 'Tempo di pausa',
    sessionsToday: 'Sessioni completate oggi: {{count}}',
    focusMinutes: '= {{minutes}} minuti di focus',
    premiumTip: 'Premium: personalizza la durata del timer',
  },

  // Stats Screen
  stats: {
    title: 'Statistiche',
    subtitle: 'I tuoi progressi in dettaglio',
    today: 'Oggi',
    bestStreak: 'Miglior serie',
    week: 'Settimana',
    month: 'Mese',
    pomodoroFocus: 'Focus Pomodoro',
    total: 'Totale',
    sessions: '{{count}} sessioni',
    totalAchievements: 'Risultati totali',
    habitsCompletedTotal: 'abitudini completate in totale',
    activeHabits: 'abitudini attive',
    focusSessionsWeek: 'sessioni di focus questa settimana',
    advancedStats: 'Statistiche avanzate',
    advancedStatsDesc: 'Con Premium hai grafici mensili, esportazione dati e analisi dettagliate della produttività.',
    premiumDescription: 'Con Premium hai grafici mensili, esportazione dati e analisi dettagliate della produttività.',
    thisWeek: 'Questa settimana',
    habitStreaks: 'Serie per abitudine',
    currentStreak: 'serie attuale',
    bestDay: 'Giorno migliore',
    bestDayDesc: 'Giorno con più abitudini completate',
    consistency: 'Costanza',
    consistencyDesc: 'Giorni con almeno 1 abitudine completata',
    noStreakData: 'Completa le abitudini per vedere le serie',
  },

  // Settings Screen
  settings: {
    title: 'Impostazioni',
    premium: 'FocusLife Premium',
    getPremium: 'Diventa Premium',
    premiumActive: 'Godi di tutte le funzionalità',
    premiumDesc: 'Abitudini illimitate, senza pubblicità e altro',
    cancelSubscription: 'Annulla abbonamento',
    cancelPremiumTitle: 'Annulla Premium',
    cancelPremiumMessage: 'Sei sicuro di voler annullare il tuo abbonamento Premium? Perderai l\'accesso alle funzionalità esclusive.',
    cancelPremiumManageMessage: 'Per gestire o annullare il tuo abbonamento, devi farlo dal Google Play Store.',
    manageSubscription: 'Gestisci abbonamento',
    keepIt: 'No, mantieni',
    yesCancel: 'Sì, annulla',

    // Account
    account: 'Account',
    yourName: 'Il tuo nome',
    tapToAddName: 'Tocca per aggiungere il tuo nome',
    noAccount: 'Nessun account',
    loginToSync: 'Accedi per sincronizzare i tuoi dati',
    loginError: 'Impossibile accedere',
    logout: 'Esci',
    disconnectAccount: 'Disconnetti il tuo account',
    logoutMessage: 'I tuoi dati locali rimarranno su questo dispositivo.',
    sync: 'Sincronizzazione',
    syncing: 'Sincronizzazione...',
    lastSync: 'Ultima: {{date}}',
    notSynced: 'Non ancora sincronizzato',

    // Appearance
    appearance: 'Aspetto',
    language: 'Lingua',

    // Timer
    timerSection: 'Timer',
    focusDuration: 'Focus',
    focusDurationTitle: 'Durata focus',
    shortBreakDuration: 'Pausa breve',
    longBreakDuration: 'Pausa lunga',

    // Notifications
    notifications: 'Notifiche',
    dailyReminder: 'Promemoria giornaliero',
    dailyReminderDesc: 'Rivedi le tue abitudini ogni giorno',
    permissionsRequired: 'Permessi necessari',
    permissionsMessage: 'Per ricevere notifiche, devi consentire l\'accesso nelle impostazioni del dispositivo.',
    openSettings: 'Apri impostazioni',
    reminderTime: 'Ora del promemoria',
    streakAlert: 'Avviso serie',
    streakAlertDesc: 'Avviso alle 20:00 se non hai completato le abitudini',
    timerEnd: 'Fine timer',
    timerEndDesc: 'Notifica quando il Pomodoro finisce',
    vibration: 'Vibrazione',
    vibrationDesc: 'Al completamento del timer',

    // About
    about: 'Informazioni',
    rateApp: 'Valuta l\'app',
    rateAppDesc: 'Aiutaci con 5 stelle',
    share: 'Condividi',
    shareDesc: 'Consiglia FocusLife',
    contact: 'Contatto',
    contactDesc: 'Scrivici i tuoi suggerimenti',

    // Data
    data: 'Dati',
    clearAllData: 'Cancella tutti i dati',
    clearDataDesc: 'Elimina tutti i tuoi progressi',
    clearDataTitle: 'Cancella tutti i dati',
    clearDataMessage: 'Tutti i tuoi progressi, abitudini e statistiche saranno eliminati. Questa azione non può essere annullata.',
    clearDataButton: 'Cancella tutto',
    dataCleared: 'Dati cancellati',
    dataClearedMessage: 'Tutti i tuoi dati sono stati eliminati.',

    // Rate & Share
    rateTitle: 'Valuta FocusLife',
    rateMessage: 'La tua valutazione ci aiuta a migliorare. Sarai reindirizzato allo store.',
    notNow: 'Non ora',
    rate: 'Valuta',
    shareTitle: 'Condividi FocusLife',
    shareMessage: 'Condividi l\'app con i tuoi amici e aiutali a essere più produttivi.',
    shareContent: 'Sto usando FocusLife per migliorare le mie abitudini e produttività. Provala! https://play.google.com/store/apps/details?id=com.focuslife.app',

    // Name Modal
    nameModalTitle: 'Il tuo nome',
    nameModalSubtitle: 'Questo nome apparirà nel saluto',
    namePlaceholder: 'Es: Maria, Marco...',

    // Version
    version: 'FocusLife v1.0.1',
    madeWith: 'Fatto con dedizione',
  },

  // Premium Screen
  premium: {
    title: 'FocusLife Premium',
    subtitle: 'Sblocca tutto il tuo potenziale di produttività',
    choosePlan: 'Scegli il tuo piano',
    mostPopular: 'PIÙ POPOLARE',
    restorePurchases: 'Ripristina acquisti',
    legalText: 'Il pagamento sarà addebitato sul tuo account Google Play / App Store. L\'abbonamento si rinnova automaticamente a meno che non venga annullato almeno 24 ore prima della fine del periodo corrente.',

    // Features (nested structure)
    features: {
      unlimitedHabits: {
        title: 'Abitudini illimitate',
        description: 'Crea quante abitudini vuoi senza limiti',
      },
      noAds: {
        title: 'Senza pubblicità',
        description: 'Goditi l\'app senza interruzioni pubblicitarie',
      },
      advancedStats: {
        title: 'Statistiche avanzate',
        description: 'Grafici mensili, esportazione CSV e analisi dettagliate',
      },
      customTimer: {
        title: 'Timer personalizzabile',
        description: 'Imposta la durata esatta delle tue sessioni di focus',
      },
      themes: {
        title: 'Temi e personalizzazione',
        description: 'Personalizza i colori e l\'aspetto dell\'app',
      },
      backup: {
        title: 'Backup cloud',
        description: 'I tuoi dati al sicuro nel cloud, sincronizza tra dispositivi',
      },
    },

    // Plans (nested structure)
    plans: {
      monthly: {
        name: 'Mensile',
        period: '/mese',
      },
      annual: {
        name: 'Annuale',
        period: '/anno',
        savings: 'Risparmia 44%',
      },
      lifetime: {
        name: 'A vita',
        period: 'pagamento unico',
      },
    },

    // Purchase
    purchaseTitle: 'Acquista Premium',
    purchaseMessage: 'Piano {{name}}: €{{price}} {{period}}\n\nIn produzione, questo si collegherà allo store del tuo dispositivo per elaborare il pagamento in modo sicuro.',
    simulatePurchase: 'Simula acquisto',
    welcomeTitle: 'Benvenuto in Premium',
    welcomeMessage: 'Ora hai accesso a tutte le funzionalità. Goditi FocusLife senza limiti.',
    great: 'Fantastico',
    purchaseUnavailable: 'Acquisto non disponibile al momento. Riprova più tardi.',
    purchasing: 'Elaborazione...',
    restoreTitle: 'Ripristina acquisto',
    restoreMessage: 'In produzione, questo verificherà i tuoi acquisti precedenti su Google Play / App Store.',
    restoreNoPurchases: 'Nessun acquisto precedente trovato.',

    // Already Premium
    youArePremium: 'Sei Premium',
    enjoyAllFeatures: 'Godi di tutte le funzionalità di FocusLife senza limites.',
  },

  // Notifications
  notifications: {
    dailyTitle: '📋 È ora delle tue abitudini!',
    dailyBody: 'Controlla e aggiorna i progressi delle tue abitudini di oggi.',
    streakTitle: '🔥 Non perdere la tua serie!',
    streakBody: 'Hai ancora tempo per completare le tue abitudini oggi.',
    timerFocusTitle: '🎯 Sessione completata!',
    timerFocusBody: 'Ottimo lavoro! Prenditi una pausa.',
    timerBreakTitle: '☕ Pausa terminata!',
    timerBreakBody: 'È ora di tornare al focus.',
  },

  // Backgrounds (keys match BACKGROUNDS ids in theme.js)
  backgrounds: {
    midnight: 'Mezzanotte',
    snow: 'Neve',
    rosegarden: 'Giardino Rosa',
    sakura: 'Sakura',
    oceanbreeze: 'Brezza Marina',
    mint: 'Menta Fresca',
    sunset: 'Tramonto',
    lavender: 'Lavanda',
    cottoncandy: 'Zucchero Filato',
    aurora: 'Aurora Boreale',
    twilight: 'Crepuscolo',
    forest: 'Foresta',
  },

  // Background Selector
  backgroundSelector: {
    title: 'Sfondo',
    choose: 'Scegli uno sfondo',
    free: 'Gratis',
    watchAd: 'Guarda pubblicità',
    premium: 'Premium',
    unlocked: 'Sbloccato',
    unlockedMessage: 'Hai sbloccato lo sfondo "{{name}}"',
    adNotAvailable: 'Pubblicità non disponibile',
    adNotAvailableMessage: 'Riprova tra qualche secondo.',
    premiumBackground: 'Sfondo Premium',
    premiumBackgroundMessage: 'Questo sfondo esclusivo è disponibile solo per gli utenti Premium.',
  },

  // Habit Icons
  habitIcons: {
    water: 'Acqua',
    exercise: 'Esercizio',
    read: 'Leggere',
    meditate: 'Meditare',
    sleep: 'Dormire',
    eatHealthy: 'Mangiare sano',
    walk: 'Camminare',
    study: 'Studiare',
    code: 'Programmare',
    music: 'Musica',
    gratitude: 'Gratitudine',
    noPhone: 'Senza telefono',
    run: 'Correre',
    medicine: 'Medicine',
    coffee: 'Caffè',
    wakeEarly: 'Svegliarsi presto',
  },

  // Days
  days: {
    sun: 'Dom',
    mon: 'Lun',
    tue: 'Mar',
    wed: 'Mer',
    thu: 'Gio',
    fri: 'Ven',
    sat: 'Sab',
  },

  // Streak
  streak: {
    daysInRow: 'giorni consecutivi',
    dayInRow: 'giorno consecutivo',
  },

  // Quotes
  quotes: {
    quote1: { text: 'L\'unico modo per fare un ottimo lavoro è amare quello che fai.', author: 'Steve Jobs' },
    quote2: { text: 'Non contare i giorni, fai che i giorni contino.', author: 'Muhammad Ali' },
    quote3: { text: 'Il successo è la somma di piccoli sforzi ripetuti giorno dopo giorno.', author: 'Robert Collier' },
    quote4: { text: 'La disciplina è il ponte tra gli obiettivi e i risultati.', author: 'Jim Rohn' },
    quote5: { text: 'Ogni giorno è una nuova opportunità per cambiare la tua vita.', author: 'Anonimo' },
    quote6: { text: 'I grandi risultati richiedono tempo e costanza.', author: 'Anonimo' },
    quote7: { text: 'Il tuo futuro è creato da quello che fai oggi, non domani.', author: 'Robert Kiyosaki' },
    quote8: { text: 'La costanza è la madre della maestria.', author: 'Robin Sharma' },
    quote9: { text: 'Non importa quanto lentamente vai, purché tu non ti fermi.', author: 'Confucio' },
    quote10: { text: 'Credi in te stesso e tutto sarà possibile.', author: 'Anonimo' },
    quote11: { text: 'Ogni esperto è stato una volta un principiante.', author: 'Helen Hayes' },
    quote12: { text: 'Fai oggi quello che gli altri non vogliono, e domani vivrai come gli altri non possono.', author: 'Anonimo' },
  },
};

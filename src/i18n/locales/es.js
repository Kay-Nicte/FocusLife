export default {
  // Common
  common: {
    cancel: 'Cancelar',
    save: 'Guardar',
    delete: 'Eliminar',
    error: 'Error',
    done: 'Listo',
    back: 'Volver',
    yes: 'Sí',
    no: 'No',
    ok: 'OK',
    loading: 'Cargando...',
    today: 'Hoy',
    minutes: 'minutos',
    minute: 'minuto',
    days: 'días',
    day: 'día',
  },

  // Navigation
  nav: {
    home: 'Inicio',
    habits: 'Hábitos',
    timer: 'Timer',
    stats: 'Stats',
    settings: 'Ajustes',
  },

  // Home Screen
  home: {
    goodMorning: 'Buenos días',
    goodAfternoon: 'Buenas tardes',
    goodEvening: 'Buenas noches',
    completed: 'Completado',
    bestStreak: 'Mejor racha',
    allCompleted: 'Todos los hábitos completados',
    todayHabits: 'Hábitos de hoy',
    seeAll: 'Ver todos',
    emptyTitle: 'Empieza tu primer hábito',
    emptyText: 'Ve a la pestaña "Hábitos" para crear tu primer hábito y comenzar a construir tu mejor versión.',
    createHabit: 'Crear hábito',
    deleteHabit: 'Eliminar hábito',
    deleteConfirm: '¿Seguro que quieres eliminar "{{name}}"? Se perderá todo el progreso.',
  },

  // Auth Screen
  auth: {
    tagline: 'Construye mejores hábitos, un día a la vez',
    loggingIn: 'Iniciando sesión...',
    login: 'Iniciar sesión',
    register: 'Registrarse',
    email: 'Email',
    password: 'Contraseña (mín. 6 caracteres)',
    emailPasswordRequired: 'Introduce tu email y contraseña',
    passwordMinLength: 'La contraseña debe tener al menos 6 caracteres',
    createAccount: 'Crear cuenta',
    continueWithGoogle: 'Continuar con Google',
    continueWithEmail: 'Continuar con Email',
    forgotPassword: '¿Olvidaste tu contraseña?',
    enterEmailForReset: 'Escribe tu email arriba para recuperar la contraseña',
    resetSent: 'Correo enviado',
    resetSentMessage: 'Si existe una cuenta con ese email, recibirás un enlace para restablecer tu contraseña.',
    terms: 'Al continuar, aceptas los términos de uso y la política de privacidad.',
  },

  // Habits Screen
  habits: {
    title: 'Mis Hábitos',
    subtitle: '{{count}} hábito',
    subtitlePlural: '{{count}} hábitos',
    maxFree: '(máx {{limit}} gratis)',
    emptyTitle: 'Sin hábitos todavía',
    emptyText: 'Pulsa el botón + para crear tu primer hábito',
    tip: 'Toca para completar • Lápiz para editar • Mantén pulsado para eliminar',
    editHabit: 'Editar hábito',
    newHabit: 'Nuevo hábito',
    name: 'Nombre',
    namePlaceholder: 'Ej: Beber 8 vasos de agua',
    icon: 'Icono',
    color: 'Color',
    saveChanges: 'Guardar cambios',
    createHabit: 'Crear hábito',
    nameRequired: 'Escribe un nombre para tu hábito',
    reward: 'Recompensa',
    rewardUnlocked: 'Has desbloqueado 1 hábito extra. Ahora crea tu hábito.',
    rewardUnlockedCreate: 'Has desbloqueado 1 hábito extra. Ahora pulsa + para crearlo.',
    limitReached: 'Límite alcanzado',
    limitMessageAd: 'La versión gratuita permite {{limit}} hábitos. Hazte Premium para hábitos ilimitados, o ve un anuncio para desbloquear uno más.',
    limitMessageMax: 'Has alcanzado el límite de {{limit}} hábitos. Hazte Premium para hábitos ilimitados.',
    needPremiumOrAd: 'Necesitas Premium o puedes ver un anuncio para desbloquear 1 hábito extra.',
    watchAd: 'Ver anuncio (+1 gratis)',
    seePremium: 'Ver Premium',
  },

  // Timer Screen
  timer: {
    focus: 'Enfoque',
    shortBreak: 'Corto',
    longBreak: 'Largo',
    focusTime: 'Tiempo de enfoque',
    breakTime: 'Tiempo de descanso',
    sessionsToday: 'Sesiones completadas hoy: {{count}}',
    focusMinutes: '= {{minutes}} minutos de enfoque',
    premiumTip: 'Premium: personaliza la duración del temporizador',
  },

  // Stats Screen
  stats: {
    title: 'Estadísticas',
    subtitle: 'Tu progreso en detalle',
    today: 'Hoy',
    bestStreak: 'Mejor racha',
    week: 'Semana',
    month: 'Mes',
    pomodoroFocus: 'Enfoque Pomodoro',
    total: 'Total',
    sessions: '{{count}} sesiones',
    totalAchievements: 'Logros totales',
    habitsCompletedTotal: 'hábitos completados en total',
    activeHabits: 'hábitos activos',
    focusSessionsWeek: 'sesiones de enfoque esta semana',
    advancedStats: 'Estadísticas avanzadas',
    advancedStatsDesc: 'Con Premium accedes a gráficos mensuales, exportación de datos, y análisis detallados de tu productividad.',
    premiumDescription: 'Con Premium accedes a gráficos mensuales, exportación de datos, y análisis detallados de tu productividad.',
    thisWeek: 'Esta semana',
    habitStreaks: 'Rachas por hábito',
    currentStreak: 'racha actual',
    bestDay: 'Mejor día',
    bestDayDesc: 'Día con más hábitos completados',
    consistency: 'Consistencia',
    consistencyDesc: 'Días con al menos 1 hábito completado',
    noStreakData: 'Completa hábitos para ver tus rachas',
  },

  // Settings Screen
  settings: {
    title: 'Ajustes',
    premium: 'FocusLife Premium',
    getPremium: 'Hazte Premium',
    premiumActive: 'Disfrutas de todas las funciones',
    premiumDesc: 'Hábitos ilimitados, sin anuncios y más',
    cancelSubscription: 'Cancelar suscripción',
    cancelPremiumTitle: 'Cancelar Premium',
    cancelPremiumMessage: '¿Seguro que quieres cancelar tu suscripción Premium? Perderás acceso a las funciones exclusivas.',
    cancelPremiumManageMessage: 'Para gestionar o cancelar tu suscripción, debes hacerlo desde Google Play Store.',
    manageSubscription: 'Gestionar suscripción',
    keepIt: 'No, mantener',
    yesCancel: 'Sí, cancelar',

    // Account
    account: 'Cuenta',
    yourName: 'Tu nombre',
    tapToAddName: 'Toca para añadir tu nombre',
    noAccount: 'Sin cuenta',
    loginToSync: 'Inicia sesión para sincronizar tus datos',
    loginError: 'No se pudo iniciar sesión',
    logout: 'Cerrar sesión',
    disconnectAccount: 'Desconectar tu cuenta',
    logoutMessage: 'Tus datos locales se mantendrán en este dispositivo.',
    sync: 'Sincronización',
    syncing: 'Sincronizando...',
    lastSync: 'Última: {{date}}',
    notSynced: 'Sin sincronizar aún',

    // Appearance
    appearance: 'Apariencia',
    language: 'Idioma',

    // Timer
    timerSection: 'Temporizador',
    focusDuration: 'Enfoque',
    focusDurationTitle: 'Duración de enfoque',
    shortBreakDuration: 'Descanso corto',
    longBreakDuration: 'Descanso largo',

    // Notifications
    notifications: 'Notificaciones',
    dailyReminder: 'Recordatorio diario',
    dailyReminderDesc: 'Revisar tus hábitos cada día',
    permissionsRequired: 'Permisos necesarios',
    permissionsMessage: 'Para recibir notificaciones, debes permitir el acceso en los ajustes de tu dispositivo.',
    openSettings: 'Abrir ajustes',
    reminderTime: 'Hora del recordatorio',
    streakAlert: 'Alerta de racha',
    streakAlertDesc: 'Aviso a las 20:00 si no completaste hábitos',
    timerEnd: 'Fin de temporizador',
    timerEndDesc: 'Notificación cuando termina el Pomodoro',
    vibration: 'Vibración',
    vibrationDesc: 'Al completar temporizador',

    // About
    about: 'Acerca de',
    rateApp: 'Valorar la app',
    rateAppDesc: 'Ayúdanos con 5 estrellas',
    share: 'Compartir',
    shareDesc: 'Recomienda FocusLife',
    contact: 'Contacto',
    contactDesc: 'Escríbenos para sugerencias',

    // Data
    data: 'Datos',
    clearAllData: 'Borrar todos los datos',
    clearDataDesc: 'Elimina todo tu progreso',
    clearDataTitle: 'Borrar todos los datos',
    clearDataMessage: 'Se eliminará todo tu progreso, hábitos y estadísticas. Esta acción no se puede deshacer.',
    clearDataButton: 'Borrar todo',
    dataCleared: 'Datos eliminados',
    dataClearedMessage: 'Todos tus datos han sido borrados.',

    // Rate & Share
    rateTitle: 'Valorar FocusLife',
    rateMessage: 'Tu valoración nos ayuda a seguir mejorando. Serás redirigido a la tienda.',
    notNow: 'Ahora no',
    rate: 'Valorar',
    shareTitle: 'Compartir FocusLife',
    shareMessage: 'Comparte la app con tus amigos y ayúdales a ser más productivos.',
    shareContent: 'Estoy usando FocusLife para mejorar mis hábitos y productividad. ¡Pruébala! https://play.google.com/store/apps/details?id=com.focuslife.app',

    // Name Modal
    nameModalTitle: 'Tu nombre',
    nameModalSubtitle: 'Este nombre aparecerá en el saludo de inicio',
    namePlaceholder: 'Ej: María, Carlos...',

    // Version
    version: 'FocusLife v1.0.1',
    madeWith: 'Hecho con dedicación',
  },

  // Premium Screen
  premium: {
    title: 'FocusLife Premium',
    subtitle: 'Desbloquea todo el potencial de tu productividad',
    choosePlan: 'Elige tu plan',
    mostPopular: 'MÁS POPULAR',
    restorePurchases: 'Restaurar compras',
    legalText: 'El pago se cargará a tu cuenta de Google Play / App Store. La suscripción se renueva automáticamente a menos que se cancele al menos 24 horas antes del final del período actual.',

    // Features (nested structure)
    features: {
      unlimitedHabits: {
        title: 'Hábitos ilimitados',
        description: 'Crea tantos hábitos como quieras sin límites',
      },
      noAds: {
        title: 'Sin anuncios',
        description: 'Disfruta de la app sin interrupciones publicitarias',
      },
      advancedStats: {
        title: 'Estadísticas avanzadas',
        description: 'Gráficos mensuales, exportación CSV y análisis detallados',
      },
      customTimer: {
        title: 'Temporizador personalizable',
        description: 'Configura la duración exacta de tus sesiones de enfoque',
      },
      themes: {
        title: 'Temas y personalización',
        description: 'Personaliza los colores y el aspecto de la app',
      },
      backup: {
        title: 'Copia de seguridad',
        description: 'Tus datos seguros en la nube, sincroniza entre dispositivos',
      },
    },

    // Plans (nested structure)
    plans: {
      monthly: {
        name: 'Mensual',
        period: '/mes',
      },
      annual: {
        name: 'Anual',
        period: '/año',
        savings: 'Ahorra 44%',
      },
      lifetime: {
        name: 'De por vida',
        period: 'pago único',
      },
    },

    // Purchase
    purchaseTitle: 'Compra Premium',
    purchaseMessage: 'Plan {{name}}: {{price}}€ {{period}}\n\nEn producción, esto conectará con la tienda de tu dispositivo para procesar el pago de forma segura.',
    simulatePurchase: 'Simular compra',
    welcomeTitle: 'Bienvenido a Premium',
    welcomeMessage: 'Ahora tienes acceso a todas las funciones. Disfruta de FocusLife sin límites.',
    great: 'Genial',
    purchaseUnavailable: 'Compra no disponible en este momento. Inténtalo de nuevo más tarde.',
    purchasing: 'Procesando...',
    restoreTitle: 'Restaurar compra',
    restoreMessage: 'En producción, esto verificará tus compras anteriores en Google Play / App Store.',
    restoreNoPurchases: 'No se encontraron compras anteriores.',

    // Already Premium
    youArePremium: 'Eres Premium',
    enjoyAllFeatures: 'Disfrutas de todas las funciones de FocusLife sin límites.',
  },

  // Notifications
  notifications: {
    dailyTitle: '📋 ¡Hora de tus hábitos!',
    dailyBody: 'Revisa y actualiza el progreso de tus hábitos de hoy.',
    streakTitle: '🔥 ¡No pierdas tu racha!',
    streakBody: 'Aún tienes tiempo para completar tus hábitos de hoy.',
    timerFocusTitle: '🎯 ¡Sesión completada!',
    timerFocusBody: '¡Excelente trabajo! Tómate un descanso.',
    timerBreakTitle: '☕ ¡Descanso terminado!',
    timerBreakBody: 'Es hora de volver al enfoque.',
  },

  // Backgrounds (keys match BACKGROUNDS ids in theme.js)
  backgrounds: {
    midnight: 'Medianoche',
    snow: 'Nieve',
    rosegarden: 'Jardín Rosa',
    sakura: 'Sakura',
    oceanbreeze: 'Brisa Marina',
    mint: 'Menta Fresca',
    sunset: 'Atardecer',
    lavender: 'Lavanda',
    cottoncandy: 'Algodón de Azúcar',
    aurora: 'Aurora Boreal',
    twilight: 'Crepúsculo',
    forest: 'Bosque',
  },

  // Background Selector
  backgroundSelector: {
    title: 'Fondo',
    choose: 'Elige un fondo',
    free: 'Gratis',
    watchAd: 'Ver anuncio',
    premium: 'Premium',
    unlocked: 'Desbloqueado',
    unlockedMessage: 'Has desbloqueado el fondo "{{name}}"',
    adNotAvailable: 'Anuncio no disponible',
    adNotAvailableMessage: 'Inténtalo de nuevo en unos segundos.',
    premiumBackground: 'Fondo Premium',
    premiumBackgroundMessage: 'Este fondo exclusivo está disponible solo para usuarios Premium.',
  },

  // Habit Icons
  habitIcons: {
    water: 'Agua',
    exercise: 'Ejercicio',
    read: 'Leer',
    meditate: 'Meditar',
    sleep: 'Dormir',
    eatHealthy: 'Comer sano',
    walk: 'Caminar',
    study: 'Estudiar',
    code: 'Programar',
    music: 'Música',
    gratitude: 'Gratitud',
    noPhone: 'Sin móvil',
    run: 'Correr',
    medicine: 'Medicinas',
    coffee: 'Café',
    wakeEarly: 'Madrugar',
  },

  // Days
  days: {
    sun: 'Dom',
    mon: 'Lun',
    tue: 'Mar',
    wed: 'Mié',
    thu: 'Jue',
    fri: 'Vie',
    sat: 'Sáb',
  },

  // Streak
  streak: {
    daysInRow: 'días seguidos',
    dayInRow: 'día seguido',
  },

  // Quotes (keeping a few representative ones)
  quotes: {
    quote1: { text: 'El único modo de hacer un gran trabajo es amar lo que haces.', author: 'Steve Jobs' },
    quote2: { text: 'No cuentes los días, haz que los días cuenten.', author: 'Muhammad Ali' },
    quote3: { text: 'El éxito es la suma de pequeños esfuerzos repetidos día tras día.', author: 'Robert Collier' },
    quote4: { text: 'La disciplina es el puente entre las metas y los logros.', author: 'Jim Rohn' },
    quote5: { text: 'Cada día es una nueva oportunidad para cambiar tu vida.', author: 'Anónimo' },
    quote6: { text: 'Los grandes logros requieren tiempo y constancia.', author: 'Anónimo' },
    quote7: { text: 'Tu futuro es creado por lo que haces hoy, no mañana.', author: 'Robert Kiyosaki' },
    quote8: { text: 'La constancia es la madre de la maestría.', author: 'Robin Sharma' },
    quote9: { text: 'No importa lo lento que vayas, siempre y cuando no te detengas.', author: 'Confucio' },
    quote10: { text: 'Cree en ti mismo y todo será posible.', author: 'Anónimo' },
    quote11: { text: 'Cada experto fue alguna vez un principiante.', author: 'Helen Hayes' },
    quote12: { text: 'Haz hoy lo que otros no quieren, y mañana vivirás como otros no pueden.', author: 'Anónimo' },
  },
};

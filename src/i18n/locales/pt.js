export default {
  // Common
  common: {
    cancel: 'Cancelar',
    save: 'Salvar',
    delete: 'Excluir',
    error: 'Erro',
    done: 'Pronto',
    back: 'Voltar',
    yes: 'Sim',
    no: 'Não',
    ok: 'OK',
    loading: 'Carregando...',
    today: 'Hoje',
    minutes: 'minutos',
    minute: 'minuto',
    days: 'dias',
    day: 'dia',
  },

  // Navigation
  nav: {
    home: 'Início',
    habits: 'Hábitos',
    timer: 'Timer',
    stats: 'Stats',
    settings: 'Ajustes',
  },

  // Home Screen
  home: {
    goodMorning: 'Bom dia',
    goodAfternoon: 'Boa tarde',
    goodEvening: 'Boa noite',
    completed: 'Completado',
    bestStreak: 'Melhor sequência',
    allCompleted: 'Todos os hábitos completados',
    todayHabits: 'Hábitos de hoje',
    seeAll: 'Ver todos',
    emptyTitle: 'Comece seu primeiro hábito',
    emptyText: 'Vá para a aba "Hábitos" para criar seu primeiro hábito e começar a construir sua melhor versão.',
    createHabit: 'Criar hábito',
    deleteHabit: 'Excluir hábito',
    deleteConfirm: 'Tem certeza que deseja excluir "{{name}}"? Todo o progresso será perdido.',
  },

  // Auth Screen
  auth: {
    tagline: 'Construa melhores hábitos, um dia de cada vez',
    loggingIn: 'Entrando...',
    login: 'Entrar',
    register: 'Cadastrar',
    email: 'Email',
    password: 'Senha (mín. 6 caracteres)',
    emailPasswordRequired: 'Digite seu email e senha',
    passwordMinLength: 'A senha deve ter pelo menos 6 caracteres',
    createAccount: 'Criar conta',
    continueWithGoogle: 'Continuar com Google',
    continueWithEmail: 'Continuar com Email',
    terms: 'Ao continuar, você aceita os termos de uso e a política de privacidade.',
  },

  // Habits Screen
  habits: {
    title: 'Meus Hábitos',
    subtitle: '{{count}} hábito',
    subtitlePlural: '{{count}} hábitos',
    maxFree: '(máx {{limit}} grátis)',
    emptyTitle: 'Sem hábitos ainda',
    emptyText: 'Toque no botão + para criar seu primeiro hábito',
    tip: 'Toque para completar • Lápis para editar • Segure para excluir',
    editHabit: 'Editar hábito',
    newHabit: 'Novo hábito',
    name: 'Nome',
    namePlaceholder: 'Ex: Beber 8 copos de água',
    icon: 'Ícone',
    color: 'Cor',
    saveChanges: 'Salvar alterações',
    createHabit: 'Criar hábito',
    nameRequired: 'Digite um nome para seu hábito',
    reward: 'Recompensa',
    rewardUnlocked: 'Você desbloqueou 1 hábito extra. Agora crie seu hábito.',
    rewardUnlockedCreate: 'Você desbloqueou 1 hábito extra. Agora toque em + para criá-lo.',
    limitReached: 'Limite alcançado',
    limitMessageAd: 'A versão gratuita permite {{limit}} hábitos. Seja Premium para hábitos ilimitados, ou assista um anúncio para desbloquear mais um.',
    limitMessageMax: 'Você alcançou o limite de {{limit}} hábitos. Seja Premium para hábitos ilimitados.',
    needPremiumOrAd: 'Você precisa do Premium ou pode assistir um anúncio para desbloquear 1 hábito extra.',
    watchAd: 'Ver anúncio (+1 grátis)',
    seePremium: 'Ver Premium',
  },

  // Timer Screen
  timer: {
    focus: 'Foco',
    shortBreak: 'Curto',
    longBreak: 'Longo',
    focusTime: 'Tempo de foco',
    breakTime: 'Tempo de pausa',
    sessionsToday: 'Sessões completadas hoje: {{count}}',
    focusMinutes: '= {{minutes}} minutos de foco',
    premiumTip: 'Premium: personalize a duração do timer',
  },

  // Stats Screen
  stats: {
    title: 'Estatísticas',
    subtitle: 'Seu progresso em detalhes',
    today: 'Hoje',
    bestStreak: 'Melhor sequência',
    week: 'Semana',
    month: 'Mês',
    pomodoroFocus: 'Foco Pomodoro',
    total: 'Total',
    sessions: '{{count}} sessões',
    totalAchievements: 'Conquistas totais',
    habitsCompletedTotal: 'hábitos completados no total',
    activeHabits: 'hábitos ativos',
    focusSessionsWeek: 'sessões de foco esta semana',
    advancedStats: 'Estatísticas avançadas',
    advancedStatsDesc: 'Com Premium você tem gráficos mensais, exportação de dados e análises detalhadas de produtividade.',
    premiumDescription: 'Com Premium você tem gráficos mensais, exportação de dados e análises detalhadas de produtividade.',
    thisWeek: 'Esta semana',
    habitStreaks: 'Sequências por hábito',
    currentStreak: 'sequência atual',
    bestDay: 'Melhor dia',
    bestDayDesc: 'Dia com mais hábitos completados',
    consistency: 'Consistência',
    consistencyDesc: 'Dias com pelo menos 1 hábito completado',
    noStreakData: 'Complete hábitos para ver suas sequências',
  },

  // Settings Screen
  settings: {
    title: 'Ajustes',
    premium: 'FocusLife Premium',
    getPremium: 'Seja Premium',
    premiumActive: 'Você aproveita todas as funcionalidades',
    premiumDesc: 'Hábitos ilimitados, sem anúncios e mais',
    cancelSubscription: 'Cancelar assinatura',
    cancelPremiumTitle: 'Cancelar Premium',
    cancelPremiumMessage: 'Tem certeza que deseja cancelar sua assinatura Premium? Você perderá acesso às funcionalidades exclusivas.',
    cancelPremiumManageMessage: 'Para gerenciar ou cancelar sua assinatura, você precisa fazer isso pela Google Play Store.',
    manageSubscription: 'Gerenciar assinatura',
    keepIt: 'Não, manter',
    yesCancel: 'Sim, cancelar',

    // Account
    account: 'Conta',
    yourName: 'Seu nome',
    tapToAddName: 'Toque para adicionar seu nome',
    noAccount: 'Sem conta',
    loginToSync: 'Faça login para sincronizar seus dados',
    loginError: 'Não foi possível fazer login',
    logout: 'Sair',
    disconnectAccount: 'Desconectar sua conta',
    logoutMessage: 'Seus dados locais permanecerão neste dispositivo.',
    sync: 'Sincronização',
    syncing: 'Sincronizando...',
    lastSync: 'Última: {{date}}',
    notSynced: 'Ainda não sincronizado',

    // Appearance
    appearance: 'Aparência',
    language: 'Idioma',

    // Timer
    timerSection: 'Temporizador',
    focusDuration: 'Foco',
    focusDurationTitle: 'Duração do foco',
    shortBreakDuration: 'Pausa curta',
    longBreakDuration: 'Pausa longa',

    // Notifications
    notifications: 'Notificações',
    dailyReminder: 'Lembrete diário',
    dailyReminderDesc: 'Revisar seus hábitos todos os dias',
    permissionsRequired: 'Permissões necessárias',
    permissionsMessage: 'Para receber notificações, você deve permitir o acesso nas configurações do seu dispositivo.',
    openSettings: 'Abrir configurações',
    reminderTime: 'Hora do lembrete',
    streakAlert: 'Alerta de sequência',
    streakAlertDesc: 'Aviso às 20h se você não completou hábitos',
    timerEnd: 'Fim do timer',
    timerEndDesc: 'Notificação quando o Pomodoro termina',
    vibration: 'Vibração',
    vibrationDesc: 'Ao completar o timer',

    // About
    about: 'Sobre',
    rateApp: 'Avaliar o app',
    rateAppDesc: 'Ajude-nos com 5 estrelas',
    share: 'Compartilhar',
    shareDesc: 'Recomende o FocusLife',
    contact: 'Contato',
    contactDesc: 'Escreva-nos suas sugestões',

    // Data
    data: 'Dados',
    clearAllData: 'Apagar todos os dados',
    clearDataDesc: 'Excluir todo seu progresso',
    clearDataTitle: 'Apagar todos os dados',
    clearDataMessage: 'Todo seu progresso, hábitos e estatísticas serão excluídos. Esta ação não pode ser desfeita.',
    clearDataButton: 'Apagar tudo',
    dataCleared: 'Dados apagados',
    dataClearedMessage: 'Todos os seus dados foram excluídos.',

    // Rate & Share
    rateTitle: 'Avaliar FocusLife',
    rateMessage: 'Sua avaliação nos ajuda a melhorar. Você será redirecionado para a loja.',
    notNow: 'Agora não',
    rate: 'Avaliar',
    shareTitle: 'Compartilhar FocusLife',
    shareMessage: 'Compartilhe o app com seus amigos e ajude-os a serem mais produtivos.',
    shareContent: 'Estou usando o FocusLife para melhorar meus hábitos e produtividade. Experimente! https://play.google.com/store/apps/details?id=com.focuslife.app',

    // Name Modal
    nameModalTitle: 'Seu nome',
    nameModalSubtitle: 'Este nome aparecerá na saudação',
    namePlaceholder: 'Ex: Maria, João...',

    // Version
    version: 'FocusLife v1.0.1',
    madeWith: 'Feito com dedicação',
  },

  // Premium Screen
  premium: {
    title: 'FocusLife Premium',
    subtitle: 'Desbloqueie todo o seu potencial de produtividade',
    choosePlan: 'Escolha seu plano',
    mostPopular: 'MAIS POPULAR',
    restorePurchases: 'Restaurar compras',
    legalText: 'O pagamento será cobrado na sua conta Google Play / App Store. A assinatura renova automaticamente a menos que seja cancelada pelo menos 24 horas antes do final do período atual.',

    // Features (nested structure)
    features: {
      unlimitedHabits: {
        title: 'Hábitos ilimitados',
        description: 'Crie quantos hábitos quiser sem limites',
      },
      noAds: {
        title: 'Sem anúncios',
        description: 'Aproveite o app sem interrupções de anúncios',
      },
      advancedStats: {
        title: 'Estatísticas avançadas',
        description: 'Gráficos mensais, exportação CSV e análises detalhadas',
      },
      customTimer: {
        title: 'Timer personalizável',
        description: 'Configure a duração exata das suas sessões de foco',
      },
      themes: {
        title: 'Temas e personalização',
        description: 'Personalize as cores e aparência do app',
      },
      backup: {
        title: 'Backup na nuvem',
        description: 'Seus dados seguros na nuvem, sincronize entre dispositivos',
      },
    },

    // Plans (nested structure)
    plans: {
      monthly: {
        name: 'Mensal',
        period: '/mês',
      },
      annual: {
        name: 'Anual',
        period: '/ano',
        savings: 'Economize 44%',
      },
      lifetime: {
        name: 'Vitalício',
        period: 'pagamento único',
      },
    },

    // Purchase
    purchaseTitle: 'Comprar Premium',
    purchaseMessage: 'Plano {{name}}: €{{price}} {{period}}\n\nEm produção, isto conectará à loja do seu dispositivo para processar o pagamento de forma segura.',
    simulatePurchase: 'Simular compra',
    welcomeTitle: 'Bem-vindo ao Premium',
    welcomeMessage: 'Agora você tem acesso a todas as funcionalidades. Aproveite o FocusLife sem limites.',
    great: 'Ótimo',
    purchaseUnavailable: 'Compra não disponível no momento. Tente novamente mais tarde.',
    purchasing: 'Processando...',
    restoreTitle: 'Restaurar compra',
    restoreMessage: 'Em produção, isto verificará suas compras anteriores no Google Play / App Store.',
    restoreNoPurchases: 'Nenhuma compra anterior encontrada.',

    // Already Premium
    youArePremium: 'Você é Premium',
    enjoyAllFeatures: 'Você aproveita todas as funcionalidades do FocusLife sem limites.',
  },

  // Notifications
  notifications: {
    dailyTitle: '📋 Hora dos seus hábitos!',
    dailyBody: 'Revise e atualize o progresso dos seus hábitos de hoje.',
    streakTitle: '🔥 Não perca sua sequência!',
    streakBody: 'Você ainda tem tempo para completar seus hábitos hoje.',
    timerFocusTitle: '🎯 Sessão completada!',
    timerFocusBody: 'Excelente trabalho! Faça uma pausa.',
    timerBreakTitle: '☕ Pausa terminada!',
    timerBreakBody: 'Hora de voltar ao foco.',
  },

  // Backgrounds (keys match BACKGROUNDS ids in theme.js)
  backgrounds: {
    midnight: 'Meia-noite',
    snow: 'Neve',
    rosegarden: 'Jardim Rosa',
    sakura: 'Sakura',
    oceanbreeze: 'Brisa do Mar',
    mint: 'Menta Fresca',
    sunset: 'Pôr do Sol',
    lavender: 'Lavanda',
    cottoncandy: 'Algodão Doce',
    aurora: 'Aurora Boreal',
    twilight: 'Crepúsculo',
    forest: 'Floresta',
  },

  // Background Selector
  backgroundSelector: {
    title: 'Fundo',
    choose: 'Escolha um fundo',
    free: 'Grátis',
    watchAd: 'Ver anúncio',
    premium: 'Premium',
    unlocked: 'Desbloqueado',
    unlockedMessage: 'Você desbloqueou o fundo "{{name}}"',
    adNotAvailable: 'Anúncio não disponível',
    adNotAvailableMessage: 'Tente novamente em alguns segundos.',
    premiumBackground: 'Fundo Premium',
    premiumBackgroundMessage: 'Este fundo exclusivo está disponível apenas para usuários Premium.',
  },

  // Habit Icons
  habitIcons: {
    water: 'Água',
    exercise: 'Exercício',
    read: 'Ler',
    meditate: 'Meditar',
    sleep: 'Dormir',
    eatHealthy: 'Comer saudável',
    walk: 'Caminhar',
    study: 'Estudar',
    code: 'Programar',
    music: 'Música',
    gratitude: 'Gratidão',
    noPhone: 'Sem celular',
    run: 'Correr',
    medicine: 'Remédios',
    coffee: 'Café',
    wakeEarly: 'Acordar cedo',
  },

  // Days
  days: {
    sun: 'Dom',
    mon: 'Seg',
    tue: 'Ter',
    wed: 'Qua',
    thu: 'Qui',
    fri: 'Sex',
    sat: 'Sáb',
  },

  // Streak
  streak: {
    daysInRow: 'dias seguidos',
    dayInRow: 'dia seguido',
  },

  // Quotes
  quotes: {
    quote1: { text: 'A única maneira de fazer um ótimo trabalho é amar o que você faz.', author: 'Steve Jobs' },
    quote2: { text: 'Não conte os dias, faça os dias contarem.', author: 'Muhammad Ali' },
    quote3: { text: 'O sucesso é a soma de pequenos esforços repetidos dia após dia.', author: 'Robert Collier' },
    quote4: { text: 'A disciplina é a ponte entre metas e conquistas.', author: 'Jim Rohn' },
    quote5: { text: 'Cada dia é uma nova oportunidade para mudar sua vida.', author: 'Anônimo' },
    quote6: { text: 'Grandes conquistas requerem tempo e constância.', author: 'Anônimo' },
    quote7: { text: 'Seu futuro é criado pelo que você faz hoje, não amanhã.', author: 'Robert Kiyosaki' },
    quote8: { text: 'A constância é a mãe da maestria.', author: 'Robin Sharma' },
    quote9: { text: 'Não importa quão devagar você vá, desde que não pare.', author: 'Confúcio' },
    quote10: { text: 'Acredite em si mesmo e tudo será possível.', author: 'Anônimo' },
    quote11: { text: 'Todo expert já foi um iniciante.', author: 'Helen Hayes' },
    quote12: { text: 'Faça hoje o que os outros não querem, e amanhã você viverá como os outros não podem.', author: 'Anônimo' },
  },
};

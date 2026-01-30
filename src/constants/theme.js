export const DARK_COLORS = {
  primary: '#7C3AED',
  primaryDark: '#6D28D9',
  primaryLight: '#A78BFA',
  secondary: '#F472B6',
  accent: '#34D399',
  accentOrange: '#FBBF24',

  background: '#0F0F1A',
  backgroundLight: '#1A1A2E',
  card: 'rgba(30, 30, 50, 0.8)',
  cardLight: 'rgba(40, 40, 65, 0.8)',

  text: '#FFFFFF',
  textSecondary: '#B4B4CC',
  textMuted: '#6B6B85',

  success: '#34D399',
  warning: '#FBBF24',
  error: '#F87171',
  info: '#60A5FA',

  border: 'rgba(255, 255, 255, 0.1)',
  overlay: 'rgba(0,0,0,0.75)',

  gold: '#FCD34D',
  silver: '#D1D5DB',
};

export const LIGHT_COLORS = {
  primary: '#7C3AED',
  primaryDark: '#6D28D9',
  primaryLight: '#A78BFA',
  secondary: '#EC4899',
  accent: '#10B981',
  accentOrange: '#F59E0B',

  background: '#F8FAFC',
  backgroundLight: '#FFFFFF',
  card: 'rgba(255, 255, 255, 0.65)',
  cardLight: 'rgba(255, 255, 255, 0.5)',

  text: '#1E1E2E',
  textSecondary: '#475569',
  textMuted: '#64748B',

  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',

  border: 'rgba(0, 0, 0, 0.06)',
  overlay: 'rgba(0,0,0,0.5)',

  gold: '#F59E0B',
  silver: '#9CA3AF',
};

// Backgrounds configuration
export const BACKGROUNDS = [
  // FREE backgrounds (3)
  {
    id: 'midnight',
    name: 'Medianoche',
    colors: ['#0F0F1A', '#1A1A2E', '#16213E'],
    type: 'free',
    dark: true,
  },
  {
    id: 'snow',
    name: 'Nieve',
    colors: ['#F8FAFC', '#E2E8F0', '#F1F5F9'],
    type: 'free',
    dark: false,
  },
  {
    id: 'rosegarden',
    name: 'Jardín Rosa',
    colors: ['#FFF1F2', '#FFE4E6', '#FECDD3'],
    type: 'free',
    dark: false,
  },

  // AD-UNLOCKABLE backgrounds (3)
  {
    id: 'sakura',
    name: 'Sakura',
    colors: ['#FDF2F8', '#FBCFE8', '#F9A8D4', '#FBCFE8', '#FDF2F8'],
    type: 'ad',
    dark: false,
  },
  {
    id: 'oceanbreeze',
    name: 'Brisa Marina',
    colors: ['#F0F9FF', '#BAE6FD', '#7DD3FC', '#BAE6FD', '#F0F9FF'],
    type: 'ad',
    dark: false,
  },
  {
    id: 'mint',
    name: 'Menta Fresca',
    colors: ['#F0FDF4', '#BBF7D0', '#86EFAC', '#BBF7D0', '#F0FDF4'],
    type: 'ad',
    dark: false,
  },

  // PREMIUM backgrounds (6)
  {
    id: 'sunset',
    name: 'Atardecer',
    colors: ['#FFF7ED', '#FDBA74', '#FB923C', '#F97316', '#FDBA74', '#FFF7ED'],
    type: 'premium',
    dark: false,
  },
  {
    id: 'lavender',
    name: 'Lavanda',
    colors: ['#FAF5FF', '#E9D5FF', '#D8B4FE', '#E9D5FF', '#FAF5FF'],
    type: 'premium',
    dark: false,
  },
  {
    id: 'cottoncandy',
    name: 'Algodón de Azúcar',
    colors: ['#FDF4FF', '#FAE8FF', '#F5D0FE', '#E879F9', '#F5D0FE', '#FAE8FF'],
    type: 'premium',
    dark: false,
  },
  {
    id: 'aurora',
    name: 'Aurora Boreal',
    colors: ['#0F172A', '#1E3A5F', '#0D9488', '#2DD4BF', '#0D9488', '#1E3A5F'],
    type: 'premium',
    dark: true,
  },
  {
    id: 'twilight',
    name: 'Crepúsculo',
    colors: ['#1E1B4B', '#312E81', '#4338CA', '#6366F1', '#4338CA', '#312E81'],
    type: 'premium',
    dark: true,
  },
  {
    id: 'forest',
    name: 'Bosque',
    colors: ['#14532D', '#166534', '#22C55E', '#4ADE80', '#22C55E', '#166534'],
    type: 'premium',
    dark: true,
  },
];

// Default export for backward compatibility
export const COLORS = DARK_COLORS;

export const FONTS = {
  regular: 'System',
  bold: 'System',
};

export const SIZES = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  title: 40,

  radius: 12,
  radiusLg: 20,
  radiusXl: 28,

  padding: 16,
  paddingSm: 8,
  paddingLg: 24,
};

export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 4,
  },
  large: {
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 6.68,
    elevation: 8,
  },
};

export const HABIT_ICONS = [
  { id: 'water', icon: 'water', label: 'Agua' },
  { id: 'exercise', icon: 'barbell', label: 'Ejercicio' },
  { id: 'read', icon: 'book', label: 'Leer' },
  { id: 'meditate', icon: 'leaf', label: 'Meditar' },
  { id: 'sleep', icon: 'moon', label: 'Dormir' },
  { id: 'food', icon: 'nutrition', label: 'Comer sano' },
  { id: 'walk', icon: 'walk', label: 'Caminar' },
  { id: 'study', icon: 'school', label: 'Estudiar' },
  { id: 'code', icon: 'code-slash', label: 'Programar' },
  { id: 'music', icon: 'musical-notes', label: 'Música' },
  { id: 'grateful', icon: 'heart', label: 'Gratitud' },
  { id: 'nophone', icon: 'phone-portrait-outline', label: 'Sin móvil' },
  { id: 'run', icon: 'fitness', label: 'Correr' },
  { id: 'pills', icon: 'medkit', label: 'Medicinas' },
  { id: 'coffee', icon: 'cafe', label: 'Café' },
  { id: 'sun', icon: 'sunny', label: 'Madrugar' },
];

export const MOTIVATIONAL_QUOTES = [
  { text: 'El único modo de hacer un gran trabajo es amar lo que haces.', author: 'Steve Jobs' },
  { text: 'No cuentes los días, haz que los días cuenten.', author: 'Muhammad Ali' },
  { text: 'El éxito es la suma de pequeños esfuerzos repetidos día tras día.', author: 'Robert Collier' },
  { text: 'La disciplina es el puente entre las metas y los logros.', author: 'Jim Rohn' },
  { text: 'Cada día es una nueva oportunidad para cambiar tu vida.', author: 'Anónimo' },
  { text: 'Los grandes logros requieren tiempo y constancia.', author: 'Anónimo' },
  { text: 'Tu futuro es creado por lo que haces hoy, no mañana.', author: 'Robert Kiyosaki' },
  { text: 'La constancia es la madre de la maestría.', author: 'Robin Sharma' },
  { text: 'No importa lo lento que vayas, siempre y cuando no te detengas.', author: 'Confucio' },
  { text: 'El mejor momento para plantar un árbol fue hace 20 años. El segundo mejor momento es ahora.', author: 'Proverbio chino' },
  { text: 'Cree en ti mismo y todo será posible.', author: 'Anónimo' },
  { text: 'Cada experto fue alguna vez un principiante.', author: 'Helen Hayes' },
  { text: 'La perseverancia no es una carrera larga, son muchas carreras cortas una tras otra.', author: 'Walter Elliot' },
  { text: 'Haz hoy lo que otros no quieren, y mañana vivirás como otros no pueden.', author: 'Anónimo' },
];

export const FREE_HABIT_LIMIT = 3;
export const POMODORO_DEFAULT = 25 * 60; // 25 minutes in seconds
export const SHORT_BREAK_DEFAULT = 5 * 60;
export const LONG_BREAK_DEFAULT = 15 * 60;

export const Colors = {
  // Executive Modern Palette (Linear / Stripe / iOS Reminders style)
  primary: '#4F46E5', // Indigo 600 - Confident, modern & professional
  primaryHover: '#4338CA', // Indigo 700
  primaryDark: '#3730A3', // Indigo 800
  primaryLight: '#EEF2FF', // Indigo 50 - Subtle background highlights
  primarySoft: '#E0E7FF', // Indigo 100

  accent: '#0284C7', // Sky 600
  accentLight: '#F0F9FF', // Sky 50

  background: '#F8FAFC', // Slate 50 - Ultra-clean, crisp canvas
  surface: '#FFFFFF', // Pure White
  surfaceElevated: '#FFFFFF',
  surfaceVariant: '#F1F5F9', // Slate 100 - Secondary containers & dividers
  surfaceSubtle: '#F8FAFC',

  border: '#E2E8F0', // Slate 200 - Clean, razor-sharp outlines
  borderLight: '#F1F5F9', // Slate 100
  borderFocus: '#6366F1', // Indigo 500

  textPrimary: '#0F172A', // Slate 900 - High contrast & readable
  textSecondary: '#475569', // Slate 600 - Clear secondary text
  textMuted: '#94A3B8', // Slate 400 - Subtle placeholders & icons

  // Status Colors (Refined, legible tones with matched subtle backgrounds)
  statusTodo: '#2563EB', // Blue 600
  statusTodoBg: '#EFF6FF', // Blue 50
  statusTodoBorder: '#BFDBFE', // Blue 200

  statusInProgress: '#D97706', // Amber 600
  statusInProgressBg: '#FFFBEB', // Amber 50
  statusInProgressBorder: '#FDE68A', // Amber 200

  statusCompleted: '#059669', // Emerald 600
  statusCompletedBg: '#ECFDF5', // Emerald 50
  statusCompletedBorder: '#A7F3D0', // Emerald 200

  // Priority Colors
  priorityHigh: '#E11D48', // Rose 600
  priorityHighBg: '#FFF1F2', // Rose 50
  priorityHighBorder: '#FECDD3', // Rose 200

  priorityMed: '#7C3AED', // Violet 600
  priorityMedBg: '#F5F3FF', // Violet 50
  priorityMedBorder: '#DDD6FE', // Violet 200

  priorityLow: '#0D9488', // Teal 600
  priorityLowBg: '#F0FDFA', // Teal 50
  priorityLowBorder: '#CCFBF1', // Teal 200

  danger: '#EF4444',
  dangerBg: '#FEE2E2',
  success: '#10B981',
  successBg: '#D1FAE5',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const Radius = {
  xs: 4,
  sm: 6,
  md: 10,
  lg: 14,
  xl: 18,
  xxl: 24,
  full: 9999,
};

export const Shadows = {
  card: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  modal: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 10,
  },
  button: {
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
};

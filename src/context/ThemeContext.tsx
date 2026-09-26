import React, { createContext, useContext, useState, ReactNode } from 'react';

export type ThemeId = 'snow' | 'sakura' | 'indigo' | 'aurora';

export interface ThemeColors {
  primary: string;
  primaryHover: string;
  primaryDark: string;
  primaryLight: string;
  primarySoft: string;
  accent: string;
  accentLight: string;
  background: string;
  surface: string;
  surfaceElevated: string;
  surfaceVariant: string;
  surfaceSubtle: string;
  border: string;
  borderLight: string;
  borderFocus: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  statusTodo: string;
  statusTodoBg: string;
  statusTodoBorder: string;
  statusInProgress: string;
  statusInProgressBg: string;
  statusInProgressBorder: string;
  statusCompleted: string;
  statusCompletedBg: string;
  statusCompletedBorder: string;
  priorityHigh: string;
  priorityHighBg: string;
  priorityHighBorder: string;
  priorityMed: string;
  priorityMedBg: string;
  priorityMedBorder: string;
  priorityLow: string;
  priorityLowBg: string;
  priorityLowBorder: string;
  danger: string;
  dangerBg: string;
  success: string;
  successBg: string;
  mascotBorder: string;
  mascotBg: string;
}

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  nameVi: string;
  icon: string;
  previewColor: string;
  colors: ThemeColors;
}

export const themes: Record<ThemeId, ThemeConfig> = {
  snow: {
    id: 'snow',
    name: 'Glacial Snow',
    nameVi: 'Băng Tuyết',
    icon: 'snow',
    previewColor: '#0284C7',
    colors: {
      primary: '#0284C7',
      primaryHover: '#0369A1',
      primaryDark: '#0C4A6E',
      primaryLight: '#E0F2FE',
      primarySoft: '#BAE6FD',
      accent: '#06B6D4',
      accentLight: '#ECFEFF',
      background: '#EDF5FD',
      surface: '#FFFFFF',
      surfaceElevated: '#FFFFFF',
      surfaceVariant: '#E2EFFB',
      surfaceSubtle: '#F1F7FC',
      border: '#CFE4F6',
      borderLight: '#E2EEF8',
      borderFocus: '#0284C7',
      textPrimary: '#0B1E36',
      textSecondary: '#335070',
      textMuted: '#688CAE',
      statusTodo: '#0284C7',
      statusTodoBg: '#E0F2FE',
      statusTodoBorder: '#BAE6FD',
      statusInProgress: '#D97706',
      statusInProgressBg: '#FEF3C7',
      statusInProgressBorder: '#FDE68A',
      statusCompleted: '#0D9488',
      statusCompletedBg: '#E6FFFA',
      statusCompletedBorder: '#99F6E4',
      priorityHigh: '#E11D48',
      priorityHighBg: '#FFE4E6',
      priorityHighBorder: '#FECDD3',
      priorityMed: '#7C3AED',
      priorityMedBg: '#F5F3FF',
      priorityMedBorder: '#DDD6FE',
      priorityLow: '#0284C7',
      priorityLowBg: '#E0F2FE',
      priorityLowBorder: '#BAE6FD',
      danger: '#EF4444',
      dangerBg: '#FEE2E2',
      success: '#10B981',
      successBg: '#D1FAE5',
      mascotBorder: '#7DD3FC',
      mascotBg: '#E0F2FE',
    },
  },
  sakura: {
    id: 'sakura',
    name: 'Sweet Sakura',
    nameVi: 'Hồng Kẹo Bông',
    icon: 'flower',
    previewColor: '#F43F5E',
    colors: {
      primary: '#F43F5E',
      primaryHover: '#E11D48',
      primaryDark: '#BE123C',
      primaryLight: '#FFE4E6',
      primarySoft: '#FECDD3',
      accent: '#EC4899',
      accentLight: '#FDF2F8',
      background: '#FFF1F5',
      surface: '#FFFFFF',
      surfaceElevated: '#FFFFFF',
      surfaceVariant: '#FCE7F3',
      surfaceSubtle: '#FFF5F8',
      border: '#FBCFE8',
      borderLight: '#FCE7F3',
      borderFocus: '#F43F5E',
      textPrimary: '#4C0519',
      textSecondary: '#881337',
      textMuted: '#BE185D',
      statusTodo: '#E11D48',
      statusTodoBg: '#FFE4E6',
      statusTodoBorder: '#FECDD3',
      statusInProgress: '#D97706',
      statusInProgressBg: '#FEF3C7',
      statusInProgressBorder: '#FDE68A',
      statusCompleted: '#059669',
      statusCompletedBg: '#ECFDF5',
      statusCompletedBorder: '#A7F3D0',
      priorityHigh: '#BE123C',
      priorityHighBg: '#FFE4E6',
      priorityHighBorder: '#FECDD3',
      priorityMed: '#9333EA',
      priorityMedBg: '#F3E8FF',
      priorityMedBorder: '#E9D5FF',
      priorityLow: '#0D9488',
      priorityLowBg: '#F0FDFA',
      priorityLowBorder: '#CCFBF1',
      danger: '#E11D48',
      dangerBg: '#FFE4E6',
      success: '#10B981',
      successBg: '#D1FAE5',
      mascotBorder: '#F472B6',
      mascotBg: '#FCE7F3',
    },
  },
  indigo: {
    id: 'indigo',
    name: 'Executive Indigo',
    nameVi: 'Xanh Hiện Đại',
    icon: 'briefcase',
    previewColor: '#4F46E5',
    colors: {
      primary: '#4F46E5',
      primaryHover: '#4338CA',
      primaryDark: '#3730A3',
      primaryLight: '#EEF2FF',
      primarySoft: '#E0E7FF',
      accent: '#0284C7',
      accentLight: '#F0F9FF',
      background: '#F8FAFC',
      surface: '#FFFFFF',
      surfaceElevated: '#FFFFFF',
      surfaceVariant: '#F1F5F9',
      surfaceSubtle: '#F8FAFC',
      border: '#E2E8F0',
      borderLight: '#F1F5F9',
      borderFocus: '#6366F1',
      textPrimary: '#0F172A',
      textSecondary: '#475569',
      textMuted: '#94A3B8',
      statusTodo: '#2563EB',
      statusTodoBg: '#EFF6FF',
      statusTodoBorder: '#BFDBFE',
      statusInProgress: '#D97706',
      statusInProgressBg: '#FFFBEB',
      statusInProgressBorder: '#FDE68A',
      statusCompleted: '#059669',
      statusCompletedBg: '#ECFDF5',
      statusCompletedBorder: '#A7F3D0',
      priorityHigh: '#DC2626',
      priorityHighBg: '#FEF2F2',
      priorityHighBorder: '#FECDD3',
      priorityMed: '#7C3AED',
      priorityMedBg: '#F5F3FF',
      priorityMedBorder: '#DDD6FE',
      priorityLow: '#0D9488',
      priorityLowBg: '#F0FDFA',
      priorityLowBorder: '#CCFBF1',
      danger: '#EF4444',
      dangerBg: '#FEE2E2',
      success: '#10B981',
      successBg: '#D1FAE5',
      mascotBorder: '#A5B4FC',
      mascotBg: '#EEF2FF',
    },
  },
  aurora: {
    id: 'aurora',
    name: 'Aurora Emerald',
    nameVi: 'Cực Quang Xanh',
    icon: 'leaf',
    previewColor: '#059669',
    colors: {
      primary: '#059669',
      primaryHover: '#047857',
      primaryDark: '#065F46',
      primaryLight: '#ECFDF5',
      primarySoft: '#A7F3D0',
      accent: '#0D9488',
      accentLight: '#F0FDFA',
      background: '#F0FDF4',
      surface: '#FFFFFF',
      surfaceElevated: '#FFFFFF',
      surfaceVariant: '#DCFCE7',
      surfaceSubtle: '#F7FEE7',
      border: '#BBF7D0',
      borderLight: '#DCFCE7',
      borderFocus: '#059669',
      textPrimary: '#064E3B',
      textSecondary: '#166534',
      textMuted: '#4ADE80',
      statusTodo: '#0284C7',
      statusTodoBg: '#E0F2FE',
      statusTodoBorder: '#BAE6FD',
      statusInProgress: '#D97706',
      statusInProgressBg: '#FEF3C7',
      statusInProgressBorder: '#FDE68A',
      statusCompleted: '#059669',
      statusCompletedBg: '#ECFDF5',
      statusCompletedBorder: '#A7F3D0',
      priorityHigh: '#DC2626',
      priorityHighBg: '#FEF2F2',
      priorityHighBorder: '#FECDD3',
      priorityMed: '#7C3AED',
      priorityMedBg: '#F5F3FF',
      priorityMedBorder: '#DDD6FE',
      priorityLow: '#059669',
      priorityLowBg: '#ECFDF5',
      priorityLowBorder: '#A7F3D0',
      danger: '#EF4444',
      dangerBg: '#FEE2E2',
      success: '#10B981',
      successBg: '#D1FAE5',
      mascotBorder: '#6EE7B7',
      mascotBg: '#DCFCE7',
    },
  },
};

interface ThemeContextType {
  themeId: ThemeId;
  theme: ThemeConfig;
  colors: ThemeColors;
  setThemeId: (id: ThemeId) => void;
  cycleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [themeId, setThemeId] = useState<ThemeId>('snow');

  const cycleTheme = () => {
    const themeList: ThemeId[] = ['snow', 'sakura', 'indigo', 'aurora'];
    const nextIdx = (themeList.indexOf(themeId) + 1) % themeList.length;
    setThemeId(themeList[nextIdx]);
  };

  const currentTheme = themes[themeId];

  return (
    <ThemeContext.Provider
      value={{
        themeId,
        theme: currentTheme,
        colors: currentTheme.colors,
        setThemeId,
        cycleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

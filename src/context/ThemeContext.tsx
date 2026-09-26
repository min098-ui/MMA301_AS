import React, { createContext, useContext, useState, ReactNode } from 'react';

export type ThemeId = 'snow' | 'fire';

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
  icon: 'snow' | 'flame';
  previewColor: string;
  colors: ThemeColors;
}

export const themes: Record<ThemeId, ThemeConfig> = {
  snow: {
    id: 'snow',
    name: 'Glacial Snow Fox',
    nameVi: 'Cáo Tuyết Băng Giá',
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
  fire: {
    id: 'fire',
    name: 'Blazing Fire Fox',
    nameVi: 'Cáo Lửa Rực Rỡ',
    icon: 'flame',
    previewColor: '#EA580C',
    colors: {
      primary: '#EA580C', // Flame Orange
      primaryHover: '#C2410C',
      primaryDark: '#9A3412',
      primaryLight: '#FFEDD5', // Orange 100
      primarySoft: '#FDBA74', // Orange 300
      accent: '#F59E0B', // Golden Amber
      accentLight: '#FEF3C7',
      background: '#FFF7ED', // Warm Ember Cream (Orange 50)
      surface: '#FFFFFF',
      surfaceElevated: '#FFFFFF',
      surfaceVariant: '#FFEDD5',
      surfaceSubtle: '#FFFBEB',
      border: '#FED7AA', // Warm Flame Amber border
      borderLight: '#FFEDD5',
      borderFocus: '#EA580C',
      textPrimary: '#431407', // Deep Obsidian Amber
      textSecondary: '#7C2D12', // Warm Russet
      textMuted: '#9A3412',
      statusTodo: '#EA580C',
      statusTodoBg: '#FFEDD5',
      statusTodoBorder: '#FDBA74',
      statusInProgress: '#D97706',
      statusInProgressBg: '#FEF3C7',
      statusInProgressBorder: '#FDE68A',
      statusCompleted: '#059669',
      statusCompletedBg: '#ECFDF5',
      statusCompletedBorder: '#A7F3D0',
      priorityHigh: '#DC2626',
      priorityHighBg: '#FEF2F2',
      priorityHighBorder: '#FECDD3',
      priorityMed: '#C2410C',
      priorityMedBg: '#FFEDD5',
      priorityMedBorder: '#FED7AA',
      priorityLow: '#D97706',
      priorityLowBg: '#FEF3C7',
      priorityLowBorder: '#FDE68A',
      danger: '#EF4444',
      dangerBg: '#FEE2E2',
      success: '#10B981',
      successBg: '#D1FAE5',
      mascotBorder: '#FB923C', // Glowing flame border
      mascotBg: '#FFEDD5',
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
    setThemeId((prev) => (prev === 'snow' ? 'fire' : 'snow'));
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

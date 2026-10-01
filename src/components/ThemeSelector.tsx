import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, ThemeId, themes } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { Radius } from '../constants/theme';

export const ThemeSelector: React.FC = () => {
  const { themeId, cycleTheme, colors, theme } = useTheme();
  const { language } = useLanguage();

  return (
    <TouchableOpacity
      style={[
        styles.pillBtn,
        {
          backgroundColor: colors.surface,
          borderColor: colors.borderFocus,
        },
      ]}
      onPress={cycleTheme}
      activeOpacity={0.7}
    >
      <Ionicons name="color-palette-outline" size={16} color={colors.primary} />
      
      <View style={styles.overlappingCircles}>
        <View style={[styles.miniCircle, { backgroundColor: '#0284C7', zIndex: 3 }]} />
        <View style={[styles.miniCircle, { backgroundColor: '#EA580C', marginLeft: -6, zIndex: 2 }]} />
        <View style={[styles.miniCircle, { backgroundColor: '#EC4899', marginLeft: -6, zIndex: 1 }]} />
      </View>

      <Text style={[styles.themeText, { color: colors.primary }]}>
        {language === 'vi' ? theme.nameVi : theme.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pillBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: Radius.full,
    borderWidth: 1,
  },
  overlappingCircles: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 6,
    marginRight: 4,
  },
  miniCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  themeText: {
    fontSize: 13,
    fontWeight: '800',
  },
});

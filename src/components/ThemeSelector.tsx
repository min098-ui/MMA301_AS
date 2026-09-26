import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, ThemeId, themes } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { Radius } from '../constants/theme';

export const ThemeSelector: React.FC = () => {
  const { themeId, setThemeId, colors } = useTheme();
  const { language } = useLanguage();

  const themeList: { id: ThemeId; icon: keyof typeof Ionicons.glyphMap; labelEn: string; labelVi: string; color: string }[] = [
    {
      id: 'snow',
      icon: 'snow',
      labelEn: 'Snow',
      labelVi: 'Tuyết',
      color: '#0284C7',
    },
    {
      id: 'sakura',
      icon: 'heart',
      labelEn: 'Sakura',
      labelVi: 'Hồng',
      color: '#F43F5E',
    },
    {
      id: 'indigo',
      icon: 'briefcase',
      labelEn: 'Indigo',
      labelVi: 'Hiện Đại',
      color: '#4F46E5',
    },
    {
      id: 'aurora',
      icon: 'leaf',
      labelEn: 'Aurora',
      labelVi: 'Ngọc Bích',
      color: '#059669',
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.surfaceVariant, borderColor: colors.border }]}>
      <View style={styles.headerRow}>
        <View style={styles.titleGroup}>
          <Ionicons name="color-palette-outline" size={15} color={colors.primary} />
          <Text style={[styles.titleText, { color: colors.textSecondary }]}>
            {language === 'vi' ? 'Đổi tông màu:' : 'Theme palette:'}
          </Text>
        </View>
        <Text style={[styles.activeThemeText, { color: colors.primary }]}>
          {language === 'vi' ? themes[themeId].nameVi : themes[themeId].name}
        </Text>
      </View>

      <View style={styles.swatchRow}>
        {themeList.map((item) => {
          const isActive = themeId === item.id;
          return (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.swatchBtn,
                {
                  borderColor: isActive ? item.color : colors.border,
                  backgroundColor: isActive ? item.color + '15' : colors.surface,
                },
              ]}
              onPress={() => setThemeId(item.id)}
              activeOpacity={0.7}
              accessibilityLabel={`Select ${item.labelEn} theme`}
            >
              <View style={[styles.colorDot, { backgroundColor: item.color }]} />
              <Ionicons
                name={item.icon}
                size={13}
                color={isActive ? item.color : colors.textMuted}
                style={{ marginRight: 3 }}
              />
              <Text
                style={[
                  styles.swatchLabel,
                  {
                    color: isActive ? item.color : colors.textSecondary,
                    fontWeight: isActive ? '800' : '600',
                  },
                ]}
              >
                {language === 'vi' ? item.labelVi : item.labelEn}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: Radius.md,
    borderWidth: 1,
    padding: 10,
    marginBottom: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  titleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  titleText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  activeThemeText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  swatchRow: {
    flexDirection: 'row',
    gap: 6,
  },
  swatchBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderRadius: Radius.full,
    borderWidth: 1.5,
  },
  colorDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    marginRight: 4,
  },
  swatchLabel: {
    fontSize: 11,
  },
});

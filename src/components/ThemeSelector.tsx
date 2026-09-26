import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, ThemeId, themes } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { Radius } from '../constants/theme';

export const ThemeSelector: React.FC = () => {
  const { themeId, setThemeId, colors } = useTheme();
  const { language } = useLanguage();

  const options: {
    id: ThemeId;
    icon: 'snow' | 'flame';
    titleVi: string;
    titleEn: string;
    subVi: string;
    subEn: string;
    color: string;
  }[] = [
    {
      id: 'snow',
      icon: 'snow',
      titleVi: 'Cáo Tuyết',
      titleEn: 'Snow Fox',
      subVi: 'Băng giá',
      subEn: 'Glacial Ice',
      color: '#0284C7',
    },
    {
      id: 'fire',
      icon: 'flame',
      titleVi: 'Cáo Lửa',
      titleEn: 'Fire Fox',
      subVi: 'Rực rỡ',
      subEn: 'Warm Ember',
      color: '#EA580C',
    },
  ];

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.surfaceVariant,
          borderColor: colors.border,
        },
      ]}
    >
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <Ionicons
            name={themeId === 'snow' ? 'snow' : 'flame'}
            size={15}
            color={colors.primary}
          />
          <Text style={[styles.headerTitle, { color: colors.textSecondary }]}>
            {language === 'vi' ? 'Linh vật & Tông màu:' : 'Fox Mascot & Palette:'}
          </Text>
        </View>
        <Text style={[styles.activeThemeText, { color: colors.primary }]}>
          {language === 'vi' ? themes[themeId].nameVi : themes[themeId].name}
        </Text>
      </View>

      <View style={styles.optionsRow}>
        {options.map((item) => {
          const isActive = themeId === item.id;
          return (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.optionCard,
                {
                  backgroundColor: isActive ? colors.surface : colors.surfaceSubtle,
                  borderColor: isActive ? item.color : colors.border,
                },
                isActive && {
                  shadowColor: item.color,
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.18,
                  shadowRadius: 5,
                  elevation: 3,
                },
              ]}
              onPress={() => setThemeId(item.id)}
              activeOpacity={0.8}
            >
              <View
                style={[
                  styles.iconBadge,
                  {
                    backgroundColor: isActive ? item.color + '18' : colors.surfaceVariant,
                  },
                ]}
              >
                <Ionicons
                  name={item.icon}
                  size={16}
                  color={isActive ? item.color : colors.textMuted}
                />
              </View>

              <View style={styles.textGroup}>
                <Text
                  style={[
                    styles.optionTitle,
                    {
                      color: isActive ? item.color : colors.textSecondary,
                      fontWeight: isActive ? '800' : '600',
                    },
                  ]}
                >
                  {language === 'vi' ? item.titleVi : item.titleEn}
                </Text>
                <Text
                  style={[
                    styles.optionSubtitle,
                    {
                      color: isActive ? colors.textPrimary : colors.textMuted,
                    },
                  ]}
                >
                  {language === 'vi' ? item.subVi : item.subEn}
                </Text>
              </View>

              {isActive && (
                <View style={[styles.checkCircle, { backgroundColor: item.color }]}>
                  <Ionicons name="checkmark" size={11} color="#FFFFFF" />
                </View>
              )}
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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  headerTitle: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  activeThemeText: {
    fontSize: 11,
    fontWeight: '800',
  },
  optionsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  optionCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: Radius.md,
    borderWidth: 1.5,
  },
  iconBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  textGroup: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 12,
    letterSpacing: 0.1,
  },
  optionSubtitle: {
    fontSize: 10,
    marginTop: 1,
  },
  checkCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
  },
});

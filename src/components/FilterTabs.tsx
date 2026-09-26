import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { TaskStatus } from '../types/task';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { Spacing, Radius } from '../constants/theme';

interface FilterTabsProps {
  currentFilter: 'All' | TaskStatus;
  onSelectFilter: (filter: 'All' | TaskStatus) => void;
  counts: {
    all: number;
    todo: number;
    inProgress: number;
    completed: number;
  };
}

export const FilterTabs: React.FC<FilterTabsProps> = ({
  currentFilter,
  onSelectFilter,
  counts,
}) => {
  const { t } = useLanguage();
  const { colors } = useTheme();

  const tabs: { key: 'All' | TaskStatus; label: string; count: number }[] = [
    { key: 'All', label: t.allTasks, count: counts.all },
    { key: 'To Do', label: t.todo, count: counts.todo },
    { key: 'In Progress', label: t.inProgress, count: counts.inProgress },
    { key: 'Completed', label: t.done, count: counts.completed },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {tabs.map((tab) => {
          const isActive = currentFilter === tab.key;
          return (
            <TouchableOpacity
              key={tab.key}
              style={[
                styles.tab,
                {
                  backgroundColor: isActive ? colors.primary : colors.surface,
                  borderColor: isActive ? colors.primary : colors.border,
                },
                isActive && {
                  shadowColor: colors.primary,
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.25,
                  shadowRadius: 4,
                  elevation: 3,
                },
              ]}
              onPress={() => onSelectFilter(tab.key)}
              activeOpacity={0.75}
            >
              <Text
                style={[
                  styles.tabText,
                  { color: isActive ? '#FFFFFF' : colors.textSecondary },
                  isActive && styles.activeTabText,
                ]}
              >
                {tab.label}
              </Text>
              <View
                style={[
                  styles.badge,
                  {
                    backgroundColor: isActive
                      ? 'rgba(255, 255, 255, 0.25)'
                      : colors.surfaceVariant,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.badgeText,
                    { color: isActive ? '#FFFFFF' : colors.textSecondary },
                  ]}
                >
                  {tab.count}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.sm,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    gap: 8,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: Radius.full,
    borderWidth: 1,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
  },
  activeTabText: {
    fontWeight: '700',
  },
  badge: {
    marginLeft: 6,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: Radius.full,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
});

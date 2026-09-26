import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { TaskStatus } from '../types/task';
import { Colors, Spacing, Radius } from '../constants/theme';

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
  const tabs: { key: 'All' | TaskStatus; label: string; count: number }[] = [
    { key: 'All', label: 'All', count: counts.all },
    { key: 'To Do', label: 'To Do', count: counts.todo },
    { key: 'In Progress', label: 'In Progress', count: counts.inProgress },
    { key: 'Completed', label: 'Completed', count: counts.completed },
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
              style={[styles.tab, isActive && styles.activeTab]}
              onPress={() => onSelectFilter(tab.key)}
              activeOpacity={0.7}
            >
              <Text style={[styles.tabText, isActive && styles.activeTabText]}>{tab.label}</Text>
              <View style={[styles.badge, isActive && styles.activeBadge]}>
                <Text style={[styles.badgeText, isActive && styles.activeBadgeText]}>
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
    gap: Spacing.sm,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: Radius.full,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  activeTab: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  badge: {
    marginLeft: 6,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: Radius.full,
    backgroundColor: Colors.surfaceVariant,
  },
  activeBadge: {
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  activeBadgeText: {
    color: '#FFFFFF',
  },
});

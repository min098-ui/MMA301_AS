import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  RefreshControl,
  ActivityIndicator,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTasks } from '../hooks/useTasks';
import { Task, CreateTaskInput, UpdateTaskInput } from '../types/task';
import { TaskCard } from '../components/TaskCard';
import { TaskModal } from '../components/TaskModal';
import { FilterTabs } from '../components/FilterTabs';
import { EmptyState } from '../components/EmptyState';
import { AxolotlLogo } from '../components/AxolotlLogo';
import { ThemeSelector } from '../components/ThemeSelector';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { Spacing, Radius, Shadows } from '../constants/theme';

export const HomeScreen: React.FC = () => {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  const {
    tasks,
    allTasks,
    loading,
    refreshing,
    selectedFilter,
    setSelectedFilter,
    searchQuery,
    setSearchQuery,
    refresh,
    addTask,
    editTask,
    removeTask,
  } = useTasks();

  const { t, language, toggleLanguage } = useLanguage();
  const { colors, theme } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  const handleOpenCreateModal = () => {
    setTaskToEdit(null);
    setModalVisible(true);
  };

  const handleOpenEditModal = (task: Task) => {
    setTaskToEdit(task);
    setModalVisible(true);
  };

  const handleModalSubmit = async (data: CreateTaskInput | UpdateTaskInput) => {
    if (taskToEdit) {
      await editTask(taskToEdit.id, data);
    } else {
      await addTask(data as CreateTaskInput);
    }
  };

  const handleToggleStatus = async (task: Task) => {
    const nextStatus =
      task.status === 'To Do'
        ? 'In Progress'
        : task.status === 'In Progress'
          ? 'Completed'
          : 'To Do';
    await editTask(task.id, { status: nextStatus });
  };

  const counts = {
    all: allTasks.length,
    todo: allTasks.filter((t) => t.status === 'To Do').length,
    inProgress: allTasks.filter((t) => t.status === 'In Progress').length,
    completed: allTasks.filter((t) => t.status === 'Completed').length,
  };

  const renderHeader = () => (
    <View style={[styles.headerContainer, isTablet && styles.tabletContainer]}>
      {/* Top Executive Dashboard Card */}
      <View
        style={[
          styles.dashboardCard,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
          },
        ]}
      >
        {/* App Branding & Language Switcher */}
        <View style={styles.topRow}>
          <AxolotlLogo size={46} showOnlineBadge={true} />
          <View style={styles.brandInfo}>
            <View style={styles.titleRow}>
              <Text style={[styles.brandName, { color: colors.textPrimary }]}>{t.appName}</Text>
              <View
                style={[
                  styles.liveBadge,
                  {
                    backgroundColor: colors.primaryLight,
                    borderColor: colors.primarySoft,
                  },
                ]}
              >
                <Ionicons
                  name={theme.icon as any}
                  size={11}
                  color={colors.primary}
                />
                <View style={[styles.liveDot, { backgroundColor: colors.primary }]} />
                <Text style={[styles.liveText, { color: colors.primary }]}>SYNC</Text>
              </View>
            </View>
            <Text style={[styles.brandSubtitle, { color: colors.textSecondary }]} numberOfLines={1}>
              {t.appSubtitle}
            </Text>
          </View>

          {/* Segmented EN / VI Toggle */}
          <View
            style={[
              styles.langSegment,
              {
                backgroundColor: colors.surfaceVariant,
                borderColor: colors.border,
              },
            ]}
          >
            <TouchableOpacity
              style={[styles.langBtn, language === 'en' && styles.langBtnActive]}
              onPress={() => language !== 'en' && toggleLanguage()}
              activeOpacity={0.7}
            >
              <Text style={[styles.langText, language === 'en' && { color: colors.primary, fontWeight: '800' }]}>
                EN
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.langBtn, language === 'vi' && styles.langBtnActive]}
              onPress={() => language !== 'vi' && toggleLanguage()}
              activeOpacity={0.7}
            >
              <Text style={[styles.langText, language === 'vi' && { color: colors.primary, fontWeight: '800' }]}>
                VI
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Ô CHUYỂN MÀU (Color Theme Switcher) */}
        <ThemeSelector />

        {/* Primary Action Button */}
        <TouchableOpacity
          style={[
            styles.primaryAddBtn,
            {
              backgroundColor: colors.primary,
              shadowColor: colors.primary,
            },
          ]}
          onPress={handleOpenCreateModal}
          activeOpacity={0.85}
        >
          <Ionicons name="add-circle" size={20} color="#FFFFFF" style={{ marginRight: 6 }} />
          <Text style={styles.primaryAddText}>{t.newTask}</Text>
        </TouchableOpacity>

        {/* KPI Metrics Strip */}
        <View
          style={[
            styles.metricsContainer,
            {
              backgroundColor: colors.surfaceVariant,
              borderColor: colors.border,
            },
          ]}
        >
          <View style={styles.metricItem}>
            <Text style={[styles.metricNumber, { color: colors.textPrimary }]}>{counts.all}</Text>
            <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>{t.total}</Text>
          </View>

          <View style={[styles.metricDivider, { backgroundColor: colors.border }]} />

          <View style={styles.metricItem}>
            <Text style={[styles.metricNumber, { color: colors.statusTodo }]}>{counts.todo}</Text>
            <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>{t.todo}</Text>
          </View>

          <View style={[styles.metricDivider, { backgroundColor: colors.border }]} />

          <View style={styles.metricItem}>
            <Text style={[styles.metricNumber, { color: colors.statusInProgress }]}>
              {counts.inProgress}
            </Text>
            <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>{t.inProgress}</Text>
          </View>

          <View style={[styles.metricDivider, { backgroundColor: colors.border }]} />

          <View style={styles.metricItem}>
            <Text style={[styles.metricNumber, { color: colors.statusCompleted }]}>
              {counts.completed}
            </Text>
            <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>{t.done}</Text>
          </View>
        </View>
      </View>

      {/* Spotlight Search Bar */}
      <View
        style={[
          styles.searchBar,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
          },
        ]}
      >
        <Ionicons name="search" size={18} color={colors.textMuted} style={styles.searchIcon} />
        <TextInput
          style={[styles.searchInput, { color: colors.textPrimary }]}
          placeholder={t.searchPlaceholder}
          placeholderTextColor={colors.textMuted}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearBtn} activeOpacity={0.7}>
            <Ionicons name="close-circle" size={18} color={colors.textMuted} />
          </TouchableOpacity>
        )}
      </View>

      {/* Status Filter Tabs */}
      <FilterTabs
        currentFilter={selectedFilter}
        onSelectFilter={setSelectedFilter}
        counts={counts}
      />

      {/* Section Header */}
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
          {selectedFilter === 'All'
            ? t.allTasks
            : selectedFilter === 'To Do'
              ? t.todoTasks
              : selectedFilter === 'In Progress'
                ? t.inProgressTasks
                : t.completedTasks}
        </Text>
        <View
          style={[
            styles.countBadge,
            {
              backgroundColor: colors.surfaceVariant,
              borderColor: colors.border,
            },
          ]}
        >
          <Text style={[styles.countBadgeText, { color: colors.textPrimary }]}>{tasks.length}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={[styles.loadingText, { color: colors.textSecondary }]}>
              Syncing with Cloud Firestore...
            </Text>
          </View>
        ) : (
          <FlatList
            data={tasks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={[isTablet && styles.tabletContainer]}>
                <TaskCard
                  task={item}
                  onEdit={handleOpenEditModal}
                  onDelete={removeTask}
                  onToggleStatus={handleToggleStatus}
                />
              </View>
            )}
            ListHeaderComponent={renderHeader}
            ListEmptyComponent={
              <EmptyState
                message={
                  searchQuery
                    ? `${t.emptyFilterMsg}: "${searchQuery}"`
                    : `${t.emptyFilterMsg} "${selectedFilter}".`
                }
                onAction={handleOpenCreateModal}
                actionLabel={t.newTask}
              />
            }
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={refresh}
                tintColor={colors.primary}
                colors={[colors.primary]}
              />
            }
            contentContainerStyle={styles.listContent}
          />
        )}

        {/* Floating Action Button (FAB) */}
        <TouchableOpacity
          style={[
            styles.fab,
            {
              backgroundColor: colors.primary,
              shadowColor: colors.primary,
            },
          ]}
          onPress={handleOpenCreateModal}
          activeOpacity={0.85}
          accessibilityLabel="Add Task"
        >
          <Ionicons name="add" size={28} color="#FFFFFF" />
        </TouchableOpacity>

        {/* Create / Edit Modal */}
        <TaskModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSubmit={handleModalSubmit}
          taskToEdit={taskToEdit}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  tabletContainer: {
    maxWidth: 720,
    width: '100%',
    alignSelf: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  loadingText: {
    marginTop: Spacing.md,
    fontSize: 14,
    fontWeight: '500',
  },
  listContent: {
    paddingBottom: 90,
  },
  headerContainer: {
    paddingTop: Spacing.md,
  },
  dashboardCard: {
    marginHorizontal: Spacing.lg,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    marginBottom: Spacing.md,
    ...Shadows.card,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  brandInfo: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  brandName: {
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: Radius.full,
    gap: 4,
    borderWidth: 1,
  },
  liveDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
  },
  liveText: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  brandSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  langSegment: {
    flexDirection: 'row',
    borderRadius: Radius.sm,
    padding: 2,
    borderWidth: 1,
  },
  langBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  langBtnActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  langText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  primaryAddBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 11,
    paddingHorizontal: Spacing.lg,
    borderRadius: Radius.md,
    marginBottom: Spacing.md,
    ...Shadows.button,
  },
  primaryAddText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  metricsContainer: {
    flexDirection: 'row',
    borderRadius: Radius.md,
    paddingVertical: Spacing.sm + 2,
    paddingHorizontal: Spacing.sm,
    alignItems: 'center',
    borderWidth: 1,
  },
  metricItem: {
    flex: 1,
    alignItems: 'center',
  },
  metricNumber: {
    fontSize: 16,
    fontWeight: '800',
  },
  metricLabel: {
    fontSize: 11,
    marginTop: 2,
    fontWeight: '600',
  },
  metricDivider: {
    width: 1,
    height: 22,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Spacing.lg,
    borderRadius: Radius.md,
    borderWidth: 1,
    paddingHorizontal: Spacing.md,
    height: 44,
    marginBottom: Spacing.xs,
    ...Shadows.card,
  },
  searchIcon: {
    marginRight: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
  },
  clearBtn: {
    padding: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  countBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: Radius.full,
    borderWidth: 1,
  },
  countBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.button,
  },
});

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Task, TaskStatus, TaskPriority } from '../types/task';
import { useLanguage } from '../context/LanguageContext';
import { Colors, Spacing, Radius, Shadows } from '../constants/theme';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleStatus?: (task: Task) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete, onToggleStatus }) => {
  const { t } = useLanguage();

  const getStatusBadge = (status: TaskStatus) => {
    switch (status) {
      case 'Completed':
        return {
          bg: Colors.statusCompletedBg,
          text: Colors.statusCompleted,
          border: Colors.statusCompletedBorder,
          icon: 'checkmark-circle' as const,
          label: t.done,
        };
      case 'In Progress':
        return {
          bg: Colors.statusInProgressBg,
          text: Colors.statusInProgress,
          border: Colors.statusInProgressBorder,
          icon: 'sync-circle' as const,
          label: t.inProgress,
        };
      default:
        return {
          bg: Colors.statusTodoBg,
          text: Colors.statusTodo,
          border: Colors.statusTodoBorder,
          icon: 'ellipse-outline' as const,
          label: t.todo,
        };
    }
  };

  const getPriorityBadge = (priority: TaskPriority) => {
    switch (priority) {
      case 'High':
        return {
          bg: Colors.priorityHighBg,
          text: Colors.priorityHigh,
          border: Colors.priorityHighBorder,
          label: t.prioHigh,
        };
      case 'Medium':
        return {
          bg: Colors.priorityMedBg,
          text: Colors.priorityMed,
          border: Colors.priorityMedBorder,
          label: t.prioMed,
        };
      default:
        return {
          bg: Colors.priorityLowBg,
          text: Colors.priorityLow,
          border: Colors.priorityLowBorder,
          label: t.prioLow,
        };
    }
  };

  const confirmDelete = () => {
    Alert.alert(
      t.deleteTitle,
      `${t.deleteConfirm} "${task.title}"?`,
      [
        { text: t.cancel, style: 'cancel' },
        {
          text: t.delete,
          style: 'destructive',
          onPress: () => onDelete(task.id),
        },
      ],
      { cancelable: true },
    );
  };

  const statusStyle = getStatusBadge(task.status);
  const priorityStyle = getPriorityBadge(task.priority);

  return (
    <View style={styles.card}>
      {/* Top Header Row: Status, Priority & Actions */}
      <View style={styles.topRow}>
        <View style={styles.badgeGroup}>
          {/* Status pill (Interactive toggle) */}
          <TouchableOpacity
            style={[
              styles.statusBadge,
              { backgroundColor: statusStyle.bg, borderColor: statusStyle.border },
            ]}
            onPress={() => onToggleStatus && onToggleStatus(task)}
            activeOpacity={0.7}
            accessibilityLabel={`Status: ${task.status}. Tap to change status`}
          >
            <Ionicons name={statusStyle.icon} size={13} color={statusStyle.text} />
            <Text style={[styles.statusText, { color: statusStyle.text }]}>
              {statusStyle.label}
            </Text>
          </TouchableOpacity>

          {/* Priority pill */}
          <View
            style={[
              styles.priorityBadge,
              { backgroundColor: priorityStyle.bg, borderColor: priorityStyle.border },
            ]}
          >
            <View style={[styles.priorityDot, { backgroundColor: priorityStyle.text }]} />
            <Text style={[styles.priorityText, { color: priorityStyle.text }]}>
              {priorityStyle.label}
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => onEdit(task)}
            accessibilityLabel="Edit task"
            activeOpacity={0.7}
          >
            <Ionicons name="create-outline" size={16} color={Colors.primary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionBtn, styles.deleteActionBtn]}
            onPress={confirmDelete}
            accessibilityLabel="Delete task"
            activeOpacity={0.7}
          >
            <Ionicons name="trash-outline" size={16} color={Colors.danger} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Task Title */}
      <Text
        style={[
          styles.title,
          task.status === 'Completed' && styles.completedTitle,
        ]}
      >
        {task.title}
      </Text>

      {/* Description */}
      {task.description ? (
        <Text style={styles.description} numberOfLines={3}>
          {task.description}
        </Text>
      ) : null}

      {/* Footer Info Row */}
      <View style={styles.footer}>
        <View style={styles.dateBadge}>
          <Ionicons name="calendar-outline" size={12} color={Colors.textSecondary} />
          <Text style={styles.dateText}>
            {t.due}: <Text style={styles.dateBold}>{task.dueDate || 'No date'}</Text>
          </Text>
        </View>

        <Text style={styles.idBadge}>#{task.id.slice(0, 6)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.md + 2,
    paddingHorizontal: Spacing.lg,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.card,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  badgeGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.full,
    borderWidth: 1,
    gap: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  priorityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.full,
    borderWidth: 1,
    gap: 5,
  },
  priorityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  priorityText: {
    fontSize: 11,
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionBtn: {
    width: 30,
    height: 30,
    borderRadius: Radius.sm,
    backgroundColor: Colors.surfaceVariant,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  deleteActionBtn: {
    backgroundColor: Colors.dangerBg,
    borderColor: '#FECDD3',
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
    lineHeight: 21,
    marginBottom: 4,
  },
  completedTitle: {
    color: Colors.textMuted,
    textDecorationLine: 'line-through',
  },
  description: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
    marginBottom: Spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    paddingTop: Spacing.sm,
    marginTop: Spacing.xs,
  },
  dateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: Colors.surfaceVariant,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.xs,
  },
  dateText: {
    fontSize: 11,
    color: Colors.textSecondary,
  },
  dateBold: {
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  idBadge: {
    fontSize: 11,
    color: Colors.textMuted,
    fontFamily: 'monospace',
    fontWeight: '500',
  },
});

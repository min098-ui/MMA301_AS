import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Task, TaskStatus, TaskPriority } from '../types/task';
import { Colors, Spacing, Radius } from '../constants/theme';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleStatus?: (task: Task) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete, onToggleStatus }) => {
  const getStatusBadge = (status: TaskStatus) => {
    switch (status) {
      case 'Completed':
        return {
          bg: Colors.statusCompletedBg,
          text: Colors.statusCompleted,
          icon: 'checkmark-circle-outline' as const,
        };
      case 'In Progress':
        return {
          bg: Colors.statusInProgressBg,
          text: Colors.statusInProgress,
          icon: 'sync-outline' as const,
        };
      default:
        return {
          bg: Colors.statusTodoBg,
          text: Colors.statusTodo,
          icon: 'time-outline' as const,
        };
    }
  };

  const getPriorityBadge = (priority: TaskPriority) => {
    switch (priority) {
      case 'High':
        return { bg: Colors.priorityHighBg, text: Colors.priorityHigh };
      case 'Medium':
        return { bg: Colors.priorityMedBg, text: Colors.priorityMed };
      default:
        return { bg: Colors.priorityLowBg, text: Colors.priorityLow };
    }
  };

  const confirmDelete = () => {
    Alert.alert(
      'Delete Task',
      `Are you sure you want to delete "${task.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
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
      {/* Header Row: Status & Priority Badges */}
      <View style={styles.badgeRow}>
        <TouchableOpacity
          style={[styles.badge, { backgroundColor: statusStyle.bg }]}
          onPress={() => onToggleStatus && onToggleStatus(task)}
          activeOpacity={0.7}
        >
          <Text style={{ fontSize: 13, marginRight: 2 }}>
            {task.status === 'Completed' ? '🌸' : task.status === 'In Progress' ? '✨' : '🎀'}
          </Text>
          <Text style={[styles.badgeText, { color: statusStyle.text }]}>{task.status}</Text>
        </TouchableOpacity>

        <View style={[styles.badge, { backgroundColor: priorityStyle.bg }]}>
          <Text style={[styles.badgeText, { color: priorityStyle.text }]}>
            {task.priority === 'High' ? '🍓 Cao' : task.priority === 'Medium' ? '🍬 Vừa' : '🍀 Thấp'}
          </Text>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => onEdit(task)}
            accessibilityLabel="Edit task"
          >
            <Ionicons name="create-outline" size={19} color={Colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.iconBtn, styles.deleteBtn]}
            onPress={confirmDelete}
            accessibilityLabel="Delete task"
          >
            <Ionicons name="trash-outline" size={19} color={Colors.danger} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Title */}
      <Text style={styles.title}>{task.title}</Text>

      {/* Description (if present) */}
      {task.description ? (
        <Text style={styles.description} numberOfLines={3}>
          {task.description}
        </Text>
      ) : null}

      {/* Footer Info: Due date & ID */}
      <View style={styles.footerRow}>
        <View style={styles.metaItem}>
          <Ionicons name="calendar-outline" size={13} color={Colors.textMuted} />
          <Text style={styles.metaText}>Due: {task.dueDate || 'No date'}</Text>
        </View>
        <Text style={styles.idText}>ID: {task.id.slice(0, 8)}...</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.sm,
    marginRight: Spacing.xs,
    gap: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    marginLeft: 'auto',
    alignItems: 'center',
    gap: 4,
  },
  iconBtn: {
    padding: 6,
    borderRadius: Radius.sm,
    backgroundColor: Colors.surfaceVariant,
  },
  deleteBtn: {
    backgroundColor: '#FEE2E2',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    lineHeight: 22,
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 19,
    marginBottom: Spacing.sm,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: Spacing.sm,
    marginTop: Spacing.xs,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  idText: {
    fontSize: 11,
    color: Colors.textMuted,
    fontFamily: 'monospace',
  },
});

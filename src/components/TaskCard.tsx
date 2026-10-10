import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Task, TaskStatus, TaskPriority } from '../types/task';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { Spacing, Radius, Shadows } from '../constants/theme';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../services/firebase';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onToggleStatus?: (task: Task) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete, onToggleStatus }) => {
  const { t } = useLanguage();
  const { colors } = useTheme();
  const [assigneeName, setAssigneeName] = React.useState<string | null>(null);
  const [teamName, setTeamName] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchDetails = async () => {
      if (task.assigneeId) {
        try {
          const userDoc = await getDoc(doc(db, 'users', task.assigneeId));
          if (userDoc.exists()) setAssigneeName(userDoc.data().name || userDoc.data().email);
        } catch (e) {}
      } else {
        setAssigneeName(null);
      }
      if (task.teamId) {
        try {
          const teamDoc = await getDoc(doc(db, 'teams', task.teamId));
          if (teamDoc.exists()) setTeamName(teamDoc.data().name);
        } catch (e) {}
      } else {
        setTeamName(null);
      }
    };
    fetchDetails();
  }, [task.assigneeId, task.teamId]);

  const getStatusBadge = (status: TaskStatus) => {
    switch (status) {
      case 'Completed':
        return {
          bg: colors.statusCompletedBg,
          text: colors.statusCompleted,
          border: colors.statusCompletedBorder,
          icon: 'checkmark-circle' as const,
          label: t.done,
        };
      case 'In Progress':
        return {
          bg: colors.statusInProgressBg,
          text: colors.statusInProgress,
          border: colors.statusInProgressBorder,
          icon: 'sync-circle' as const,
          label: t.inProgress,
        };
      default:
        return {
          bg: colors.statusTodoBg,
          text: colors.statusTodo,
          border: colors.statusTodoBorder,
          icon: 'ellipse-outline' as const,
          label: t.todo,
        };
    }
  };

  const getPriorityBadge = (priority: TaskPriority) => {
    switch (priority) {
      case 'High':
        return {
          bg: colors.priorityHighBg,
          text: colors.priorityHigh,
          border: colors.priorityHighBorder,
          label: t.prioHigh,
        };
      case 'Medium':
        return {
          bg: colors.priorityMedBg,
          text: colors.priorityMed,
          border: colors.priorityMedBorder,
          label: t.prioMed,
        };
      default:
        return {
          bg: colors.priorityLowBg,
          text: colors.priorityLow,
          border: colors.priorityLowBorder,
          label: t.prioLow,
        };
    }
  };

  const statusStyle = getStatusBadge(task.status);
  const priorityStyle = getPriorityBadge(task.priority);

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
      ]}
    >
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
            style={[
              styles.actionBtn,
              {
                backgroundColor: colors.surfaceVariant,
                borderColor: colors.border,
              },
            ]}
            onPress={() => onEdit(task)}
            accessibilityLabel="Edit task"
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 6, right: 6 }}
          >
            <Ionicons name="create-outline" size={17} color={colors.primary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionBtn, styles.deleteActionBtn]}
            onPress={() => onDelete(task)}
            accessibilityLabel="Delete task"
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 6, right: 10 }}
          >
            <Ionicons name="trash-outline" size={17} color={colors.danger} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Task Title */}
      <Text
        style={[
          styles.title,
          { color: colors.textPrimary },
          task.status === 'Completed' && styles.completedTitle,
        ]}
      >
        {task.title}
      </Text>

      {/* Description */}
      {task.description ? (
        <Text style={[styles.description, { color: colors.textSecondary }]} numberOfLines={3}>
          {task.description}
        </Text>
      ) : null}

      {/* Footer Info Row */}
      <View style={[styles.footer, { borderTopColor: colors.borderLight }]}>
        <View style={{ flexDirection: 'row', gap: Spacing.xs, flexWrap: 'wrap' }}>
          <View style={[styles.dateBadge, { backgroundColor: colors.surfaceVariant }]}>
            <Ionicons name="calendar-outline" size={12} color={colors.textSecondary} />
            <Text style={[styles.dateText, { color: colors.textSecondary }]}>
              {t.due}: <Text style={[styles.dateBold, { color: colors.textPrimary }]}>{task.dueDate || 'No date'}</Text>
            </Text>
          </View>
          
          {teamName && (
            <View style={[styles.dateBadge, { backgroundColor: colors.primaryLight }]}>
              <Ionicons name="people" size={12} color={colors.primary} />
              <Text style={[styles.dateText, { color: colors.primary, fontWeight: '600' }]}>
                {teamName}
              </Text>
            </View>
          )}

          {assigneeName && (
            <View style={[styles.dateBadge, { backgroundColor: colors.surfaceVariant }]}>
              <Ionicons name="person" size={12} color={colors.textPrimary} />
              <Text style={[styles.dateText, { color: colors.textPrimary }]}>
                {assigneeName}
              </Text>
            </View>
          )}
        </View>

        <Text style={[styles.idBadge, { color: colors.textMuted, marginTop: 4 }]}>#{task.id.slice(0, 6)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.lg,
    paddingVertical: Spacing.md + 2,
    paddingHorizontal: Spacing.lg,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
    borderWidth: 1,
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
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  deleteActionBtn: {
    backgroundColor: '#FEE2E2',
    borderColor: '#FECDD3',
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 21,
    marginBottom: 4,
  },
  completedTitle: {
    opacity: 0.5,
    textDecorationLine: 'line-through',
  },
  description: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: Spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    paddingTop: Spacing.sm,
    marginTop: Spacing.xs,
  },
  dateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.xs,
  },
  dateText: {
    fontSize: 11,
  },
  dateBold: {
    fontWeight: '600',
  },
  idBadge: {
    fontSize: 11,
    fontFamily: 'monospace',
    fontWeight: '500',
  },
});

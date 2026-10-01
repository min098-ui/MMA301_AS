import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Task, TaskStatus, TaskPriority, CreateTaskInput, UpdateTaskInput } from '../types/task';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { Colors, Spacing, Radius, Shadows } from '../constants/theme';

interface TaskModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (taskData: CreateTaskInput | UpdateTaskInput) => Promise<void>;
  taskToEdit?: Task | null;
  onDeleteTask?: (id: string) => Promise<void>;
}

interface FormInnerProps {
  taskToEdit?: Task | null;
  onClose: () => void;
  onSubmit: (taskData: CreateTaskInput | UpdateTaskInput) => Promise<void>;
  onDeleteTask?: (id: string) => Promise<void>;
}

const getDefaultDueDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 3);
  return date.toISOString().split('T')[0];
};

const TaskFormContent: React.FC<FormInnerProps> = ({
  taskToEdit,
  onClose,
  onSubmit,
  onDeleteTask,
}) => {
  const { t } = useLanguage();
  const { colors } = useTheme();
  const isEditing = Boolean(taskToEdit);

  const [title, setTitle] = useState(taskToEdit ? taskToEdit.title : '');
  const [description, setDescription] = useState(taskToEdit ? taskToEdit.description || '' : '');
  const [status, setStatus] = useState<TaskStatus>(taskToEdit ? taskToEdit.status : 'To Do');
  const [priority, setPriority] = useState<TaskPriority>(
    taskToEdit ? taskToEdit.priority : 'Medium',
  );
  const [dueDate, setDueDate] = useState(
    taskToEdit?.dueDate ? taskToEdit.dueDate : getDefaultDueDate(),
  );
  const [titleError, setTitleError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleValidateAndSubmit = async () => {
    if (!title.trim()) {
      setTitleError('Task title is required');
      return;
    }
    if (title.trim().length < 3) {
      setTitleError('Title must be at least 3 characters');
      return;
    }

    setTitleError('');
    setIsSubmitting(true);

    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim(),
        status,
        priority,
        dueDate: dueDate.trim() || new Date().toISOString().split('T')[0],
      });
      onClose();
    } catch (err: any) {
      console.error('Error submitting form:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const statuses: { key: TaskStatus; label: string; activeColor: string; activeBg: string }[] = [
    { key: 'To Do', label: t.todo, activeColor: colors.statusTodo, activeBg: colors.statusTodoBg },
    {
      key: 'In Progress',
      label: t.inProgress,
      activeColor: colors.statusInProgress,
      activeBg: colors.statusInProgressBg,
    },
    {
      key: 'Completed',
      label: t.done,
      activeColor: colors.statusCompleted,
      activeBg: colors.statusCompletedBg,
    },
  ];

  const priorities: {
    key: TaskPriority;
    label: string;
    activeColor: string;
    activeBg: string;
  }[] = [
    { key: 'Low', label: t.prioLow, activeColor: colors.priorityLow, activeBg: colors.priorityLowBg },
    {
      key: 'Medium',
      label: t.prioMed,
      activeColor: colors.priorityMed,
      activeBg: colors.priorityMedBg,
    },
    {
      key: 'High',
      label: t.prioHigh,
      activeColor: colors.priorityHigh,
      activeBg: colors.priorityHighBg,
    },
  ];

  return (
    <View style={[styles.modalContainer, { backgroundColor: colors.surface }]}>
      {/* Top Handle Bar */}
      <View style={[styles.dragHandle, { backgroundColor: colors.border }]} />

      {/* Header */}
      <View style={styles.modalHeader}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.modalTitle, { color: colors.textPrimary }]}>{isEditing ? t.editTaskTitle : t.createTaskTitle}</Text>
          <Text style={[styles.modalSubtitle, { color: colors.textSecondary }]}>
            {isEditing ? t.editTaskSubtitle : t.createTaskSubtitle}
          </Text>
        </View>
        <TouchableOpacity onPress={onClose} style={[styles.closeBtn, { backgroundColor: colors.surfaceVariant }]} activeOpacity={0.7}>
          <Ionicons name="close" size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.formScroll} showsVerticalScrollIndicator={false}>
        {/* Title Field */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: colors.textPrimary }]}>
            {t.titleLabel} <Text style={{ color: colors.danger }}>*</Text>
          </Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.surfaceVariant, borderColor: colors.border, color: colors.textPrimary }, Boolean(titleError) && { borderColor: colors.danger, backgroundColor: colors.dangerBg }]}
            placeholder="e.g. Design UI / Refactor Firestore CRUD"
            placeholderTextColor={colors.textMuted}
            value={title}
            onChangeText={(text) => {
              setTitle(text);
              if (titleError) setTitleError('');
            }}
          />
          {Boolean(titleError) && <Text style={[styles.errorText, { color: colors.danger }]}>{titleError}</Text>}
        </View>

        {/* Description Field */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: colors.textPrimary }]}>{t.descLabel}</Text>
          <TextInput
            style={[styles.input, styles.textArea, { backgroundColor: colors.surfaceVariant, borderColor: colors.border, color: colors.textPrimary }]}
            placeholder="Add context, acceptance criteria, or technical details..."
            placeholderTextColor={colors.textMuted}
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
        </View>

        {/* Status Selector */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: colors.textPrimary }]}>{t.statusLabel}</Text>
          <View style={styles.pillRow}>
            {statuses.map((item) => {
              const active = status === item.key;
              return (
                <TouchableOpacity
                  key={item.key}
                  style={[
                    styles.segmentedPill,
                    { backgroundColor: colors.surfaceVariant, borderColor: colors.border },
                    active && {
                      backgroundColor: item.activeBg,
                      borderColor: item.activeColor,
                    },
                  ]}
                  onPress={() => setStatus(item.key)}
                  activeOpacity={0.7}
                >
                  {active && (
                    <Ionicons
                      name="checkmark-circle"
                      size={14}
                      color={item.activeColor}
                      style={{ marginRight: 4 }}
                    />
                  )}
                  <Text
                    style={[
                      styles.segmentedPillText,
                      { color: colors.textSecondary },
                      active && { color: item.activeColor, fontWeight: '700' },
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Priority Selector */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: colors.textPrimary }]}>{t.priorityLabel}</Text>
          <View style={styles.pillRow}>
            {priorities.map((item) => {
              const active = priority === item.key;
              return (
                <TouchableOpacity
                  key={item.key}
                  style={[
                    styles.segmentedPill,
                    { backgroundColor: colors.surfaceVariant, borderColor: colors.border },
                    active && {
                      backgroundColor: item.activeBg,
                      borderColor: item.activeColor,
                    },
                  ]}
                  onPress={() => setPriority(item.key)}
                  activeOpacity={0.7}
                >
                  {active && (
                    <Ionicons
                      name="checkmark-circle"
                      size={14}
                      color={item.activeColor}
                      style={{ marginRight: 4 }}
                    />
                  )}
                  <Text
                    style={[
                      styles.segmentedPillText,
                      { color: colors.textSecondary },
                      active && { color: item.activeColor, fontWeight: '700' },
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Due Date Field */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: colors.textPrimary }]}>{t.dueDateLabel}</Text>
          <View style={[styles.inputWithIcon, { backgroundColor: colors.surfaceVariant, borderColor: colors.border }]}>
            <Ionicons name="calendar-outline" size={18} color={colors.textMuted} style={styles.inputIcon} />
            <TextInput
              style={[styles.innerInput, { color: colors.textPrimary }]}
              placeholder="YYYY-MM-DD"
              placeholderTextColor={colors.textMuted}
              value={dueDate}
              onChangeText={setDueDate}
            />
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={[styles.buttonRow, { borderTopColor: colors.borderLight }]}>
        {isEditing && onDeleteTask && taskToEdit && (
          <TouchableOpacity
            style={[styles.deleteInsideModalBtn, { backgroundColor: colors.dangerBg, borderColor: '#FECDD3' }]}
            onPress={() => onDeleteTask(taskToEdit.id)}
            disabled={isSubmitting}
            activeOpacity={0.7}
            accessibilityLabel="Delete task"
          >
            <Ionicons name="trash-outline" size={18} color={colors.danger} />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.cancelButton, { backgroundColor: colors.surfaceVariant, borderColor: colors.border }]}
          onPress={onClose}
          disabled={isSubmitting}
          activeOpacity={0.7}
        >
          <Text style={[styles.cancelText, { color: colors.textSecondary }]}>{t.cancel}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.submitButton, { backgroundColor: colors.primary }, isSubmitting && styles.disabledButton]}
          onPress={handleValidateAndSubmit}
          disabled={isSubmitting}
          activeOpacity={0.8}
        >
          {isSubmitting ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <>
              <Ionicons
                name={isEditing ? 'checkmark-circle-outline' : 'sparkles'}
                size={18}
                color="#FFFFFF"
                style={{ marginRight: 6 }}
              />
              <Text style={styles.submitText}>{isEditing ? t.saveChanges : t.createTaskBtn}</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const TaskModal: React.FC<TaskModalProps> = ({
  visible,
  onClose,
  onSubmit,
  taskToEdit,
  onDeleteTask,
}) => {
  if (!visible) return null;

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.overlay}
      >
        <TaskFormContent
          key={taskToEdit ? taskToEdit.id : 'new-task'}
          taskToEdit={taskToEdit}
          onClose={onClose}
          onSubmit={onSubmit}
          onDeleteTask={onDeleteTask}
        />
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: Radius.xxl,
    borderTopRightRadius: Radius.xxl,
    paddingTop: Spacing.md,
    paddingBottom: Platform.OS === 'ios' ? 34 : Spacing.xl,
    paddingHorizontal: Spacing.xl,
    maxHeight: '88%',
    ...Shadows.modal,
  },
  dragHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.border,
    alignSelf: 'center',
    marginBottom: Spacing.md,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.lg,
  },
  modalTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: Colors.textPrimary,
    letterSpacing: -0.3,
  },
  modalSubtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.surfaceVariant,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: Spacing.sm,
  },
  formScroll: {
    marginBottom: Spacing.md,
  },
  inputGroup: {
    marginBottom: Spacing.md,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  requiredAsterisk: {
    color: Colors.danger,
  },
  input: {
    backgroundColor: Colors.surfaceVariant,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: 10,
    fontSize: 14,
    color: Colors.textPrimary,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceVariant,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
  },
  inputIcon: {
    marginRight: 8,
  },
  innerInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 14,
    color: Colors.textPrimary,
  },
  textArea: {
    minHeight: 74,
    paddingTop: 10,
  },
  inputError: {
    borderColor: Colors.danger,
    backgroundColor: Colors.dangerBg,
  },
  errorText: {
    fontSize: 12,
    color: Colors.danger,
    marginTop: 4,
    fontWeight: '500',
  },
  pillRow: {
    flexDirection: 'row',
    gap: 8,
  },
  segmentedPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
    paddingHorizontal: 8,
    borderRadius: Radius.md,
    backgroundColor: Colors.surfaceVariant,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  segmentedPillText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: Radius.md,
    backgroundColor: Colors.surfaceVariant,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cancelText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  submitButton: {
    flex: 2,
    flexDirection: 'row',
    paddingVertical: 12,
    borderRadius: Radius.md,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.button,
  },
  disabledButton: {
    opacity: 0.6,
  },
  submitText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  deleteInsideModalBtn: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    backgroundColor: '#FEE2E2',
    borderWidth: 1,
    borderColor: '#FECDD3',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

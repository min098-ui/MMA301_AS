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
import { Colors, Spacing, Radius, Shadows } from '../constants/theme';

interface TaskModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (taskData: CreateTaskInput | UpdateTaskInput) => Promise<void>;
  taskToEdit?: Task | null;
}

interface FormInnerProps {
  taskToEdit?: Task | null;
  onClose: () => void;
  onSubmit: (taskData: CreateTaskInput | UpdateTaskInput) => Promise<void>;
}

const getDefaultDueDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 3);
  return date.toISOString().split('T')[0];
};

const TaskFormContent: React.FC<FormInnerProps> = ({ taskToEdit, onClose, onSubmit }) => {
  const { t } = useLanguage();
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
    { key: 'To Do', label: t.todo, activeColor: Colors.statusTodo, activeBg: Colors.statusTodoBg },
    {
      key: 'In Progress',
      label: t.inProgress,
      activeColor: Colors.statusInProgress,
      activeBg: Colors.statusInProgressBg,
    },
    {
      key: 'Completed',
      label: t.done,
      activeColor: Colors.statusCompleted,
      activeBg: Colors.statusCompletedBg,
    },
  ];

  const priorities: {
    key: TaskPriority;
    label: string;
    activeColor: string;
    activeBg: string;
  }[] = [
    { key: 'Low', label: t.prioLow, activeColor: Colors.priorityLow, activeBg: Colors.priorityLowBg },
    {
      key: 'Medium',
      label: t.prioMed,
      activeColor: Colors.priorityMed,
      activeBg: Colors.priorityMedBg,
    },
    {
      key: 'High',
      label: t.prioHigh,
      activeColor: Colors.priorityHigh,
      activeBg: Colors.priorityHighBg,
    },
  ];

  return (
    <View style={styles.modalContainer}>
      {/* Top Handle Bar */}
      <View style={styles.dragHandle} />

      {/* Header */}
      <View style={styles.modalHeader}>
        <View style={{ flex: 1 }}>
          <Text style={styles.modalTitle}>{isEditing ? t.editTaskTitle : t.createTaskTitle}</Text>
          <Text style={styles.modalSubtitle}>
            {isEditing ? t.editTaskSubtitle : t.createTaskSubtitle}
          </Text>
        </View>
        <TouchableOpacity onPress={onClose} style={styles.closeBtn} activeOpacity={0.7}>
          <Ionicons name="close" size={20} color={Colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.formScroll} showsVerticalScrollIndicator={false}>
        {/* Title Field */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            {t.titleLabel} <Text style={styles.requiredAsterisk}>*</Text>
          </Text>
          <TextInput
            style={[styles.input, Boolean(titleError) && styles.inputError]}
            placeholder="e.g. Design UI / Refactor Firestore CRUD"
            placeholderTextColor={Colors.textMuted}
            value={title}
            onChangeText={(text) => {
              setTitle(text);
              if (titleError) setTitleError('');
            }}
          />
          {Boolean(titleError) && <Text style={styles.errorText}>{titleError}</Text>}
        </View>

        {/* Description Field */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>{t.descLabel}</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Add context, acceptance criteria, or technical details..."
            placeholderTextColor={Colors.textMuted}
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
        </View>

        {/* Status Selector */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>{t.statusLabel}</Text>
          <View style={styles.pillRow}>
            {statuses.map((item) => {
              const active = status === item.key;
              return (
                <TouchableOpacity
                  key={item.key}
                  style={[
                    styles.segmentedPill,
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
          <Text style={styles.label}>{t.priorityLabel}</Text>
          <View style={styles.pillRow}>
            {priorities.map((item) => {
              const active = priority === item.key;
              return (
                <TouchableOpacity
                  key={item.key}
                  style={[
                    styles.segmentedPill,
                    active && {
                      backgroundColor: item.activeBg,
                      borderColor: item.activeColor,
                    },
                  ]}
                  onPress={() => setPriority(item.key)}
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      styles.dot,
                      { backgroundColor: active ? item.activeColor : Colors.textMuted },
                    ]}
                  />
                  <Text
                    style={[
                      styles.segmentedPillText,
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
          <Text style={styles.label}>{t.dueDateLabel}</Text>
          <View style={styles.inputWithIcon}>
            <Ionicons name="calendar-outline" size={18} color={Colors.textMuted} style={styles.inputIcon} />
            <TextInput
              style={styles.innerInput}
              placeholder="YYYY-MM-DD"
              placeholderTextColor={Colors.textMuted}
              value={dueDate}
              onChangeText={setDueDate}
            />
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={onClose}
          disabled={isSubmitting}
          activeOpacity={0.7}
        >
          <Text style={styles.cancelText}>{t.cancel}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.submitButton, isSubmitting && styles.disabledButton]}
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

export const TaskModal: React.FC<TaskModalProps> = ({ visible, onClose, onSubmit, taskToEdit }) => {
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
});

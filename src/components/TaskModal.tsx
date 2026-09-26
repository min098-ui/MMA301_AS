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
import { Colors, Spacing, Radius } from '../constants/theme';

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

  const statuses: TaskStatus[] = ['To Do', 'In Progress', 'Completed'];
  const priorities: TaskPriority[] = ['Low', 'Medium', 'High'];

  return (
    <View style={styles.modalContainer}>
      {/* Header */}
      <View style={styles.modalHeader}>
        <View>
          <Text style={styles.modalTitle}>{isEditing ? 'Edit Task' : 'Create New Task'}</Text>
          <Text style={styles.modalSubtitle}>
            {isEditing ? 'Update task details and status' : 'Add a new task to your project'}
          </Text>
        </View>
        <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
          <Ionicons name="close" size={22} color={Colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.formScroll} showsVerticalScrollIndicator={false}>
        {/* Title Field */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            Title <Text style={styles.requiredAsterisk}>*</Text>
          </Text>
          <TextInput
            style={[styles.input, Boolean(titleError) && styles.inputError]}
            placeholder="e.g. Implement user profile"
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
          <Text style={styles.label}>Description (optional)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Add context, acceptance criteria, or notes..."
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
          <Text style={styles.label}>Status</Text>
          <View style={styles.pillRow}>
            {statuses.map((s) => {
              const active = status === s;
              return (
                <TouchableOpacity
                  key={s}
                  style={[styles.pill, active && styles.activePill]}
                  onPress={() => setStatus(s)}
                >
                  <Text style={[styles.pillText, active && styles.activePillText]}>{s}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Priority Selector */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Priority</Text>
          <View style={styles.pillRow}>
            {priorities.map((p) => {
              const active = priority === p;
              return (
                <TouchableOpacity
                  key={p}
                  style={[styles.pill, active && styles.activePill]}
                  onPress={() => setPriority(p)}
                >
                  <Text style={[styles.pillText, active && styles.activePillText]}>{p}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Due Date Field */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Due Date (YYYY-MM-DD)</Text>
          <TextInput
            style={styles.input}
            placeholder="2026-10-15"
            placeholderTextColor={Colors.textMuted}
            value={dueDate}
            onChangeText={setDueDate}
          />
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.cancelButton} onPress={onClose} disabled={isSubmitting}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.submitButton, isSubmitting && styles.disabledButton]}
          onPress={handleValidateAndSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <>
              <Ionicons
                name={isEditing ? 'checkmark-circle-outline' : 'add-circle-outline'}
                size={18}
                color="#FFFFFF"
                style={{ marginRight: 6 }}
              />
              <Text style={styles.submitText}>{isEditing ? 'Save Changes' : 'Create Task'}</Text>
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
    backgroundColor: 'rgba(15, 23, 42, 0.55)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    paddingTop: Spacing.xl,
    paddingBottom: Platform.OS === 'ios' ? 34 : Spacing.xl,
    paddingHorizontal: Spacing.xl,
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.lg,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  modalSubtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  closeBtn: {
    padding: 6,
    borderRadius: Radius.full,
    backgroundColor: Colors.surfaceVariant,
  },
  formScroll: {
    maxHeight: 380,
  },
  inputGroup: {
    marginBottom: Spacing.md,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
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
  inputError: {
    borderColor: Colors.danger,
    backgroundColor: '#FEF2F2',
  },
  errorText: {
    color: Colors.danger,
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },
  textArea: {
    minHeight: 70,
  },
  pillRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  pill: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: Radius.md,
    backgroundColor: Colors.surfaceVariant,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  activePill: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  pillText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  activePillText: {
    color: '#FFFFFF',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginTop: Spacing.lg,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surface,
  },
  cancelText: {
    fontSize: 14,
    fontWeight: '600',
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
  },
  disabledButton: {
    opacity: 0.65,
  },
  submitText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

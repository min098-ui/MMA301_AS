import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  onSnapshot,
  query,
  orderBy,
  Unsubscribe,
  DocumentData,
  QuerySnapshot,
} from 'firebase/firestore';
import { db } from './firebase';
import { Task, CreateTaskInput, UpdateTaskInput } from '../types/task';

export const TASKS_COLLECTION = 'tasks';

/**
 * Maps Firestore document snapshot to Task object
 */
export const mapDocToTask = (id: string, data: DocumentData): Task => {
  return {
    id,
    title: data.title || '',
    description: data.description || '',
    status: data.status || 'To Do',
    priority: data.priority || 'Medium',
    dueDate: data.dueDate || new Date().toISOString().split('T')[0],
    createdAt: data.createdAt?.toDate
      ? data.createdAt.toDate().toISOString()
      : data.createdAt || new Date().toISOString(),
    teamId: data.teamId ?? null,
    assigneeId: data.assigneeId ?? null,
  };
};

/**
 * Real-time listener for tasks collection, ordered by createdAt descending
 */
export const subscribeToTasks = (
  onNext: (tasks: Task[]) => void,
  onError?: (error: Error) => void,
): Unsubscribe => {
  try {
    const tasksRef = collection(db, TASKS_COLLECTION);
    const q = query(tasksRef, orderBy('createdAt', 'desc'));

    return onSnapshot(
      q,
      (snapshot: QuerySnapshot<DocumentData>) => {
        const tasks: Task[] = snapshot.docs.map((docSnap) =>
          mapDocToTask(docSnap.id, docSnap.data()),
        );
        onNext(tasks);
      },
      (error) => {
        console.error('Error listening to tasks from Firestore:', error);
        // Fallback: try querying without orderBy in case index is pending
        try {
          return onSnapshot(
            tasksRef,
            (snapshot) => {
              const tasks: Task[] = snapshot.docs.map((docSnap) =>
                mapDocToTask(docSnap.id, docSnap.data()),
              );
              onNext(tasks);
            },
            (fallbackErr) => {
              if (onError) onError(fallbackErr);
            },
          );
        } catch {
          if (onError) onError(error);
        }
      },
    );
  } catch (err: any) {
    console.error('Failed to set up tasks snapshot listener:', err);
    if (onError) onError(err);
    return () => {};
  }
};

/**
 * Fetch all tasks once (non-realtime)
 */
export const fetchTasks = async (): Promise<Task[]> => {
  const tasksRef = collection(db, TASKS_COLLECTION);
  const q = query(tasksRef, orderBy('createdAt', 'desc'));
  try {
    const snapshot = await getDocs(q);
    return snapshot.docs.map((docSnap) => mapDocToTask(docSnap.id, docSnap.data()));
  } catch (err) {
    console.warn('Fallback fetching tasks without orderBy:', err);
    const snapshot = await getDocs(tasksRef);
    return snapshot.docs.map((docSnap) => mapDocToTask(docSnap.id, docSnap.data()));
  }
};

/**
 * Create a new task document in Firestore
 */
export const createTask = async (input: CreateTaskInput): Promise<string> => {
  const tasksRef = collection(db, TASKS_COLLECTION);
  const newTaskDoc = {
    title: input.title.trim(),
    description: input.description?.trim() || '',
    status: input.status || 'To Do',
    priority: input.priority || 'Medium',
    dueDate: input.dueDate || new Date().toISOString().split('T')[0],
    createdAt: new Date().toISOString(),
    teamId: input.teamId ?? null,
    assigneeId: input.assigneeId ?? null,
  };

  const docRef = await addDoc(tasksRef, newTaskDoc);
  return docRef.id;
};

/**
 * Update an existing task document in Firestore
 */
export const updateTask = async (id: string, updates: UpdateTaskInput): Promise<void> => {
  const taskRef = doc(db, TASKS_COLLECTION, id);
  const cleanUpdates: Record<string, any> = {};

  if (updates.title !== undefined) cleanUpdates.title = updates.title.trim();
  if (updates.description !== undefined) cleanUpdates.description = updates.description.trim();
  if (updates.status !== undefined) cleanUpdates.status = updates.status;
  if (updates.priority !== undefined) cleanUpdates.priority = updates.priority;
  if (updates.dueDate !== undefined) cleanUpdates.dueDate = updates.dueDate;
  if (updates.teamId !== undefined) cleanUpdates.teamId = updates.teamId;
  if (updates.assigneeId !== undefined) cleanUpdates.assigneeId = updates.assigneeId;

  await updateDoc(taskRef, cleanUpdates);
};

/**
 * Delete a task document from Firestore
 */
export const deleteTask = async (id: string): Promise<void> => {
  const taskRef = doc(db, TASKS_COLLECTION, id);
  await deleteDoc(taskRef);
};

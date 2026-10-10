import {
  collection,
  doc,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  Unsubscribe,
  DocumentData,
  QuerySnapshot
} from 'firebase/firestore';
import { db } from './firebase';

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  createdAt: number;
}

export const chatService = {
  sendMessage: async (teamId: string, senderId: string, senderName: string, text: string): Promise<void> => {
    const messagesRef = collection(db, 'teams', teamId, 'messages');
    await addDoc(messagesRef, {
      senderId,
      senderName,
      text,
      createdAt: Date.now(),
    });
  },

  subscribeToMessages: (
    teamId: string,
    onNext: (messages: ChatMessage[]) => void
  ): Unsubscribe => {
    const messagesRef = collection(db, 'teams', teamId, 'messages');
    const q = query(messagesRef, orderBy('createdAt', 'asc'));

    return onSnapshot(
      q,
      (snapshot: QuerySnapshot<DocumentData>) => {
        const messages: ChatMessage[] = snapshot.docs.map(docSnap => ({
          id: docSnap.id,
          ...docSnap.data(),
        } as ChatMessage));
        onNext(messages);
      },
      (error) => {
        console.error('Error listening to messages:', error);
      }
    );
  }
};

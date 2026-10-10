import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { chatService, ChatMessage } from '../services/chatService';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Spacing, Radius, Shadows } from '../constants/theme';

export const ChatScreen: React.FC<{ route: any; navigation: any }> = ({ route, navigation }) => {
  const { teamId, teamName } = route.params;
  const { colors } = useTheme();
  const { user, userProfile } = useAuth();
  
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(true);
  
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const unsubscribe = chatService.subscribeToMessages(teamId, (fetchedMsgs) => {
      setMessages(fetchedMsgs);
      setLoading(false);
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    });
    return () => unsubscribe();
  }, [teamId]);

  const handleSend = async () => {
    if (!inputText.trim() || !user) return;
    
    const textToSend = inputText.trim();
    setInputText(''); // Optimistic clear
    
    try {
      await chatService.sendMessage(teamId, user.uid, userProfile?.name || user.email || 'User', textToSend);
    } catch (error) {
      console.error('Failed to send message', error);
      // Might want to restore input if failed
    }
  };

  const renderMessage = ({ item }: { item: ChatMessage }) => {
    const isMe = item.senderId === user?.uid;
    
    return (
      <View style={[styles.messageWrapper, isMe ? styles.messageWrapperMe : styles.messageWrapperOther]}>
        {!isMe && (
          <Text style={[styles.senderName, { color: colors.textSecondary }]}>{item.senderName}</Text>
        )}
        <View 
          style={[
            styles.messageBubble, 
            isMe ? [styles.messageBubbleMe, { backgroundColor: colors.primary }] 
                 : [styles.messageBubbleOther, { backgroundColor: colors.surface, borderColor: colors.border }]
          ]}
        >
          <Text style={[styles.messageText, { color: isMe ? '#fff' : colors.textPrimary }]}>{item.text}</Text>
        </View>
        <Text style={[styles.timeText, { color: colors.textMuted }, isMe && { textAlign: 'right' }]}>
          {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]} edges={['top', 'bottom']}>
      <View style={[styles.header, { borderBottomColor: colors.borderLight }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.textPrimary }]}>{teamName} Chat</Text>
      </View>

      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {loading ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : (
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={item => item.id}
            renderItem={renderMessage}
            contentContainerStyle={styles.listContainer}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
            onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
          />
        )}

        <View style={[styles.inputContainer, { backgroundColor: colors.surface, borderTopColor: colors.borderLight }]}>
          <TextInput
            style={[styles.input, { backgroundColor: colors.background, color: colors.textPrimary, borderColor: colors.border }]}
            placeholder="Type a message..."
            placeholderTextColor={colors.textMuted}
            value={inputText}
            onChangeText={setInputText}
            multiline
          />
          <TouchableOpacity 
            style={[styles.sendBtn, { backgroundColor: inputText.trim() ? colors.primary : colors.surfaceVariant }]}
            onPress={handleSend}
            disabled={!inputText.trim()}
          >
            <Ionicons name="send" size={18} color={inputText.trim() ? '#fff' : colors.textMuted} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', padding: Spacing.md, borderBottomWidth: 1 },
  backBtn: { padding: Spacing.xs, marginRight: Spacing.sm },
  title: { flex: 1, fontSize: 18, fontWeight: '700' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  listContainer: { padding: Spacing.md, paddingBottom: Spacing.xl },
  messageWrapper: { marginBottom: Spacing.md, maxWidth: '80%' },
  messageWrapperMe: { alignSelf: 'flex-end' },
  messageWrapperOther: { alignSelf: 'flex-start' },
  senderName: { fontSize: 11, marginBottom: 2, marginLeft: 4 },
  messageBubble: { padding: Spacing.md, borderRadius: Radius.lg },
  messageBubbleMe: { borderBottomRightRadius: 4 },
  messageBubbleOther: { borderBottomLeftRadius: 4, borderWidth: 1 },
  messageText: { fontSize: 15, lineHeight: 20 },
  timeText: { fontSize: 10, marginTop: 4, marginHorizontal: 4 },
  inputContainer: { flexDirection: 'row', alignItems: 'flex-end', padding: Spacing.md, borderTopWidth: 1 },
  input: { flex: 1, minHeight: 40, maxHeight: 100, borderWidth: 1, borderRadius: Radius.md, paddingHorizontal: Spacing.md, paddingTop: 10, paddingBottom: 10, fontSize: 15, marginRight: Spacing.sm },
  sendBtn: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
});

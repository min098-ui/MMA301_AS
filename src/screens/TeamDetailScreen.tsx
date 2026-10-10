import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { teamService } from '../services/teamService';
import { subscribeToTeamTasks } from '../services/taskService';
import { TeamMember } from '../types/team';
import { Task } from '../types/task';
import { UserProfile } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Spacing, Radius, Shadows } from '../constants/theme';

export const TeamDetailScreen: React.FC<{ route: any; navigation: any }> = ({ route, navigation }) => {
  const { teamId, teamName } = route.params;
  const { colors } = useTheme();
  
  const [members, setMembers] = useState<(TeamMember & { user?: UserProfile })[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loadingMembers, setLoadingMembers] = useState(true);
  const [loadingTasks, setLoadingTasks] = useState(true);

  useEffect(() => {
    const unsubscribeMembers = teamService.getTeamMembers(teamId, (fetchedMembers) => {
      setMembers(fetchedMembers);
      setLoadingMembers(false);
    });

    const unsubscribeTasks = subscribeToTeamTasks(teamId, (fetchedTasks) => {
      setTasks(fetchedTasks);
      setLoadingTasks(false);
    });

    return () => {
      unsubscribeMembers();
      unsubscribeTasks();
    };
  }, [teamId]);

  const renderMember = ({ item }: { item: TeamMember & { user?: UserProfile } }) => (
    <View style={[styles.memberCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <View style={[styles.avatar, { backgroundColor: colors.primaryLight }]}>
        <Text style={{ color: colors.primary, fontWeight: '700' }}>
          {item.user?.name?.charAt(0).toUpperCase() || 'U'}
        </Text>
      </View>
      <View style={styles.memberInfo}>
        <Text style={[styles.memberName, { color: colors.textPrimary }]}>{item.user?.name || 'Unknown User'}</Text>
        <Text style={[styles.memberRole, { color: colors.textSecondary }]}>{item.role}</Text>
      </View>
    </View>
  );

  const renderTask = ({ item }: { item: Task }) => {
    const assignee = members.find(m => m.userId === item.assigneeId)?.user;
    return (
      <View style={[styles.taskCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <View style={styles.taskHeader}>
          <Text style={[styles.taskTitle, { color: colors.textPrimary }]}>{item.title}</Text>
          <View style={[styles.statusBadge, { backgroundColor: colors.surfaceVariant }]}>
            <Text style={[styles.statusText, { color: colors.textMuted }]}>{item.status}</Text>
          </View>
        </View>
        <Text style={[styles.taskDesc, { color: colors.textSecondary }]} numberOfLines={2}>{item.description}</Text>
        {assignee && (
          <View style={styles.assigneeRow}>
            <Ionicons name="person" size={12} color={colors.primary} />
            <Text style={[styles.assigneeText, { color: colors.primary }]}>{assignee.name}</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.textPrimary }]}>{teamName}</Text>
        <TouchableOpacity 
          style={styles.chatBtn}
          onPress={() => navigation.navigate('Chat', { teamId, teamName })}
        >
          <Ionicons name="chatbubbles" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={[{ type: 'header' }, { type: 'members' }, { type: 'tasks' }]}
        keyExtractor={item => item.type}
        renderItem={({ item }) => {
          if (item.type === 'header') {
            return (
              <View style={styles.section}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.xs }}>
                  <Text style={[styles.sectionTitle, { color: colors.textPrimary, marginBottom: 0 }]}>Team Members</Text>
                  <Text style={{ color: colors.textSecondary, fontSize: 12, fontFamily: 'monospace' }} selectable>ID: {teamId}</Text>
                </View>
              </View>
            );
          } else if (item.type === 'members') {
            if (loadingMembers) return <ActivityIndicator style={styles.loader} color={colors.primary} />;
            return (
              <FlatList
                horizontal
                data={members}
                keyExtractor={m => m.userId}
                renderItem={renderMember}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.membersList}
              />
            );
          } else if (item.type === 'tasks') {
            return (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Team Tasks</Text>
                </View>
                {loadingTasks ? (
                  <ActivityIndicator style={styles.loader} color={colors.primary} />
                ) : tasks.length === 0 ? (
                  <Text style={[styles.emptyText, { color: colors.textSecondary }]}>No tasks yet.</Text>
                ) : (
                  tasks.map(task => <React.Fragment key={task.id}>{renderTask({ item: task })}</React.Fragment>)
                )}
              </View>
            );
          }
          return null;
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', padding: Spacing.md, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.05)' },
  backBtn: { padding: Spacing.xs, marginRight: Spacing.sm },
  title: { flex: 1, fontSize: 18, fontWeight: '700' },
  chatBtn: { padding: Spacing.xs },
  section: { padding: Spacing.lg, paddingTop: Spacing.md },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.sm },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: Spacing.xs },
  loader: { marginVertical: Spacing.xl },
  membersList: { paddingHorizontal: Spacing.lg, paddingBottom: Spacing.lg },
  memberCard: { flexDirection: 'row', alignItems: 'center', padding: Spacing.sm, paddingRight: Spacing.lg, borderRadius: Radius.full, borderWidth: 1, marginRight: Spacing.md },
  avatar: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center', marginRight: Spacing.sm },
  memberInfo: { justifyContent: 'center' },
  memberName: { fontSize: 14, fontWeight: '600' },
  memberRole: { fontSize: 12 },
  taskCard: { padding: Spacing.md, borderRadius: Radius.lg, borderWidth: 1, marginBottom: Spacing.md, ...Shadows.card },
  taskHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: Spacing.xs },
  taskTitle: { fontSize: 15, fontWeight: '600', flex: 1, marginRight: Spacing.sm },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: Radius.sm },
  statusText: { fontSize: 11, fontWeight: '600', textTransform: 'uppercase' },
  taskDesc: { fontSize: 13, marginBottom: Spacing.sm },
  assigneeRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  assigneeText: { fontSize: 12, fontWeight: '500' },
  emptyText: { textAlign: 'center', marginVertical: Spacing.xl, fontStyle: 'italic' },
});

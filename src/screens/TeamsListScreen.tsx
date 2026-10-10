import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { teamService } from '../services/teamService';
import { Team } from '../types/team';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import { Spacing, Radius, Shadows } from '../constants/theme';

export const TeamsListScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { colors } = useTheme();
  const { user } = useAuth();
  const { showToast } = useToast();
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  const [isCreateModalVisible, setCreateModalVisible] = useState(false);
  const [isJoinModalVisible, setJoinModalVisible] = useState(false);
  const [newTeamName, setNewTeamName] = useState('');
  const [newTeamDesc, setNewTeamDesc] = useState('');
  const [joinTeamId, setJoinTeamId] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    const unsubscribe = teamService.getUserTeams(user.uid, (fetchedTeams) => {
      setTeams(fetchedTeams);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [user]);

  const handleCreateTeam = async () => {
    if (!newTeamName) {
      showToast('Team name is required', 'error');
      return;
    }
    setActionLoading(true);
    try {
      await teamService.createTeam(newTeamName, newTeamDesc, user!.uid);
      showToast('Team created successfully', 'success');
      setCreateModalVisible(false);
      setNewTeamName('');
      setNewTeamDesc('');
    } catch (error: any) {
      showToast(error.message, 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleJoinTeam = async () => {
    if (!joinTeamId) {
      showToast('Team ID is required', 'error');
      return;
    }
    setActionLoading(true);
    try {
      await teamService.joinTeam(joinTeamId, user!.uid);
      showToast('Joined team successfully', 'success');
      setJoinModalVisible(false);
      setJoinTeamId('');
    } catch (error: any) {
      showToast(error.message, 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const renderTeamItem = ({ item }: { item: Team }) => (
    <TouchableOpacity 
      style={[styles.teamCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
      onPress={() => navigation.navigate('TeamDetail', { teamId: item.id, teamName: item.name })}
    >
      <View style={styles.teamHeader}>
        <Text style={[styles.teamName, { color: colors.textPrimary }]}>{item.name}</Text>
        <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
      </View>
      <Text style={[styles.teamDesc, { color: colors.textSecondary }]}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>My Teams</Text>
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity 
          style={[styles.actionBtn, { backgroundColor: colors.primaryLight, borderColor: colors.primarySoft }]}
          onPress={() => setCreateModalVisible(true)}
        >
          <Ionicons name="add-circle" size={20} color={colors.primary} />
          <Text style={[styles.actionBtnText, { color: colors.primary }]}>Create Team</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.actionBtn, { backgroundColor: colors.surfaceVariant, borderColor: colors.border }]}
          onPress={() => setJoinModalVisible(true)}
        >
          <Ionicons name="enter" size={20} color={colors.textPrimary} />
          <Text style={[styles.actionBtnText, { color: colors.textPrimary }]}>Join Team</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <FlatList
          data={teams}
          keyExtractor={(item) => item.id}
          renderItem={renderTeamItem}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="people-outline" size={48} color={colors.textMuted} />
              <Text style={[styles.emptyText, { color: colors.textSecondary }]}>You don&apos;t belong to any teams yet.</Text>
            </View>
          }
        />
      )}

      {/* Create Team Modal */}
      <Modal visible={isCreateModalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            <Text style={[styles.modalTitle, { color: colors.textPrimary }]}>Create New Team</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.background, color: colors.textPrimary, borderColor: colors.border }]}
              placeholder="Team Name"
              placeholderTextColor={colors.textMuted}
              value={newTeamName}
              onChangeText={setNewTeamName}
            />
            <TextInput
              style={[styles.input, { backgroundColor: colors.background, color: colors.textPrimary, borderColor: colors.border }]}
              placeholder="Description (Optional)"
              placeholderTextColor={colors.textMuted}
              value={newTeamDesc}
              onChangeText={setNewTeamDesc}
            />
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalBtn} onPress={() => setCreateModalVisible(false)}>
                <Text style={{ color: colors.textSecondary }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalBtnPrimary, { backgroundColor: colors.primary }]} 
                onPress={handleCreateTeam}
                disabled={actionLoading}
              >
                {actionLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.modalBtnTextPrimary}>Create</Text>}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Join Team Modal */}
      <Modal visible={isJoinModalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            <Text style={[styles.modalTitle, { color: colors.textPrimary }]}>Join Team</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.background, color: colors.textPrimary, borderColor: colors.border }]}
              placeholder="Team ID"
              placeholderTextColor={colors.textMuted}
              value={joinTeamId}
              onChangeText={setJoinTeamId}
            />
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalBtn} onPress={() => setJoinModalVisible(false)}>
                <Text style={{ color: colors.textSecondary }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalBtnPrimary, { backgroundColor: colors.primary }]} 
                onPress={handleJoinTeam}
                disabled={actionLoading}
              >
                {actionLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.modalBtnTextPrimary}>Join</Text>}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  header: { padding: Spacing.lg, paddingBottom: Spacing.sm },
  title: { fontSize: 24, fontWeight: '800' },
  actionsRow: { flexDirection: 'row', paddingHorizontal: Spacing.lg, gap: Spacing.md, marginBottom: Spacing.md },
  actionBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: Spacing.md, borderRadius: Radius.md, borderWidth: 1, gap: 8 },
  actionBtnText: { fontWeight: '600', fontSize: 14 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  listContainer: { padding: Spacing.lg },
  teamCard: { padding: Spacing.lg, borderRadius: Radius.lg, borderWidth: 1, marginBottom: Spacing.md, ...Shadows.card },
  teamHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.xs },
  teamName: { fontSize: 16, fontWeight: '700' },
  teamDesc: { fontSize: 13, lineHeight: 18 },
  emptyContainer: { alignItems: 'center', marginTop: Spacing.xxl },
  emptyText: { marginTop: Spacing.md, fontSize: 14 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: Spacing.xl },
  modalContent: { borderRadius: Radius.lg, padding: Spacing.xl, ...Shadows.card },
  modalTitle: { fontSize: 18, fontWeight: '700', marginBottom: Spacing.lg },
  input: { height: 48, borderWidth: 1, borderRadius: Radius.md, paddingHorizontal: Spacing.md, marginBottom: Spacing.md },
  modalActions: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: Spacing.md, gap: Spacing.md },
  modalBtn: { padding: Spacing.md, justifyContent: 'center' },
  modalBtnPrimary: { paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md, borderRadius: Radius.md, justifyContent: 'center' },
  modalBtnTextPrimary: { color: '#fff', fontWeight: '600' }
});

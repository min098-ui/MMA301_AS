import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { AxolotlLogo } from '../components/AxolotlLogo';
import { useLanguage } from '../context/LanguageContext';
import { Colors, Spacing, Radius, Shadows } from '../constants/theme';

export const TeamsScreen: React.FC = () => {
  const { t } = useLanguage();

  const mockMembers = [
    {
      name: 'Nguyen Tuong Vy',
      role: 'Lead Architect',
      status: 'Active Now',
      color: Colors.primary,
      icon: 'person-circle' as const,
    },
    {
      name: 'Cloud Firestore Bot',
      role: 'Realtime Sync Engine',
      status: 'Listening onSnapshot',
      color: Colors.accent,
      icon: 'sync-circle' as const,
    },
    {
      name: 'Team Workspace QA',
      role: 'Exam 2 Collaborator',
      status: 'Invited',
      color: Colors.priorityMed,
      icon: 'time' as const,
    },
  ];

  const upcomingFeatures = [
    {
      icon: 'people' as const,
      title: t.featWorkspaceTitle,
      description: t.featWorkspaceDesc,
    },
    {
      icon: 'person-add' as const,
      title: t.featAssignTitle,
      description: t.featAssignDesc,
    },
    {
      icon: 'shield-checkmark' as const,
      title: t.featPermsTitle,
      description: t.featPermsDesc,
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Workspace Brand Card */}
        <View style={styles.brandCard}>
          <AxolotlLogo size={68} showOnlineBadge={true} />
          <Text style={styles.title}>{t.teamsTitle}</Text>
          <Text style={styles.subtitle}>{t.teamsSubtitle}</Text>

          <View style={styles.badge}>
            <Ionicons name="snow" size={12} color={Colors.primary} />
            <View style={styles.liveDot} />
            <Text style={styles.badgeText}>{t.teamsMilestone}</Text>
          </View>
        </View>

        {/* Active Workspace Members */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardHeader}>Workspace Members</Text>
            <View style={styles.countChip}>
              <Text style={styles.countChipText}>3 Members</Text>
            </View>
          </View>

          {mockMembers.map((member, idx) => (
            <View
              key={idx}
              style={[
                styles.memberRow,
                idx === mockMembers.length - 1 && { borderBottomWidth: 0, paddingBottom: 0 },
              ]}
            >
              <View style={[styles.avatarBox, { backgroundColor: member.color + '15' }]}>
                <Ionicons name={member.icon} size={22} color={member.color} />
              </View>
              <View style={styles.memberInfo}>
                <Text style={styles.memberName}>{member.name}</Text>
                <Text style={styles.memberRole}>{member.role}</Text>
              </View>
              <View style={styles.statusPill}>
                <Text style={styles.statusPillText}>{member.status}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Exam 2 Features Roadmap */}
        <View style={styles.card}>
          <Text style={styles.cardHeader}>{t.teamsMilestone} – Enterprise Roadmap</Text>
          {upcomingFeatures.map((feat, idx) => (
            <View key={idx} style={styles.featureItem}>
              <View style={styles.featIconBox}>
                <Ionicons name={feat.icon} size={20} color={Colors.primary} />
              </View>
              <View style={styles.featTextBox}>
                <Text style={styles.featTitle}>{feat.title}</Text>
                <Text style={styles.featDesc}>{feat.description}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    padding: Spacing.lg,
    alignItems: 'center',
    paddingBottom: 40,
  },
  brandCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.xl,
    alignItems: 'center',
    width: '100%',
    maxWidth: 520,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.md,
    ...Shadows.card,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginTop: Spacing.md,
    marginBottom: 4,
    textAlign: 'center',
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 19,
    marginBottom: Spacing.md,
    maxWidth: 360,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.primarySoft,
    gap: 6,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    width: '100%',
    maxWidth: 520,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.md,
    ...Shadows.card,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  cardHeader: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: Spacing.md,
  },
  countChip: {
    backgroundColor: Colors.surfaceVariant,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: Radius.full,
  },
  countChipText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  avatarBox: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  memberRole: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  statusPill: {
    backgroundColor: Colors.surfaceVariant,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.full,
  },
  statusPillText: {
    fontSize: 11,
    color: Colors.textMuted,
    fontWeight: '500',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  featIconBox: {
    width: 36,
    height: 36,
    borderRadius: Radius.md,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  featTextBox: {
    flex: 1,
  },
  featTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  featDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
    lineHeight: 17,
  },
});

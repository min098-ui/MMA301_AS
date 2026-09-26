import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { AxolotlLogo } from '../components/AxolotlLogo';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { Spacing, Radius, Shadows } from '../constants/theme';

export const TeamsScreen: React.FC = () => {
  const { t } = useLanguage();
  const { colors, theme } = useTheme();

  const mockMembers = [
    {
      name: 'Nguyen Tuong Vy',
      role: 'Lead Architect',
      status: 'Active Now',
      color: colors.primary,
      icon: 'person-circle' as const,
    },
    {
      name: 'Cloud Firestore Bot',
      role: 'Realtime Sync Engine',
      status: 'Listening onSnapshot',
      color: colors.accent,
      icon: 'sync-circle' as const,
    },
    {
      name: 'Team Workspace QA',
      role: 'Exam 2 Collaborator',
      status: 'Invited',
      color: colors.priorityMed,
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
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Workspace Brand Card */}
        <View style={[styles.brandCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <AxolotlLogo size={68} showOnlineBadge={true} />
          <Text style={[styles.title, { color: colors.textPrimary }]}>{t.teamsTitle}</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>{t.teamsSubtitle}</Text>

          <View style={[styles.badge, { backgroundColor: colors.primaryLight, borderColor: colors.primarySoft }]}>
            <Ionicons name={theme.icon as any} size={12} color={colors.primary} />
            <View style={[styles.liveDot, { backgroundColor: colors.primary }]} />
            <Text style={[styles.badgeText, { color: colors.primary }]}>{t.teamsMilestone}</Text>
          </View>
        </View>

        {/* Active Workspace Members */}
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.cardHeaderRow}>
            <Text style={[styles.cardHeader, { color: colors.textPrimary }]}>Workspace Members</Text>
            <View style={[styles.countChip, { backgroundColor: colors.surfaceVariant }]}>
              <Text style={[styles.countChipText, { color: colors.textSecondary }]}>3 Members</Text>
            </View>
          </View>

          {mockMembers.map((member, idx) => (
            <View
              key={idx}
              style={[
                styles.memberRow,
                { borderBottomColor: colors.borderLight },
                idx === mockMembers.length - 1 && { borderBottomWidth: 0, paddingBottom: 0 },
              ]}
            >
              <View style={[styles.avatarBox, { backgroundColor: member.color + '15' }]}>
                <Ionicons name={member.icon} size={22} color={member.color} />
              </View>
              <View style={styles.memberInfo}>
                <Text style={[styles.memberName, { color: colors.textPrimary }]}>{member.name}</Text>
                <Text style={[styles.memberRole, { color: colors.textSecondary }]}>{member.role}</Text>
              </View>
              <View style={[styles.statusPill, { backgroundColor: colors.surfaceVariant }]}>
                <Text style={[styles.statusPillText, { color: colors.textMuted }]}>{member.status}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Exam 2 Features Roadmap */}
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.cardHeader, { color: colors.textPrimary }]}>
            {t.teamsMilestone} – Enterprise Roadmap
          </Text>
          {upcomingFeatures.map((feat, idx) => (
            <View key={idx} style={styles.featureItem}>
              <View style={[styles.featIconBox, { backgroundColor: colors.primaryLight }]}>
                <Ionicons name={feat.icon} size={20} color={colors.primary} />
              </View>
              <View style={styles.featTextBox}>
                <Text style={[styles.featTitle, { color: colors.textPrimary }]}>{feat.title}</Text>
                <Text style={[styles.featDesc, { color: colors.textSecondary }]}>{feat.description}</Text>
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
  },
  container: {
    padding: Spacing.lg,
    alignItems: 'center',
    paddingBottom: 40,
  },
  brandCard: {
    borderRadius: Radius.lg,
    padding: Spacing.xl,
    alignItems: 'center',
    width: '100%',
    maxWidth: 520,
    borderWidth: 1,
    marginBottom: Spacing.md,
    ...Shadows.card,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    marginTop: Spacing.md,
    marginBottom: 4,
    textAlign: 'center',
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 19,
    marginBottom: Spacing.md,
    maxWidth: 360,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: Radius.full,
    borderWidth: 1,
    gap: 6,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  card: {
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    width: '100%',
    maxWidth: 520,
    borderWidth: 1,
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
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: Spacing.md,
  },
  countChip: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: Radius.full,
  },
  countChipText: {
    fontSize: 11,
    fontWeight: '600',
  },
  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
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
  },
  memberRole: {
    fontSize: 12,
    marginTop: 1,
  },
  statusPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.full,
  },
  statusPillText: {
    fontSize: 11,
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
  },
  featDesc: {
    fontSize: 12,
    marginTop: 2,
    lineHeight: 17,
  },
});

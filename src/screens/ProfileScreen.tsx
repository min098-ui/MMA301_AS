import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { AxolotlLogo } from '../components/AxolotlLogo';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { Spacing, Radius, Shadows } from '../constants/theme';
import { isFirebaseConfigured } from '../services/firebaseConfig';

export const ProfileScreen: React.FC = () => {
  const { t } = useLanguage();
  const { colors, theme } = useTheme();
  const firebaseConnected = isFirebaseConfigured();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* User Profile Card */}
        <View style={[styles.profileCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <AxolotlLogo size={76} showOnlineBadge={true} />
          <Text style={[styles.userName, { color: colors.textPrimary }]}>{t.profileTitle}</Text>
          <Text style={[styles.userRole, { color: colors.textSecondary }]}>{t.profileRole}</Text>

          <View style={[styles.badge, { backgroundColor: colors.primaryLight, borderColor: colors.primarySoft }]}>
            <Ionicons name={theme.icon as any} size={12} color={colors.primary} />
            <View style={[styles.liveDot, { backgroundColor: colors.primary }]} />
            <Text style={[styles.badgeText, { color: colors.primary }]}>{t.profileTag}</Text>
          </View>
        </View>

        {/* Database & System Architecture Card */}
        <View style={[styles.infoCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>{t.profileSystem}</Text>

          <View style={[styles.infoRow, { borderBottomColor: colors.borderLight }]}>
            <View style={styles.infoLabelGroup}>
              <Ionicons name="cloud-done" size={18} color={colors.primary} />
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>{t.profileDb}</Text>
            </View>
            <View style={styles.statusPill}>
              <View style={[styles.statusDot, { backgroundColor: colors.success }]} />
              <Text
                style={[
                  styles.infoValue,
                  { color: firebaseConnected ? colors.success : colors.statusInProgress },
                ]}
              >
                {firebaseConnected ? t.profileConnected : 'Test Mode'}
              </Text>
            </View>
          </View>

          <View style={[styles.infoRow, { borderBottomColor: colors.borderLight }]}>
            <View style={styles.infoLabelGroup}>
              <Ionicons name="shield-checkmark" size={18} color={colors.primary} />
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>{t.profileAuth}</Text>
            </View>
            <Text style={[styles.infoValue, { color: colors.textPrimary }]}>{t.profilePublic}</Text>
          </View>

          <View style={[styles.infoRow, { borderBottomColor: colors.borderLight }]}>
            <View style={styles.infoLabelGroup}>
              <Ionicons name="layers" size={18} color={colors.primary} />
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Architecture</Text>
            </View>
            <Text style={[styles.infoValue, { color: colors.textPrimary }]}>onSnapshot + Optimistic UI</Text>
          </View>

          <View style={[styles.infoRow, { borderBottomColor: colors.borderLight }]}>
            <View style={styles.infoLabelGroup}>
              <Ionicons name="phone-portrait" size={18} color={colors.primary} />
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Mobile Framework</Text>
            </View>
            <Text style={[styles.infoValue, { color: colors.textPrimary }]}>React Native + Expo SDK 57</Text>
          </View>

          <View style={[styles.infoRow, { borderBottomWidth: 0 }]}>
            <View style={styles.infoLabelGroup}>
              <Ionicons name="git-commit" size={18} color={colors.primary} />
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Milestone</Text>
            </View>
            <Text style={[styles.infoValue, { color: colors.textPrimary }]}>Practical Exam 1 Foundation</Text>
          </View>
        </View>

        {/* Exam 2 Notice */}
        <View style={[styles.noticeBox, { backgroundColor: colors.primaryLight, borderColor: colors.primarySoft }]}>
          <Ionicons name="sparkles" size={20} color={colors.primary} />
          <Text style={[styles.noticeText, { color: colors.textSecondary }]}>
            User authentication, avatar management, and workspace collaboration will be integrated
            in Practical Exam 2.
          </Text>
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
  profileCard: {
    borderRadius: Radius.lg,
    padding: Spacing.xl,
    alignItems: 'center',
    width: '100%',
    maxWidth: 520,
    borderWidth: 1,
    marginBottom: Spacing.md,
    ...Shadows.card,
  },
  userName: {
    fontSize: 19,
    fontWeight: '800',
    marginTop: Spacing.md,
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  userRole: {
    fontSize: 13,
    marginBottom: Spacing.sm,
    textAlign: 'center',
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
  },
  infoCard: {
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    width: '100%',
    maxWidth: 520,
    borderWidth: 1,
    marginBottom: Spacing.md,
    ...Shadows.card,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: Spacing.md,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 11,
    borderBottomWidth: 1,
  },
  infoLabelGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoLabel: {
    fontSize: 13,
    fontWeight: '500',
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  infoValue: {
    fontSize: 13,
    fontWeight: '600',
  },
  noticeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Radius.md,
    padding: Spacing.md,
    width: '100%',
    maxWidth: 520,
    borderWidth: 1,
    gap: 10,
  },
  noticeText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
  },
});

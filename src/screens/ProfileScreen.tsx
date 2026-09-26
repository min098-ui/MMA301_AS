import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { AxolotlLogo } from '../components/AxolotlLogo';
import { useLanguage } from '../context/LanguageContext';
import { Colors, Spacing, Radius, Shadows } from '../constants/theme';
import { isFirebaseConfigured } from '../services/firebaseConfig';

export const ProfileScreen: React.FC = () => {
  const { t } = useLanguage();
  const firebaseConnected = isFirebaseConfigured();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* User Profile Card */}
        <View style={styles.profileCard}>
          <AxolotlLogo size={76} showOnlineBadge={true} />
          <Text style={styles.userName}>{t.profileTitle}</Text>
          <Text style={styles.userRole}>{t.profileRole}</Text>

          <View style={styles.badge}>
            <View style={styles.liveDot} />
            <Text style={styles.badgeText}>{t.profileTag}</Text>
          </View>
        </View>

        {/* Database & System Architecture Card */}
        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>{t.profileSystem}</Text>

          <View style={styles.infoRow}>
            <View style={styles.infoLabelGroup}>
              <Ionicons name="cloud-done" size={18} color={Colors.primary} />
              <Text style={styles.infoLabel}>{t.profileDb}</Text>
            </View>
            <View style={styles.statusPill}>
              <View style={[styles.statusDot, { backgroundColor: Colors.success }]} />
              <Text
                style={[
                  styles.infoValue,
                  { color: firebaseConnected ? Colors.success : Colors.statusInProgress },
                ]}
              >
                {firebaseConnected ? t.profileConnected : 'Test Mode'}
              </Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoLabelGroup}>
              <Ionicons name="shield-checkmark" size={18} color={Colors.primary} />
              <Text style={styles.infoLabel}>{t.profileAuth}</Text>
            </View>
            <Text style={styles.infoValue}>{t.profilePublic}</Text>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoLabelGroup}>
              <Ionicons name="layers" size={18} color={Colors.primary} />
              <Text style={styles.infoLabel}>Architecture</Text>
            </View>
            <Text style={styles.infoValue}>onSnapshot + Optimistic UI</Text>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoLabelGroup}>
              <Ionicons name="phone-portrait" size={18} color={Colors.primary} />
              <Text style={styles.infoLabel}>Mobile Framework</Text>
            </View>
            <Text style={styles.infoValue}>React Native + Expo SDK 57</Text>
          </View>

          <View style={[styles.infoRow, { borderBottomWidth: 0 }]}>
            <View style={styles.infoLabelGroup}>
              <Ionicons name="git-commit" size={18} color={Colors.primary} />
              <Text style={styles.infoLabel}>Milestone</Text>
            </View>
            <Text style={styles.infoValue}>Practical Exam 1 Foundation</Text>
          </View>
        </View>

        {/* Exam 2 Notice */}
        <View style={styles.noticeBox}>
          <Ionicons name="sparkles" size={20} color={Colors.primary} />
          <Text style={styles.noticeText}>
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
    backgroundColor: Colors.background,
  },
  container: {
    padding: Spacing.lg,
    alignItems: 'center',
    paddingBottom: 40,
  },
  profileCard: {
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
  userName: {
    fontSize: 19,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginTop: Spacing.md,
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  userRole: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
    textAlign: 'center',
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
    backgroundColor: Colors.success,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primary,
  },
  infoCard: {
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
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textSecondary,
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
    borderBottomColor: Colors.borderLight,
  },
  infoLabelGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
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
    color: Colors.textPrimary,
  },
  noticeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryLight,
    borderRadius: Radius.md,
    padding: Spacing.md,
    width: '100%',
    maxWidth: 520,
    borderWidth: 1,
    borderColor: Colors.primarySoft,
    gap: 10,
  },
  noticeText: {
    flex: 1,
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
});

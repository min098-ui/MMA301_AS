import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { AxolotlLogo } from '../components/AxolotlLogo';
import { useLanguage } from '../context/LanguageContext';
import { Colors, Spacing, Radius } from '../constants/theme';
import { isFirebaseConfigured } from '../services/firebaseConfig';

export const ProfileScreen: React.FC = () => {
  const { t } = useLanguage();
  const firebaseConnected = isFirebaseConfigured();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* User Card */}
        <View style={styles.profileCard}>
          <View style={{ marginBottom: Spacing.md }}>
            <AxolotlLogo size={80} />
          </View>
          <Text style={styles.userName}>{t.profileTitle}</Text>
          <Text style={styles.userRole}>{t.profileRole}</Text>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>{t.profileTag}</Text>
          </View>
        </View>

        {/* Database & App Info */}
        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>{t.profileSystem}</Text>

          <View style={styles.infoRow}>
            <View style={styles.infoLabelGroup}>
              <Ionicons name="cloud-outline" size={18} color={Colors.primary} />
              <Text style={styles.infoLabel}>{t.profileDb}</Text>
            </View>
            <Text
              style={[
                styles.infoValue,
                { color: firebaseConnected ? Colors.success : Colors.statusInProgress },
              ]}
            >
              {firebaseConnected ? t.profileConnected : 'Ready / Test Mode'}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoLabelGroup}>
              <Ionicons name="shield-outline" size={18} color={Colors.primary} />
              <Text style={styles.infoLabel}>{t.profileAuth}</Text>
            </View>
            <Text style={styles.infoValue}>{t.profilePublic}</Text>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoLabelGroup}>
              <Ionicons name="git-branch-outline" size={18} color={Colors.primary} />
              <Text style={styles.infoLabel}>Milestone</Text>
            </View>
            <Text style={styles.infoValue}>Practical Exam 1 Foundation</Text>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoLabelGroup}>
              <Ionicons name="phone-portrait-outline" size={18} color={Colors.primary} />
              <Text style={styles.infoLabel}>Framework</Text>
            </View>
            <Text style={styles.infoValue}>React Native + Expo SDK 57</Text>
          </View>
        </View>

        {/* Exam 2 Notice */}
        <View style={styles.noticeBox}>
          <Ionicons name="information-circle-outline" size={20} color={Colors.primary} />
          <Text style={styles.noticeText}>
            Full user authentication, profile customization, and session tokens will be integrated
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
    padding: Spacing.xl,
    alignItems: 'center',
  },
  profileCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.xl,
    alignItems: 'center',
    width: '100%',
    maxWidth: 480,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.lg,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  userRole: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  badge: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: Radius.full,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.primary,
  },
  infoCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    width: '100%',
    maxWidth: 480,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  infoLabelGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
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
    padding: Spacing.md,
    borderRadius: Radius.md,
    maxWidth: 480,
    gap: Spacing.sm,
  },
  noticeText: {
    flex: 1,
    fontSize: 12,
    color: Colors.primaryDark,
    lineHeight: 17,
  },
});

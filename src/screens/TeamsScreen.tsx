import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { AxolotlLogo } from '../components/AxolotlLogo';
import { useLanguage } from '../context/LanguageContext';
import { Colors, Spacing, Radius } from '../constants/theme';

export const TeamsScreen: React.FC = () => {
  const { t } = useLanguage();

  const upcomingFeatures = [
    {
      icon: 'people-outline' as const,
      title: t.featWorkspaceTitle,
      description: t.featWorkspaceDesc,
    },
    {
      icon: 'person-add-outline' as const,
      title: t.featAssignTitle,
      description: t.featAssignDesc,
    },
    {
      icon: 'sparkles-outline' as const,
      title: t.featPermsTitle,
      description: t.featPermsDesc,
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={{ marginTop: Spacing.lg, marginBottom: Spacing.md }}>
          <AxolotlLogo size={80} />
        </View>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>{t.teamsMilestone}</Text>
        </View>

        <Text style={styles.title}>{t.teamsTitle}</Text>
        <Text style={styles.subtitle}>{t.teamsSubtitle}</Text>

        <View style={styles.card}>
          <Text style={styles.cardHeader}>{t.teamsMilestone}</Text>
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
    padding: Spacing.xl,
    alignItems: 'center',
  },
  iconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.lg,
    marginBottom: Spacing.md,
  },
  badge: {
    backgroundColor: Colors.surfaceVariant,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: Radius.full,
    marginBottom: Spacing.sm,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: Spacing.xl,
    maxWidth: 360,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    width: '100%',
    maxWidth: 480,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardHeader: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
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
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  featDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
    lineHeight: 16,
  },
});

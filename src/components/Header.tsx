import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ArcticFoxLogo } from './ArcticFoxLogo';
import { Colors, Spacing, Radius } from '../constants/theme';

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title = 'SnowyFox Tasks 🦊',
  subtitle = 'Quản lý công việc thông minh cùng Cáo Tuyết & Biển xanh',
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <ArcticFoxLogo size={44} />
        <View style={[styles.textContainer, { marginLeft: Spacing.md }]}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: Radius.md,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.textPrimary,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
    lineHeight: 18,
  },
});

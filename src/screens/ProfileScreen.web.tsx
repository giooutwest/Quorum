import React from 'react';
import {View, ScrollView, Text, StyleSheet} from 'react-native';
import {PortfolioHeader, PortfolioChart, HoldingRow} from '@components';
import {mockHoldings, mockPerformanceData} from '@data';
import {Colors, Typography, Spacing} from '@theme';
import LinearGradient from 'react-native-linear-gradient';

const ProfileScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerBar}>
        <Text style={styles.headerTitle}>You</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile card */}
        <View style={styles.profileSection}>
          {/* Avatar */}
          <LinearGradient
            colors={['#E8E8E8', '#D0D0D0', '#BFBFBF']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.avatarOuter}>
            <View style={styles.avatarInner}>
              <Text style={styles.avatarEmoji}>{'😎'}</Text>
            </View>
          </LinearGradient>

          <Text style={styles.profileName}>Jordan Ellis</Text>
          <Text style={styles.profileHandle}>@jordellis</Text>
          <Text style={styles.profileBio}>
            Angel investor & tech enthusiast. Focused on real estate, clean energy, and early-stage ventures.
          </Text>

          {/* Stats row */}
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{mockHoldings.length}</Text>
              <Text style={styles.statLabel}>Investments</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statValue}>3</Text>
              <Text style={styles.statLabel}>Pools</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Friends</Text>
            </View>
          </View>
        </View>

        {/* Net worth card */}
        <PortfolioHeader holdings={mockHoldings} />

        {/* Performance chart */}
        <PortfolioChart data={mockPerformanceData} />

        {/* Investments section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your Investments</Text>
        </View>
        {mockHoldings.map(holding => (
          <HoldingRow key={holding.id} holding={holding} />
        ))}

        {/* Account section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Account</Text>
        </View>
        <View style={styles.menuItem}>
          <Text style={styles.menuText}>Personal Information</Text>
          <Text style={styles.menuArrow}>{'›'}</Text>
        </View>
        <View style={styles.menuItem}>
          <Text style={styles.menuText}>Bank Accounts</Text>
          <Text style={styles.menuArrow}>{'›'}</Text>
        </View>
        <View style={styles.menuItem}>
          <Text style={styles.menuText}>Tax Documents</Text>
          <Text style={styles.menuArrow}>{'›'}</Text>
        </View>
        <View style={styles.menuItem}>
          <Text style={styles.menuText}>Notifications</Text>
          <Text style={styles.menuArrow}>{'›'}</Text>
        </View>
        <View style={[styles.menuItem, {borderBottomWidth: 0}]}>
          <Text style={[styles.menuText, {color: Colors.negative}]}>Sign Out</Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Quorum v1.0</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundPrimary,
  },
  headerBar: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderHeavy,
  },
  headerTitle: {
    ...Typography.headerLarge,
    color: Colors.textPrimary,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.lg,
  },
  avatarOuter: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  avatarInner: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: Colors.backgroundPrimary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarEmoji: {
    fontSize: 42,
  },
  profileName: {
    ...Typography.headerMedium,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  profileHandle: {
    ...Typography.bodyMedium,
    color: Colors.textTertiary,
    marginBottom: Spacing.sm,
  },
  profileBio: {
    ...Typography.bodyMedium,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundElevated,
    borderRadius: 12,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    width: '100%' as any,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    ...Typography.numberMedium,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  statLabel: {
    ...Typography.bodySmall,
    color: Colors.textTertiary,
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: Colors.borderLight,
  },
  sectionHeader: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  sectionTitle: {
    ...Typography.headerSmall,
    color: Colors.textPrimary,
    letterSpacing: 0.3,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  menuText: {
    ...Typography.bodyLarge,
    color: Colors.textPrimary,
  },
  menuArrow: {
    fontSize: 22,
    color: Colors.textTertiary,
    fontWeight: '300',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
  },
  footerText: {
    ...Typography.bodySmall,
    color: Colors.textTertiary,
  },
});

export default ProfileScreen;

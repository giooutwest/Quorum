import React, {useState, useEffect, useCallback} from 'react';
import {View, ScrollView, Text, StyleSheet, Pressable} from 'react-native';
import {MarbleCard, OliveLogo} from '@components';
import {Colors, Typography, Spacing} from '@theme';
import LinearGradient from 'react-native-linear-gradient';
import {useAuth} from '../context/AuthContext';
import {collection, query, where, onSnapshot} from 'firebase/firestore';
import {db} from '../firebase';

interface Pledge {
  id: string;
  dealName: string;
  dealType: string;
  amount: number;
  status: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  real_estate: '#556B2F',
  venture: '#7A8C5A',
  debt: '#9AAF7C',
  equity: '#3E5022',
  fund: '#B5C49A',
};

const CATEGORY_LABELS: Record<string, string> = {
  real_estate: 'Real Estate',
  venture: 'Venture',
  debt: 'Debt',
  equity: 'Equity',
  fund: 'Fund',
};

const formatCurrency = (amount: number): string => {
  if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(1)}M`;
  if (amount >= 1_000) return `$${(amount / 1_000).toFixed(0)}K`;
  return `$${amount.toLocaleString()}`;
};

const PieChart: React.FC<{data: {label: string; value: number; color: string}[]}> = ({data}) => {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  if (total === 0) return null;

  const size = 180;
  const radius = size / 2;
  const strokeWidth = 32;
  const innerRadius = radius - strokeWidth;
  const center = radius;

  let currentAngle = -90;

  const segments = data.map(segment => {
    const angle = (segment.value / total) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    currentAngle = endAngle;

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = center + radius * Math.cos(startRad);
    const y1 = center + radius * Math.sin(startRad);
    const x2 = center + radius * Math.cos(endRad);
    const y2 = center + radius * Math.sin(endRad);
    const ix1 = center + innerRadius * Math.cos(startRad);
    const iy1 = center + innerRadius * Math.sin(startRad);
    const ix2 = center + innerRadius * Math.cos(endRad);
    const iy2 = center + innerRadius * Math.sin(endRad);

    const largeArc = angle > 180 ? 1 : 0;

    const path = [
      `M ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
      `L ${ix2} ${iy2}`,
      `A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${ix1} ${iy1}`,
      'Z',
    ].join(' ');

    return {path, color: segment.color, key: segment.label};
  });

  return (
    <View style={pieStyles.container}>
      <View style={{width: size, height: size}}>
        {/* @ts-ignore - SVG works on web */}
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {segments.map(seg => (
            // @ts-ignore
            <path key={seg.key} d={seg.path} fill={seg.color} />
          ))}
        </svg>
      </View>
    </View>
  );
};

const pieStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: Spacing.lg,
  },
});

const ProfileScreen: React.FC = () => {
  const {user, userName, signOut} = useAuth();
  const [pledges, setPledges] = useState<Pledge[]>([]);

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, 'pledges'), where('userId', '==', user.uid));
    const unsubscribe = onSnapshot(q, snapshot => {
      const items: Pledge[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Pledge[];
      setPledges(items);
    });
    return unsubscribe;
  }, [user]);

  const totalPledged = pledges.reduce((sum, p) => sum + p.amount, 0);

  const handleSignOut = useCallback(async () => {
    try {
      await signOut();
    } catch {}
  }, [signOut]);

  const emailHandle = user?.email ? `@${user.email.split('@')[0]}` : '';

  // Pie chart data
  const categoryTotals: Record<string, number> = {};
  pledges.forEach(p => {
    categoryTotals[p.dealType] = (categoryTotals[p.dealType] || 0) + p.amount;
  });
  const pieData = Object.entries(categoryTotals).map(([type, value]) => ({
    label: CATEGORY_LABELS[type] || type,
    value,
    color: CATEGORY_COLORS[type] || '#808080',
  }));

  return (
    <View style={styles.container}>
      <View style={styles.headerBar}>
        <OliveLogo size={24} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile card */}
        <View style={styles.profileSection}>
          <LinearGradient
            colors={['#9AAF7C', '#7A8C5A', '#556B2F']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.avatarOuter}>
            <View style={styles.avatarInner}>
              <Text style={styles.avatarInitial}>
                {userName ? userName.charAt(0).toUpperCase() : '?'}
              </Text>
            </View>
          </LinearGradient>

          <Text style={styles.profileName}>{userName || 'Investor'}</Text>
          <Text style={styles.profileHandle}>{emailHandle}</Text>

          {/* Stats row */}
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{pledges.length}</Text>
              <Text style={styles.statLabel}>Reservations</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statValue}>3</Text>
              <Text style={styles.statLabel}>Pools</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statValue}>{formatCurrency(totalPledged)}</Text>
              <Text style={styles.statLabel}>Pledged</Text>
            </View>
          </View>
        </View>

        {/* Reservations by category */}
        {pieData.length > 0 && (
          <MarbleCard premium>
            <Text style={styles.chartTitle}>RESERVATIONS BY CATEGORY</Text>
            <PieChart data={pieData} />
            <View style={styles.legendContainer}>
              {pieData.map(item => (
                <View key={item.label} style={styles.legendRow}>
                  <View style={[styles.legendDot, {backgroundColor: item.color}]} />
                  <Text style={styles.legendLabel}>{item.label}</Text>
                  <Text style={styles.legendValue}>{formatCurrency(item.value)}</Text>
                </View>
              ))}
            </View>
          </MarbleCard>
        )}

        {/* Reservations list */}
        {pledges.length > 0 && (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Your Reservations</Text>
            </View>
            {pledges.map(pledge => (
              <View key={pledge.id} style={styles.pledgeRow}>
                <View>
                  <Text style={styles.pledgeName}>{pledge.dealName}</Text>
                  <Text style={styles.pledgeType}>
                    {CATEGORY_LABELS[pledge.dealType] || pledge.dealType}
                  </Text>
                </View>
                <View style={styles.pledgeRight}>
                  <Text style={styles.pledgeAmount}>{formatCurrency(pledge.amount)}</Text>
                  <Text style={styles.pledgeStatus}>{pledge.status}</Text>
                </View>
              </View>
            ))}
          </>
        )}

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
        <Pressable
          style={[styles.menuItem, {borderBottomWidth: 0}]}
          onPress={handleSignOut}>
          <Text style={[styles.menuText, {color: Colors.negative}]}>Sign Out</Text>
        </Pressable>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Olive v1.0</Text>
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
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderHeavy,
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
  avatarInitial: {
    ...Typography.displayLarge,
    color: Colors.accent,
  },
  profileName: {
    ...Typography.headerMedium,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  profileHandle: {
    ...Typography.bodyMedium,
    color: Colors.accentMuted,
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
  chartTitle: {
    ...Typography.headerSmall,
    color: Colors.textTertiary,
    letterSpacing: 3,
    marginBottom: Spacing.sm,
  },
  legendContainer: {
    marginTop: Spacing.md,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.xs,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: Spacing.sm,
  },
  legendLabel: {
    ...Typography.bodyMedium,
    color: Colors.textSecondary,
    flex: 1,
  },
  legendValue: {
    ...Typography.bodyMedium,
    color: Colors.textPrimary,
    fontWeight: '600',
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
  pledgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  pledgeName: {
    ...Typography.bodyLarge,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  pledgeType: {
    ...Typography.bodySmall,
    color: Colors.textTertiary,
    marginTop: 2,
  },
  pledgeRight: {
    alignItems: 'flex-end',
  },
  pledgeAmount: {
    ...Typography.numberMedium,
    color: Colors.textPrimary,
  },
  pledgeStatus: {
    ...Typography.bodySmall,
    color: Colors.accentMuted,
    marginTop: 2,
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

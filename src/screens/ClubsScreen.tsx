import React, {useState, useCallback} from 'react';
import {View, FlatList, Text, StyleSheet, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {OliveLogo} from '@components';
import {Colors, Typography, Spacing} from '@theme';
import {Club} from '@app-types';
import ClubChatScreen from './ClubChatScreen';

const formatCurrency = (cents: number): string => {
  const dollars = cents / 100;
  if (dollars >= 1_000_000) {
    return `$${(dollars / 1_000_000).toFixed(1)}M`;
  }
  if (dollars >= 1_000) {
    return `$${(dollars / 1_000).toFixed(0)}K`;
  }
  return `$${dollars.toLocaleString()}`;
};

const statusLabel = (status: string) => {
  switch (status) {
    case 'raising':
      return 'Raising';
    case 'funded':
      return 'Funded';
    case 'active':
      return 'Active';
    default:
      return status;
  }
};

const ClubRow: React.FC<{club: Club; onPress: () => void}> = ({club, onPress}) => {
  const progress = club.deal.committed / club.deal.totalPool;
  const isFunded = club.deal.status === 'funded' || club.deal.status === 'active';
  const lastMessage = club.messages[club.messages.length - 1];

  return (
    <Pressable style={styles.clubRow} onPress={onPress}>
      <View style={styles.clubAvatar}>
        <View style={styles.avatarPool}>
          <View style={styles.avatarFloat} />
        </View>
      </View>
      <View style={styles.clubInfo}>
        <View style={styles.clubNameRow}>
          <Text style={styles.clubName} numberOfLines={1}>{club.name}</Text>
          <Text style={styles.timestamp}>{lastMessage?.timestamp}</Text>
        </View>
        <Text style={styles.clubDescription} numberOfLines={1}>{club.description}</Text>
        <View style={styles.clubMeta}>
          <Text style={[
            styles.statusBadge,
            isFunded ? styles.statusFunded : styles.statusRaising,
          ]}>
            {statusLabel(club.deal.status)}
          </Text>
          <Text style={styles.poolAmount}>
            {formatCurrency(club.deal.committed)} / {formatCurrency(club.deal.totalPool)}
          </Text>
          <Text style={styles.memberCount}>{club.members.length} friends</Text>
        </View>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, {width: `${Math.min(progress * 100, 100)}%` as any}]} />
        </View>
      </View>
    </Pressable>
  );
};

const ClubsScreen: React.FC = () => {
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);
  const [pools] = useState<Club[]>([]);

  const handleBack = useCallback(() => {
    setSelectedClub(null);
  }, []);

  if (selectedClub) {
    return <ClubChatScreen club={selectedClub} onBack={handleBack} />;
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.headerBar}>
        <View style={styles.headerSpacer} />
        <OliveLogo size={24} />
        <Pressable style={styles.addButton} onPress={() => {}}>
          <Text style={styles.addButtonText}>+</Text>
        </Pressable>
      </View>
      {pools.length === 0 ? (
        <View style={styles.emptyState}>
          <View style={styles.emptyIcon}>
            <View style={styles.emptyPool}>
              <View style={styles.emptyFloat} />
            </View>
          </View>
          <Text style={styles.emptyTitle}>No pools yet</Text>
          <Text style={styles.emptySubtitle}>Create a pool to start investing with friends</Text>
        </View>
      ) : (
        <FlatList
          data={pools}
          renderItem={({item}: {item: Club}) => (
            <ClubRow club={item} onPress={() => setSelectedClub(item)} />
          )}
          keyExtractor={(item: Club) => item.id}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundPrimary,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderHeavy,
  },
  headerSpacer: {
    width: 32,
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 20,
    color: Colors.textOnPrimary,
    fontWeight: '600',
    lineHeight: 22,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.accentLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  emptyPool: {
    width: 32,
    height: 20,
    borderWidth: 2.5,
    borderColor: Colors.accent,
    borderRadius: 4,
    transform: [{rotate: '-12deg'}],
  },
  emptyFloat: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2.5,
    borderColor: Colors.accentMuted,
  },
  emptyTitle: {
    ...Typography.headerMedium,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  emptySubtitle: {
    ...Typography.bodyMedium,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  clubRow: {
    flexDirection: 'row',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  clubAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primaryBlack,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  avatarPool: {
    width: 20,
    height: 12,
    borderWidth: 1.5,
    borderColor: Colors.textOnPrimary,
    borderRadius: 2,
    transform: [{rotate: '-12deg'}],
  },
  avatarFloat: {
    position: 'absolute',
    top: 1,
    right: 1,
    width: 6,
    height: 6,
    borderRadius: 3,
    borderWidth: 1.5,
    borderColor: '#E8788A',
  },
  clubInfo: {
    flex: 1,
  },
  clubNameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  clubName: {
    ...Typography.headerSmall,
    color: Colors.textPrimary,
    flex: 1,
  },
  timestamp: {
    ...Typography.bodySmall,
    color: Colors.textTertiary,
    marginLeft: Spacing.sm,
  },
  clubDescription: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  clubMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  statusBadge: {
    ...Typography.bodySmall,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  statusRaising: {
    backgroundColor: Colors.primaryBlack,
    color: Colors.textOnPrimary,
  },
  statusFunded: {
    backgroundColor: Colors.positive,
    color: Colors.textOnPrimary,
  },
  poolAmount: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  memberCount: {
    ...Typography.bodySmall,
    color: Colors.textTertiary,
    letterSpacing: 1,
  },
  progressBarBg: {
    height: 3,
    backgroundColor: Colors.borderLight,
    borderRadius: 9999,
  },
  progressBarFill: {
    height: 3,
    backgroundColor: Colors.accent,
    borderRadius: 9999,
  },
});

export default ClubsScreen;

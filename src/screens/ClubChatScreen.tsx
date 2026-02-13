import React from 'react';
import {View, FlatList, Text, StyleSheet, Pressable} from 'react-native';
import {Club, ClubMessage} from '@app-types';
import {Colors, Typography, Spacing} from '@theme';
import MarbleCard from '@components/MarbleCard';

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

interface ClubChatScreenProps {
  club: Club;
  onBack: () => void;
}

const MessageBubble: React.FC<{message: ClubMessage; isCurrentUser: boolean}> = ({message, isCurrentUser}) => (
  <View style={[msgStyles.row, isCurrentUser && msgStyles.rowRight]}>
    {!isCurrentUser && (
      <View style={msgStyles.avatar}>
        <Text style={msgStyles.avatarText}>
          {message.memberName.charAt(0)}
        </Text>
      </View>
    )}
    <View style={msgStyles.bubbleWrap}>
      {!isCurrentUser && (
        <Text style={msgStyles.senderName}>{message.memberName}</Text>
      )}
      <View style={[
        msgStyles.bubble,
        isCurrentUser ? msgStyles.bubbleRight : msgStyles.bubbleLeft,
      ]}>
        <Text style={[msgStyles.text, isCurrentUser && msgStyles.textRight]}>
          {message.text}
        </Text>
      </View>
      <Text style={[msgStyles.time, isCurrentUser && msgStyles.timeRight]}>
        {message.timestamp}
      </Text>
    </View>
  </View>
);

const msgStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    paddingVertical: 4,
    alignItems: 'flex-end',
  },
  rowRight: {
    justifyContent: 'flex-end',
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primaryBlack,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    marginBottom: 18,
  },
  avatarText: {
    ...Typography.bodySmall,
    color: Colors.textOnPrimary,
    fontWeight: '700',
    fontSize: 11,
  },
  bubbleWrap: {
    maxWidth: '75%',
  },
  senderName: {
    ...Typography.bodySmall,
    fontWeight: '600',
    color: Colors.textTertiary,
    fontSize: 11,
    marginBottom: 2,
    marginLeft: 4,
  },
  bubble: {
    padding: 12,
    borderRadius: 18,
  },
  bubbleLeft: {
    backgroundColor: '#F0F0F0',
    borderBottomLeftRadius: 4,
  },
  bubbleRight: {
    backgroundColor: Colors.primaryBlack,
    borderBottomRightRadius: 4,
  },
  text: {
    ...Typography.bodyMedium,
    color: Colors.textPrimary,
  },
  textRight: {
    color: Colors.textOnPrimary,
  },
  time: {
    ...Typography.bodySmall,
    fontSize: 10,
    color: Colors.textTertiary,
    marginTop: 2,
    marginLeft: 4,
  },
  timeRight: {
    textAlign: 'right' as const,
    marginRight: 4,
    marginLeft: 0,
  },
});

const ClubChatScreen: React.FC<ClubChatScreenProps> = ({club, onBack}) => {
  const {deal} = club;
  const progress = deal.committed / deal.totalPool;
  const isFunded = deal.status === 'funded' || deal.status === 'active';

  const renderHeader = () => (
    <View>
      {/* Collective Investment Card */}
      <MarbleCard premium>
        <Text style={styles.dealLabel}>Pool Investment</Text>
        <Text style={styles.dealName}>{deal.name}</Text>

        <View style={styles.metricsRow}>
          <View style={styles.metric}>
            <Text style={styles.metricLabel}>Goal</Text>
            <Text style={styles.metricValue}>{formatCurrency(deal.totalPool)}</Text>
          </View>
          <View style={styles.metric}>
            <Text style={styles.metricLabel}>Pooled</Text>
            <Text style={styles.metricValue}>{formatCurrency(deal.committed)}</Text>
          </View>
          <View style={styles.metric}>
            <Text style={styles.metricLabel}>Returns</Text>
            <Text style={styles.metricValue}>{deal.targetReturn}</Text>
          </View>
        </View>

        <View style={styles.progressSection}>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, {width: `${Math.min(progress * 100, 100)}%` as any}]} />
          </View>
          <View style={styles.progressLabels}>
            <Text style={styles.progressText}>
              {Math.round(progress * 100)}% funded
            </Text>
            <Text style={styles.progressText}>
              {deal.memberCount} friends
            </Text>
          </View>
        </View>

        {isFunded && (
          <View style={styles.fundedBadge}>
            <Text style={styles.fundedText}>
              {deal.status === 'active' ? 'Active' : 'Fully funded'}
            </Text>
          </View>
        )}
      </MarbleCard>

      {/* Members strip */}
      <View style={styles.membersStrip}>
        <Text style={styles.membersLabel}>Friends</Text>
        <View style={styles.membersRow}>
          {club.members.map(member => (
            <View key={member.id} style={styles.memberChip}>
              <View style={styles.memberDot}>
                <Text style={styles.memberInitials}>{member.initials}</Text>
              </View>
              <Text style={styles.memberName}>{member.name.split(' ')[0]}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Chat header */}
      <View style={styles.chatHeader}>
        <Text style={styles.chatHeaderText}>Chat</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerBar}>
        <Pressable onPress={onBack} style={styles.backButton}>
          <View style={styles.backArrow}>
            <View style={styles.arrowLine} />
            <View style={styles.arrowHead} />
          </View>
        </Pressable>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>{club.name}</Text>
          <Text style={styles.headerSubtitle}>{club.description}</Text>
        </View>
      </View>

      <FlatList
        data={club.messages}
        renderItem={({item}: {item: ClubMessage}) => (
          <MessageBubble message={item} isCurrentUser={item.memberId === club.members[0].id} />
        )}
        keyExtractor={(item: ClubMessage) => item.id}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />

      {/* Input placeholder */}
      <View style={styles.inputBar}>
        <View style={styles.inputField}>
          <Text style={styles.inputPlaceholder}>Message {club.name}...</Text>
        </View>
      </View>
    </View>
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
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderHeavy,
  },
  backButton: {
    padding: Spacing.sm,
    marginRight: Spacing.sm,
    marginLeft: -Spacing.sm,
  },
  backArrow: {
    width: 20,
    height: 20,
    justifyContent: 'center',
  },
  arrowLine: {
    width: 16,
    height: 2.5,
    backgroundColor: Colors.primaryBlack,
  },
  arrowHead: {
    position: 'absolute',
    left: 0,
    width: 9,
    height: 9,
    borderLeftWidth: 2.5,
    borderBottomWidth: 2.5,
    borderColor: Colors.primaryBlack,
    transform: [{rotate: '45deg'}],
  },
  headerCenter: {
    flex: 1,
  },
  headerTitle: {
    ...Typography.headerMedium,
    color: Colors.textPrimary,
    fontSize: 16,
  },
  headerSubtitle: {
    ...Typography.bodySmall,
    color: Colors.textTertiary,
    marginTop: 1,
  },
  listContent: {
    paddingBottom: Spacing.md,
  },
  dealLabel: {
    ...Typography.bodySmall,
    color: Colors.textTertiary,
    letterSpacing: 0.5,
    marginBottom: Spacing.xs,
  },
  dealName: {
    ...Typography.headerMedium,
    color: Colors.textPrimary,
    marginBottom: Spacing.lg,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  metric: {
    alignItems: 'center',
    flex: 1,
  },
  metricLabel: {
    ...Typography.bodySmall,
    color: Colors.textTertiary,
    letterSpacing: 0.5,
    marginBottom: Spacing.xxs,
  },
  metricValue: {
    ...Typography.numberMedium,
    color: Colors.textPrimary,
    fontSize: 16,
  },
  progressSection: {
    marginBottom: Spacing.sm,
  },
  progressBarBg: {
    height: 6,
    backgroundColor: Colors.borderLight,
    borderRadius: 9999,
  },
  progressBarFill: {
    height: 6,
    backgroundColor: Colors.primaryBlack,
    borderRadius: 9999,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.xs,
  },
  progressText: {
    ...Typography.bodySmall,
    color: Colors.textTertiary,
    letterSpacing: 0,
    fontWeight: '600',
  },
  fundedBadge: {
    backgroundColor: Colors.positive,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
    alignSelf: 'flex-start',
    marginTop: Spacing.sm,
    borderRadius: 4,
  },
  fundedText: {
    ...Typography.bodySmall,
    color: Colors.textOnPrimary,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  membersStrip: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  membersLabel: {
    ...Typography.bodySmall,
    color: Colors.textTertiary,
    letterSpacing: 0.3,
    fontWeight: '600',
    marginBottom: Spacing.sm,
  },
  membersRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  memberChip: {
    alignItems: 'center',
    gap: 4,
  },
  memberDot: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primaryBlack,
    justifyContent: 'center',
    alignItems: 'center',
  },
  memberInitials: {
    ...Typography.bodySmall,
    color: Colors.textOnPrimary,
    fontWeight: '700',
    fontSize: 11,
  },
  memberName: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    fontSize: 10,
  },
  chatHeader: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  chatHeaderText: {
    ...Typography.headerSmall,
    color: Colors.textPrimary,
    letterSpacing: 0.3,
  },
  inputBar: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.borderHeavy,
  },
  inputField: {
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderRadius: 8,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  inputPlaceholder: {
    ...Typography.bodyMedium,
    color: Colors.textTertiary,
  },
});

export default ClubChatScreen;

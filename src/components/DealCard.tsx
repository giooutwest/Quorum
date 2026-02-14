import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Deal} from '@app-types';
import {Colors, Typography, Spacing} from '@theme';
import MarbleCard from './MarbleCard';
import ObsidianButton from './ObsidianButton';

const formatCurrency = (cents: number): string => {
  const dollars = cents / 100;
  if (dollars >= 1_000_000) {
    return `$${(dollars / 1_000_000).toFixed(0)}M`;
  }
  if (dollars >= 1_000) {
    return `$${(dollars / 1_000).toFixed(0)}K`;
  }
  return `$${dollars.toLocaleString()}`;
};

interface DealCardProps {
  deal: Deal;
  onCommit: (dealId: string) => void;
}

const DealCard: React.FC<DealCardProps> = ({deal, onCommit}) => {
  return (
    <MarbleCard>
      <Text style={styles.dealType}>
        {deal.dealType.toUpperCase().replace('_', ' ')}
      </Text>

      <Text style={styles.name}>{deal.name}</Text>

      <Text style={styles.description}>{deal.shortDescription}</Text>

      <View style={styles.metricsRow}>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Goal</Text>
          <Text style={styles.metricValue}>{formatCurrency(deal.amount)}</Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Returns</Text>
          <Text style={styles.metricValue}>{deal.targetReturn}</Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Min. invest</Text>
          <Text style={styles.metricValue}>
            {formatCurrency(deal.minimumCommitment)}
          </Text>
        </View>
      </View>

      {deal.status === 'closing' && (
        <View style={styles.statusBar}>
          <Text style={styles.statusText}>Closing soon</Text>
        </View>
      )}

      <ObsidianButton
        title="Reserve Allocation"
        onPress={() => onCommit(deal.id)}
        disabled={deal.status === 'closed' || deal.status === 'funded'}
        style={styles.commitButton}
      />
    </MarbleCard>
  );
};

const styles = StyleSheet.create({
  dealType: {
    ...Typography.bodySmall,
    color: Colors.accent,
    letterSpacing: 1,
    marginBottom: Spacing.xs,
  },
  name: {
    ...Typography.headerMedium,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  description: {
    ...Typography.bodyMedium,
    color: Colors.textSecondary,
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
  },
  statusBar: {
    backgroundColor: Colors.primaryBlack,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    alignSelf: 'flex-start',
    marginBottom: Spacing.md,
    borderRadius: 4,
  },
  statusText: {
    ...Typography.bodySmall,
    color: Colors.textOnPrimary,
    letterSpacing: 0.5,
    fontWeight: '600',
  },
  commitButton: {
    marginTop: Spacing.sm,
  },
});

export default DealCard;

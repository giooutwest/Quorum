import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors, Typography, Spacing} from '@theme';
import {Holding} from '@app-types';
import MarbleCard from './MarbleCard';

interface PortfolioHeaderProps {
  holdings: Holding[];
}

const formatLargeCurrency = (cents: number): string => {
  const dollars = cents / 100;
  return `$${dollars.toLocaleString('en-US', {minimumFractionDigits: 0})}`;
};

const PortfolioHeader: React.FC<PortfolioHeaderProps> = ({holdings}) => {
  const totalValue = holdings.reduce((sum, h) => sum + h.currentValue, 0);
  const totalCommitted = holdings.reduce(
    (sum, h) => sum + h.committedAmount,
    0,
  );
  const totalGainLoss = totalValue - totalCommitted;
  const totalGainPercent =
    totalCommitted > 0 ? (totalGainLoss / totalCommitted) * 100 : 0;
  const isPositive = totalGainLoss >= 0;

  return (
    <MarbleCard premium>
      <Text style={styles.label}>Total Value</Text>
      <Text style={styles.totalValue}>
        {formatLargeCurrency(totalValue)}
      </Text>
      <View style={styles.changeRow}>
        <Text
          style={[
            styles.changeText,
            {color: isPositive ? Colors.positive : Colors.negative},
          ]}>
          {isPositive ? '+' : '-'}
          {formatLargeCurrency(Math.abs(totalGainLoss))} (
          {isPositive ? '+' : ''}
          {totalGainPercent.toFixed(1)}%)
        </Text>
        <Text style={styles.periodLabel}>all time</Text>
      </View>
    </MarbleCard>
  );
};

const styles = StyleSheet.create({
  label: {
    ...Typography.headerSmall,
    color: Colors.textTertiary,
    letterSpacing: 0.5,
    marginBottom: Spacing.sm,
  },
  totalValue: {
    ...Typography.displayLarge,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  changeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    ...Typography.bodyMedium,
    fontWeight: '600',
    marginRight: Spacing.sm,
  },
  periodLabel: {
    ...Typography.bodySmall,
    color: Colors.textTertiary,
    letterSpacing: 0,
  },
});

export default PortfolioHeader;

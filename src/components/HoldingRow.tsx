import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Holding} from '@app-types';
import {Colors, Typography, Spacing} from '@theme';

const formatDollars = (cents: number): string => {
  const dollars = Math.abs(cents / 100);
  return `$${dollars.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
};

interface HoldingRowProps {
  holding: Holding;
}

const HoldingRow: React.FC<HoldingRowProps> = ({holding}) => {
  const isPositive = holding.gainLoss >= 0;
  const gainColor = isPositive ? Colors.positive : Colors.negative;
  const gainPrefix = isPositive ? '+' : '-';

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.name} numberOfLines={1}>
          {holding.dealName}
        </Text>
        <Text style={styles.committed}>
          {formatDollars(holding.committedAmount)} invested
        </Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.currentValue}>
          {formatDollars(holding.currentValue)}
        </Text>
        <Text style={[styles.gainLoss, {color: gainColor}]}>
          {gainPrefix}
          {formatDollars(holding.gainLoss)} ({gainPrefix}
          {Math.abs(holding.gainLossPercent).toFixed(1)}%)
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  left: {
    flex: 1,
    marginRight: Spacing.md,
  },
  name: {
    ...Typography.headerSmall,
    color: Colors.textPrimary,
    marginBottom: Spacing.xxs,
  },
  committed: {
    ...Typography.bodySmall,
    color: Colors.textTertiary,
    letterSpacing: 0,
  },
  right: {
    alignItems: 'flex-end',
  },
  currentValue: {
    ...Typography.numberMedium,
    color: Colors.textPrimary,
    marginBottom: Spacing.xxs,
  },
  gainLoss: {
    ...Typography.bodySmall,
    fontWeight: '600',
  },
});

export default HoldingRow;

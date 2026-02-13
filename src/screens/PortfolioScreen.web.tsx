import React from 'react';
import {View, FlatList, Text, StyleSheet} from 'react-native';
import {PortfolioHeader, PortfolioChart, HoldingRow} from '@components';
import {mockHoldings, mockPerformanceData} from '@data';
import {Colors, Typography, Spacing} from '@theme';
import {Holding} from '@app-types';

const PortfolioScreen: React.FC = () => {
  const renderHeader = () => (
    <View>
      <PortfolioHeader holdings={mockHoldings} />
      <PortfolioChart data={mockPerformanceData} />
      <View style={styles.holdingsHeader}>
        <Text style={styles.holdingsTitle}>HOLDINGS</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerBar}>
        <Text style={styles.headerTitle}>PORTFOLIO</Text>
      </View>
      <FlatList
        data={mockHoldings}
        renderItem={({item}: {item: Holding}) => <HoldingRow holding={item} />}
        keyExtractor={(item: Holding) => item.id}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
      />
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
    borderBottomWidth: 2,
    borderBottomColor: Colors.borderHeavy,
  },
  headerTitle: {
    ...Typography.headerLarge,
    color: Colors.textPrimary,
  },
  holdingsHeader: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.sm,
    borderTopWidth: 2,
    borderTopColor: Colors.borderHeavy,
  },
  holdingsTitle: {
    ...Typography.headerSmall,
    color: Colors.textPrimary,
    letterSpacing: 3,
  },
});

export default PortfolioScreen;

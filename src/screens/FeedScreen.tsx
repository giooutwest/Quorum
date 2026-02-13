import React, {useCallback} from 'react';
import {View, FlatList, Text, StyleSheet, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {DealCard} from '@components';
import {mockDeals} from '@data';
import {Colors, Typography, Spacing} from '@theme';
import {Deal} from '@app-types';

const FeedScreen: React.FC = () => {
  const handleCommit = useCallback((dealId: string) => {
    const deal = mockDeals.find(d => d.id === dealId);
    Alert.alert('COMMITMENT', `You are committing to ${deal?.name || 'this deal'}.`);
  }, []);

  const renderDeal = useCallback(
    ({item}: {item: Deal}) => <DealCard deal={item} onCommit={handleCommit} />,
    [handleCommit],
  );

  const keyExtractor = useCallback((item: Deal) => item.id, []);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.headerBar}>
        <Text style={styles.headerTitle}>DEAL FLOW</Text>
      </View>
      <FlatList
        data={mockDeals}
        renderItem={renderDeal}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
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
  listContent: {
    paddingVertical: Spacing.md,
  },
  separator: {
    height: Spacing.sm,
  },
});

export default FeedScreen;

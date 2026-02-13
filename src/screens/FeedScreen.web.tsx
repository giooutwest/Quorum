import React, {useCallback} from 'react';
import {View, FlatList, Text, StyleSheet} from 'react-native';
import {DealCard} from '@components';
import {mockDeals} from '@data';
import {Colors, Typography, Spacing} from '@theme';
import {Deal} from '@app-types';

const FeedScreen: React.FC = () => {
  const handleCommit = useCallback((dealId: string) => {
    const deal = mockDeals.find(d => d.id === dealId);
    const message = `You are committing to ${deal?.name || 'this deal'}.`;
    (globalThis as any).alert(message);
  }, []);

  const renderDeal = useCallback(
    ({item}: {item: Deal}) => <DealCard deal={item} onCommit={handleCommit} />,
    [handleCommit],
  );

  const keyExtractor = useCallback((item: Deal) => item.id, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerBar}>
        <Text style={styles.headerTitle}>Opportunities</Text>
      </View>
      <FlatList
        data={mockDeals}
        renderItem={renderDeal}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
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
    borderBottomWidth: 1,
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

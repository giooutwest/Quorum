import React, {useState, useCallback} from 'react';
import {View, FlatList, Text, StyleSheet, Pressable} from 'react-native';
import {DealCard, ObsidianButton} from '@components';
import {mockDeals} from '@data';
import {Colors, Typography, Spacing} from '@theme';
import {Deal} from '@app-types';

const NUM_KEYS = ['1','2','3','4','5','6','7','8','9','','0','⌫'] as const;

const FeedScreen: React.FC = () => {
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [investAmount, setInvestAmount] = useState('');

  const handleCommit = useCallback((dealId: string) => {
    const deal = mockDeals.find(d => d.id === dealId);
    if (deal) {
      setSelectedDeal(deal);
      setInvestAmount('');
    }
  }, []);

  const handleNumPress = useCallback((key: string) => {
    if (key === '⌫') {
      setInvestAmount(prev => prev.slice(0, -1));
    } else if (key) {
      setInvestAmount(prev => {
        if (prev.length >= 7) return prev;
        return prev + key;
      });
    }
  }, []);

  const handleInvest = useCallback(() => {
    if (!selectedDeal || !investAmount) return;
    (globalThis as any).alert(`You invested $${investAmount} in ${selectedDeal.name}`);
    setSelectedDeal(null);
  }, [selectedDeal, investAmount]);

  const renderDeal = useCallback(
    ({item}: {item: Deal}) => <DealCard deal={item} onCommit={handleCommit} />,
    [handleCommit],
  );

  const keyExtractor = useCallback((item: Deal) => item.id, []);

  const minDollars = selectedDeal ? selectedDeal.minimumCommitment / 100 : 0;
  const percentages = [
    {label: '10%', value: Math.round(minDollars * 0.1)},
    {label: '50%', value: Math.round(minDollars * 0.5)},
    {label: '100%', value: minDollars},
  ];

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

      {selectedDeal && (
        <View style={modalStyles.overlay}>
          <Pressable style={modalStyles.backdrop} onPress={() => setSelectedDeal(null)} />
          <View style={modalStyles.sheet}>
            {/* Header */}
            <View style={modalStyles.sheetHeader}>
              <Pressable onPress={() => setSelectedDeal(null)} style={modalStyles.cancelBtn}>
                <Text style={modalStyles.cancelText}>Cancel</Text>
              </Pressable>
              <Text style={modalStyles.dealName} numberOfLines={1}>{selectedDeal.name}</Text>
              <View style={modalStyles.cancelBtn} />
            </View>

            {/* Amount display */}
            <View style={modalStyles.amountSection}>
              <Text style={modalStyles.amount}>
                ${investAmount || '0'}
              </Text>
            </View>

            {/* Percentage pills */}
            <View style={modalStyles.pillRow}>
              {percentages.map(pct => (
                <Pressable
                  key={pct.label}
                  style={[
                    modalStyles.pill,
                    investAmount === String(pct.value) && modalStyles.pillActive,
                  ]}
                  onPress={() => setInvestAmount(String(pct.value))}>
                  <Text style={[
                    modalStyles.pillText,
                    investAmount === String(pct.value) && modalStyles.pillTextActive,
                  ]}>
                    {pct.label} · ${pct.value}
                  </Text>
                </Pressable>
              ))}
            </View>

            {/* Numpad */}
            <View style={modalStyles.numpad}>
              {NUM_KEYS.map((key, i) => (
                <Pressable
                  key={`${key}-${i}`}
                  style={modalStyles.numKey}
                  onPress={() => handleNumPress(key)}>
                  <Text style={[
                    modalStyles.numKeyText,
                    key === '⌫' && modalStyles.numKeyBackspace,
                    key === '' && modalStyles.numKeyEmpty,
                  ]}>
                    {key}
                  </Text>
                </Pressable>
              ))}
            </View>

            {/* Invest button */}
            <ObsidianButton
              title={investAmount ? `Invest $${investAmount}` : 'Invest'}
              onPress={handleInvest}
              disabled={!investAmount || investAmount === '0'}
            />
          </View>
        </View>
      )}
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

const modalStyles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  sheet: {
    backgroundColor: Colors.backgroundPrimary,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: 40,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
  },
  cancelBtn: {
    width: 60,
  },
  cancelText: {
    ...Typography.bodyMedium,
    color: Colors.textTertiary,
  },
  dealName: {
    ...Typography.headerSmall,
    color: Colors.textPrimary,
    flex: 1,
    textAlign: 'center',
  },
  amountSection: {
    alignItems: 'center',
    paddingVertical: Spacing.lg,
  },
  amount: {
    ...Typography.numberLarge,
    fontSize: 42,
    color: Colors.textPrimary,
  },
  pillRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.xl,
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  pillActive: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
  },
  pillText: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  pillTextActive: {
    color: Colors.textOnPrimary,
  },
  numpad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  numKey: {
    width: '33.33%',
    alignItems: 'center',
    paddingVertical: 14,
  },
  numKeyText: {
    fontSize: 24,
    fontWeight: '500',
    color: Colors.textPrimary,
  },
  numKeyBackspace: {
    fontSize: 20,
  },
  numKeyEmpty: {
    color: 'transparent',
  },
});

export default FeedScreen;

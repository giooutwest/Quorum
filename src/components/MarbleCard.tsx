import React from 'react';
import {View, ViewStyle, StyleSheet} from 'react-native';
import {Colors, Spacing, Elevation} from '@theme';

interface MarbleCardProps {
  children: React.ReactNode;
  premium?: boolean;
  style?: ViewStyle;
}

const MarbleCard: React.FC<MarbleCardProps> = ({
  children,
  premium = false,
  style,
}) => {
  if (premium) {
    return (
      <View style={[styles.card, styles.premiumCard, style]}>{children}</View>
    );
  }

  return (
    <View style={[styles.card, styles.standardCard, style]}>{children}</View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: Spacing.lg,
    marginHorizontal: Spacing.md,
    marginVertical: Spacing.sm,
    borderRadius: 12,
  },
  standardCard: {
    backgroundColor: Colors.backgroundPrimary,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  premiumCard: {
    backgroundColor: Colors.backgroundElevated,
    ...Elevation.premium,
    borderWidth: 0,
  },
});

export default MarbleCard;

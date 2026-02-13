import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {Colors, Typography, Spacing} from '@theme';

const screenWidth = Dimensions.get('window').width;

interface DataPoint {
  month: string;
  value: number;
}

interface PortfolioChartProps {
  data: DataPoint[];
}

const PortfolioChart: React.FC<PortfolioChartProps> = ({data}) => {
  const chartData = {
    labels: data.map(d => d.month),
    datasets: [
      {
        data: data.map(d => d.value / 100),
        color: () => Colors.primaryBlack,
        strokeWidth: 2.5,
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PERFORMANCE</Text>
      <LineChart
        data={chartData}
        width={screenWidth - Spacing.md * 2}
        height={220}
        yAxisLabel="$"
        yAxisSuffix=""
        formatYLabel={value => {
          const num = parseFloat(value);
          if (num >= 1_000_000) {
            return `${(num / 1_000_000).toFixed(1)}M`;
          }
          if (num >= 1_000) {
            return `${(num / 1_000).toFixed(0)}K`;
          }
          return value;
        }}
        chartConfig={{
          backgroundColor: Colors.backgroundPrimary,
          backgroundGradientFrom: Colors.backgroundPrimary,
          backgroundGradientTo: Colors.backgroundPrimary,
          decimalPlaces: 0,
          color: () => Colors.primaryBlack,
          labelColor: () => Colors.textTertiary,
          propsForDots: {
            r: '3',
            strokeWidth: '2',
            stroke: Colors.primaryBlack,
            fill: Colors.backgroundPrimary,
          },
          propsForBackgroundLines: {
            stroke: Colors.borderLight,
            strokeDasharray: '4,4',
          },
        }}
        bezier
        style={styles.chart}
        withInnerLines
        withOuterLines={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Spacing.md,
    marginVertical: Spacing.md,
    paddingVertical: Spacing.md,
  },
  title: {
    ...Typography.headerSmall,
    color: Colors.textPrimary,
    letterSpacing: 3,
    marginBottom: Spacing.sm,
    paddingHorizontal: Spacing.sm,
  },
  chart: {
    borderRadius: 0,
  },
});

export default PortfolioChart;

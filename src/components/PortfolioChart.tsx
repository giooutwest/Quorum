import React from 'react';
import {View, Text, StyleSheet, useWindowDimensions, Platform} from 'react-native';
import {Colors, Typography, Spacing} from '@theme';

interface DataPoint {
  month: string;
  value: number;
}

interface PortfolioChartProps {
  data: DataPoint[];
}

// Wrap chart import in a try-catch to prevent crashes on web
let LineChartComponent: any = null;
try {
  LineChartComponent = require('react-native-chart-kit').LineChart;
} catch {
  LineChartComponent = null;
}

const PortfolioChart: React.FC<PortfolioChartProps> = ({data}) => {
  const {width} = useWindowDimensions();
  const chartWidth = Math.min(width - Spacing.md * 2, 800);

  if (!LineChartComponent || chartWidth <= 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>PERFORMANCE</Text>
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>
            {Platform.OS === 'web'
              ? 'Chart available on mobile'
              : 'Loading chart...'}
          </Text>
        </View>
      </View>
    );
  }

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

  try {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>PERFORMANCE</Text>
        <LineChartComponent
          data={chartData}
          width={chartWidth}
          height={220}
          yAxisLabel="$"
          yAxisSuffix=""
          formatYLabel={(value: string) => {
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
  } catch {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>PERFORMANCE</Text>
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>Chart unavailable</Text>
        </View>
      </View>
    );
  }
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
  placeholder: {
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderStyle: 'dashed' as any,
  },
  placeholderText: {
    ...Typography.bodyMedium,
    color: Colors.textTertiary,
  },
});

export default PortfolioChart;

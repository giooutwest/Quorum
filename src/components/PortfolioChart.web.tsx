import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors, Typography, Spacing} from '@theme';

interface DataPoint {
  month: string;
  value: number;
}

interface PortfolioChartProps {
  data: DataPoint[];
}

const PortfolioChart: React.FC<PortfolioChartProps> = ({data}) => {
  // Simple SVG-based chart for web (no react-native-chart-kit dependency)
  if (!data || data.length === 0) {
    return null;
  }

  const values = data.map(d => d.value / 100);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  const range = maxVal - minVal || 1;

  const chartWidth = 760;
  const chartHeight = 200;
  const padding = {top: 10, right: 20, bottom: 30, left: 60};
  const innerWidth = chartWidth - padding.left - padding.right;
  const innerHeight = chartHeight - padding.top - padding.bottom;

  // Build SVG path
  const points = values.map((val, i) => {
    const x = padding.left + (i / (values.length - 1)) * innerWidth;
    const y = padding.top + innerHeight - ((val - minVal) / range) * innerHeight;
    return {x, y};
  });

  const linePath = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
    .join(' ');

  // Area fill path
  const areaPath =
    linePath +
    ` L ${points[points.length - 1].x} ${padding.top + innerHeight}` +
    ` L ${points[0].x} ${padding.top + innerHeight} Z`;

  // Y-axis labels
  const formatValue = (val: number) => {
    if (val >= 1_000_000) return `$${(val / 1_000_000).toFixed(1)}M`;
    if (val >= 1_000) return `$${(val / 1_000).toFixed(0)}K`;
    return `$${val}`;
  };

  const yLabels = [minVal, minVal + range * 0.5, maxVal];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PERFORMANCE</Text>
      <View style={styles.chartWrapper}>
        <svg
          width="100%"
          height={chartHeight}
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          style={{maxWidth: chartWidth}}>
          {/* Grid lines */}
          {yLabels.map((val, i) => {
            const y =
              padding.top +
              innerHeight -
              ((val - minVal) / range) * innerHeight;
            return (
              <line
                key={i}
                x1={padding.left}
                y1={y}
                x2={chartWidth - padding.right}
                y2={y}
                stroke={Colors.borderLight}
                strokeDasharray="4,4"
              />
            );
          })}

          {/* Area fill */}
          <path d={areaPath} fill={Colors.borderLight} opacity={0.3} />

          {/* Line */}
          <path
            d={linePath}
            fill="none"
            stroke={Colors.primaryBlack}
            strokeWidth={2.5}
          />

          {/* Dots */}
          {points.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={3}
              fill={Colors.backgroundPrimary}
              stroke={Colors.primaryBlack}
              strokeWidth={2}
            />
          ))}

          {/* Y-axis labels */}
          {yLabels.map((val, i) => {
            const y =
              padding.top +
              innerHeight -
              ((val - minVal) / range) * innerHeight;
            return (
              <text
                key={`y-${i}`}
                x={padding.left - 8}
                y={y + 4}
                textAnchor="end"
                fontSize={11}
                fill={Colors.textTertiary}>
                {formatValue(val)}
              </text>
            );
          })}

          {/* X-axis labels */}
          {data.map((d, i) => {
            const x = padding.left + (i / (data.length - 1)) * innerWidth;
            return (
              <text
                key={`x-${i}`}
                x={x}
                y={chartHeight - 5}
                textAnchor="middle"
                fontSize={11}
                fill={Colors.textTertiary}>
                {d.month}
              </text>
            );
          })}
        </svg>
      </View>
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
  chartWrapper: {
    alignItems: 'center',
    overflow: 'hidden' as any,
  },
});

export default PortfolioChart;

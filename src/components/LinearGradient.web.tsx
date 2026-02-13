import React from 'react';
import {View, ViewStyle} from 'react-native';

interface LinearGradientProps {
  colors: string[];
  start?: {x: number; y: number};
  end?: {x: number; y: number};
  style?: ViewStyle | ViewStyle[];
  children?: React.ReactNode;
}

const LinearGradient: React.FC<LinearGradientProps> = ({
  colors,
  start = {x: 0, y: 0},
  end = {x: 1, y: 0},
  style,
  children,
}) => {
  const angle =
    Math.atan2(end.y - start.y, end.x - start.x) * (180 / Math.PI) + 90;

  const stops = colors
    .map((color, i) => {
      const pct = colors.length > 1 ? (i / (colors.length - 1)) * 100 : 0;
      return `${color} ${pct}%`;
    })
    .join(', ');

  const backgroundImage = `linear-gradient(${angle}deg, ${stops})`;

  const flatStyle = style
    ? Array.isArray(style)
      ? style.filter(Boolean)
      : [style]
    : [];

  return (
    <View style={[...flatStyle, {backgroundImage} as any]}>{children}</View>
  );
};

export default LinearGradient;

import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors} from '@theme';

interface OliveLogoProps {
  size?: number;
}

const OliveLogo: React.FC<OliveLogoProps> = ({size = 22}) => {
  const bodyW = size * 0.55;
  const bodyH = size * 0.75;
  const stemH = size * 0.22;
  const leafW = size * 0.32;
  const leafH = size * 0.18;

  return (
    <View style={[logoStyles.container, {width: size, height: size}]}>
      {/* Stem */}
      <View
        style={[
          logoStyles.stem,
          {
            width: 1.5,
            height: stemH,
            top: 0,
          },
        ]}
      />
      {/* Leaf */}
      <View
        style={[
          logoStyles.leaf,
          {
            width: leafW,
            height: leafH,
            top: stemH * 0.3,
            left: size * 0.5,
          },
        ]}
      />
      {/* Olive body */}
      <View
        style={[
          logoStyles.body,
          {
            width: bodyW,
            height: bodyH,
            borderRadius: bodyW / 2,
            bottom: 0,
          },
        ]}
      />
    </View>
  );
};

const logoStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  stem: {
    position: 'absolute',
    backgroundColor: Colors.accent,
  },
  leaf: {
    position: 'absolute',
    borderRadius: 50,
    borderWidth: 1.5,
    borderColor: Colors.accent,
    backgroundColor: 'transparent',
    transform: [{rotate: '35deg'}],
  },
  body: {
    borderWidth: 2,
    borderColor: Colors.accent,
    backgroundColor: 'transparent',
  },
});

export default OliveLogo;

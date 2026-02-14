import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import {OliveLogo} from '@components';
import {Colors, Typography, Spacing} from '@theme';

const SplashScreen: React.FC = () => {
  const pulseAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.3,
          duration: 1200,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [pulseAnim]);

  return (
    <View style={styles.container}>
      <Text style={styles.wordmark}>OLIVE</Text>
      <Animated.View style={{opacity: pulseAnim, marginTop: Spacing.lg}}>
        <OliveLogo size={48} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundPrimary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wordmark: {
    ...Typography.displayMedium,
    color: Colors.accent,
    letterSpacing: 8,
  },
});

export default SplashScreen;

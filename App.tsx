import React from 'react';
import {Platform, StatusBar, View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {BottomTabs} from './src/navigation';
import {Colors} from './src/theme';

const App: React.FC = () => {
  return (
    <View
      style={[
        styles.root,
        Platform.OS === 'web' && styles.rootWeb,
      ]}>
      <SafeAreaProvider>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={Colors.backgroundPrimary}
        />
        <NavigationContainer>
          <BottomTabs />
        </NavigationContainer>
      </SafeAreaProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.backgroundPrimary,
  },
  rootWeb: {
    height: '100vh' as any,
    overflow: 'hidden' as any,
  },
});

export default App;

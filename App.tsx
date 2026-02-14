import React from 'react';
import {Platform, StatusBar, View, Text, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {BottomTabs} from './src/navigation';
import {Colors} from './src/theme';
import {AuthProvider, useAuth} from './src/context/AuthContext';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import SplashScreen from './src/screens/SplashScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';

class ErrorBoundary extends React.Component<
  {children: React.ReactNode},
  {hasError: boolean; error: Error | null}
> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = {hasError: false, error: null};
  }

  static getDerivedStateFromError(error: Error) {
    return {hasError: true, error};
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={errorStyles.container}>
          <Text style={errorStyles.title}>RENDER ERROR</Text>
          <Text style={errorStyles.message}>
            {this.state.error?.message}
          </Text>
          <Text style={errorStyles.stack}>
            {this.state.error?.stack?.slice(0, 500)}
          </Text>
        </View>
      );
    }
    return this.props.children;
  }
}

const errorStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#8B1A1A',
    marginBottom: 12,
  },
  message: {
    fontSize: 14,
    color: '#8B1A1A',
    marginBottom: 12,
  },
  stack: {
    fontSize: 11,
    color: '#808080',
    fontFamily: 'monospace',
  },
});

export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack: React.FC = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="SignUp" component={SignUpScreen} />
  </Stack.Navigator>
);

const AppNavigator: React.FC = () => {
  const {user, isLoading, hasSeenOnboarding} = useAuth();

  if (isLoading) {
    return <SplashScreen />;
  }

  if (!user) {
    return <AuthStack />;
  }

  if (!hasSeenOnboarding) {
    return <OnboardingScreen />;
  }

  return <BottomTabs />;
};

const App: React.FC = () => {
  return (
    <View
      style={[
        styles.root,
        Platform.OS === 'web' && styles.rootWeb,
      ]}>
      <ErrorBoundary>
        <SafeAreaProvider>
          <StatusBar
            barStyle="dark-content"
            backgroundColor={Colors.backgroundPrimary}
          />
          <AuthProvider>
            <NavigationContainer>
              <AppNavigator />
            </NavigationContainer>
          </AuthProvider>
        </SafeAreaProvider>
      </ErrorBoundary>
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

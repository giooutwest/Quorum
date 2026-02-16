import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {FeedScreen} from './src/screens';
import {ClubsScreen} from './src/screens';
import {ProfileScreen} from './src/screens';
import {Colors, Typography} from './src/theme';
import {AuthProvider, useAuth} from './src/context/AuthContext';
import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';

type TabKey = 'deals' | 'pools' | 'you';
type AuthScreen = 'login' | 'signup';

// --- Geometric tab icons ---

// Deals icon — document with folded corner
const DealsIcon = ({focused}: {focused: boolean}) => (
  <View style={[iconStyles.box, focused && iconStyles.boxFocused]}>
    <View style={iconStyles.docBody}>
      <View style={iconStyles.docFold} />
      <View style={iconStyles.docLine} />
      <View style={[iconStyles.docLine, {width: 10}]} />
    </View>
  </View>
);

// Pools icon — diagonal pool outline with ladder and flamingo float
const PoolsIcon = ({focused}: {focused: boolean}) => (
  <View style={[iconStyles.box, focused && iconStyles.boxFocused]}>
    <View style={iconStyles.poolContainer}>
      <View style={iconStyles.poolShape}>
        <View style={iconStyles.ladderLeft} />
        <View style={iconStyles.ladderRight} />
        <View style={iconStyles.ladderRung1} />
        <View style={iconStyles.ladderRung2} />
        <View style={iconStyles.floatBody}>
          <View style={iconStyles.floatShades} />
        </View>
      </View>
    </View>
  </View>
);

// Profile icon — person silhouette (head + shoulders)
const ProfileIcon = ({focused}: {focused: boolean}) => (
  <View style={[iconStyles.box, focused && iconStyles.boxFocused]}>
    <View style={iconStyles.personHead} />
    <View style={iconStyles.personBody} />
  </View>
);

const iconStyles = StyleSheet.create({
  box: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.4,
  },
  boxFocused: {
    opacity: 1,
  },
  docBody: {
    width: 16,
    height: 20,
    borderWidth: 2,
    borderColor: Colors.primaryBlack,
    paddingTop: 7,
    paddingLeft: 2,
    gap: 3,
  },
  docFold: {
    position: 'absolute',
    top: -0.5,
    right: -0.5,
    width: 6,
    height: 6,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderColor: Colors.primaryBlack,
    backgroundColor: Colors.backgroundPrimary,
  },
  docLine: {
    width: 7,
    height: 2,
    backgroundColor: Colors.primaryBlack,
  },
  poolContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  poolShape: {
    width: 22,
    height: 14,
    borderWidth: 1.5,
    borderColor: Colors.primaryBlack,
    borderRadius: 3,
    transform: [{rotate: '-12deg'}],
  },
  ladderLeft: {
    position: 'absolute',
    top: -4,
    left: 2,
    width: 1.5,
    height: 8,
    backgroundColor: Colors.primaryBlack,
  },
  ladderRight: {
    position: 'absolute',
    top: -4,
    left: 6,
    width: 1.5,
    height: 8,
    backgroundColor: Colors.primaryBlack,
  },
  ladderRung1: {
    position: 'absolute',
    top: -2,
    left: 2,
    width: 5.5,
    height: 1.5,
    backgroundColor: Colors.primaryBlack,
  },
  ladderRung2: {
    position: 'absolute',
    top: 1,
    left: 2,
    width: 5.5,
    height: 1.5,
    backgroundColor: Colors.primaryBlack,
  },
  floatBody: {
    position: 'absolute',
    top: 2,
    right: 3,
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#E8788A',
    backgroundColor: 'transparent',
  },
  floatShades: {
    position: 'absolute',
    top: 2,
    left: 1,
    width: 5,
    height: 1.5,
    backgroundColor: Colors.primaryBlack,
    borderRadius: 1,
  },
  personHead: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primaryBlack,
    marginBottom: 2,
  },
  personBody: {
    width: 18,
    height: 8,
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
    backgroundColor: Colors.primaryBlack,
  },
});

// --- Error Boundary ---

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

// --- Tab config ---

const TABS: {key: TabKey; label: string; Icon: React.FC<{focused: boolean}>}[] = [
  {key: 'deals', label: 'Deals', Icon: DealsIcon},
  {key: 'pools', label: 'Pools', Icon: PoolsIcon},
  {key: 'you', label: 'You', Icon: ProfileIcon},
];

// --- Auth Navigator (web) ---

const AuthNavigator: React.FC = () => {
  const [screen, setScreen] = useState<AuthScreen>('login');

  const navigation = {
    navigate: (name: string) => {
      if (name === 'SignUp') setScreen('signup');
      if (name === 'Login') setScreen('login');
    },
    goBack: () => setScreen('login'),
  };

  if (screen === 'signup') {
    return <SignUpScreen navigation={navigation} />;
  }
  return <LoginScreen navigation={navigation} />;
};

// --- Main App Content ---

const AppContent: React.FC = () => {
  const {user, isLoading, hasSeenOnboarding} = useAuth();
  const [activeTab, setActiveTab] = useState<TabKey>('deals');

  if (isLoading) {
    return <SplashScreen />;
  }

  if (!user) {
    return <AuthNavigator />;
  }

  if (!hasSeenOnboarding) {
    return <OnboardingScreen />;
  }

  const renderScreen = () => {
    switch (activeTab) {
      case 'deals':
        return <FeedScreen />;
      case 'pools':
        return <ClubsScreen />;
      case 'you':
        return <ProfileScreen />;
    }
  };

  return (
    <>
      <View style={styles.screenContainer}>
        {renderScreen()}
      </View>

      <View style={styles.tabBar}>
        {TABS.map(({key, label, Icon}) => (
          <Pressable
            key={key}
            style={styles.tabItem}
            onPress={() => setActiveTab(key)}>
            <Icon focused={activeTab === key} />
            <Text
              style={[
                styles.tabLabel,
                activeTab === key
                  ? styles.tabLabelActive
                  : styles.tabLabelInactive,
              ]}>
              {label}
            </Text>
          </Pressable>
        ))}
      </View>
    </>
  );
};

// --- Main App ---

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <View style={styles.root}>
        <ErrorBoundary>
          <AuthProvider>
            <AppContent />
          </AuthProvider>
        </ErrorBoundary>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.backgroundPrimary,
    height: '100vh' as any,
    overflow: 'hidden' as any,
  },
  screenContainer: {
    flex: 1,
    overflow: 'auto' as any,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: Colors.backgroundPrimary,
    borderTopWidth: 1,
    borderTopColor: Colors.borderHeavy,
    height: 80,
    paddingTop: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  tabLabel: {
    ...Typography.headerSmall,
    fontSize: 10,
    letterSpacing: 0.5,
  },
  tabLabelActive: {
    color: Colors.primaryBlack,
  },
  tabLabelInactive: {
    color: Colors.textTertiary,
  },
});

export default App;

import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {FeedScreen} from './src/screens';
import {PortfolioScreen} from './src/screens';
import {Colors, Typography} from './src/theme';

type TabKey = 'deals' | 'portfolio';

// --- Geometric tab icons (matching native BottomTabs) ---

const DealsIcon = ({focused}: {focused: boolean}) => (
  <View style={[iconStyles.box, focused && iconStyles.boxFocused]}>
    <View style={iconStyles.innerSquare} />
  </View>
);

const PortfolioIcon = ({focused}: {focused: boolean}) => (
  <View style={[iconStyles.box, focused && iconStyles.boxFocused]}>
    <View style={iconStyles.barChart}>
      <View style={[iconStyles.bar, {height: 8}]} />
      <View style={[iconStyles.bar, {height: 14}]} />
      <View style={[iconStyles.bar, {height: 11}]} />
    </View>
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
  innerSquare: {
    width: 18,
    height: 18,
    borderWidth: 2.5,
    borderColor: Colors.primaryBlack,
  },
  barChart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 3,
  },
  bar: {
    width: 5,
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

// --- Main App ---

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('deals');

  return (
    <View style={styles.root}>
      <ErrorBoundary>
        <View style={styles.screenContainer}>
          {activeTab === 'deals' ? <FeedScreen /> : <PortfolioScreen />}
        </View>

        <View style={styles.tabBar}>
          <Pressable
            style={styles.tabItem}
            onPress={() => setActiveTab('deals')}>
            <DealsIcon focused={activeTab === 'deals'} />
            <Text
              style={[
                styles.tabLabel,
                activeTab === 'deals'
                  ? styles.tabLabelActive
                  : styles.tabLabelInactive,
              ]}>
              DEALS
            </Text>
          </Pressable>

          <Pressable
            style={styles.tabItem}
            onPress={() => setActiveTab('portfolio')}>
            <PortfolioIcon focused={activeTab === 'portfolio'} />
            <Text
              style={[
                styles.tabLabel,
                activeTab === 'portfolio'
                  ? styles.tabLabelActive
                  : styles.tabLabelInactive,
              ]}>
              PORTFOLIO
            </Text>
          </Pressable>
        </View>
      </ErrorBoundary>
    </View>
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
    borderTopWidth: 2,
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
    letterSpacing: 2,
  },
  tabLabelActive: {
    color: Colors.primaryBlack,
  },
  tabLabelInactive: {
    color: Colors.textTertiary,
  },
});

export default App;

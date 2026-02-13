import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {FeedScreen} from './src/screens';
import {PortfolioScreen} from './src/screens';
import {ClubsScreen} from './src/screens';
import {Colors, Typography} from './src/theme';

type TabKey = 'deals' | 'clubs' | 'portfolio';

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

// Clubs icon — pool with circle tube
const ClubsIcon = ({focused}: {focused: boolean}) => (
  <View style={[iconStyles.box, focused && iconStyles.boxFocused]}>
    <View style={iconStyles.poolOuter}>
      <View style={iconStyles.poolInner} />
    </View>
  </View>
);

// Portfolio icon — bar chart
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
  // Deals — document icon
  docBody: {
    width: 16,
    height: 20,
    borderWidth: 2.5,
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
    borderBottomWidth: 2.5,
    borderLeftWidth: 2.5,
    borderColor: Colors.primaryBlack,
    backgroundColor: Colors.backgroundPrimary,
  },
  docLine: {
    width: 7,
    height: 2,
    backgroundColor: Colors.primaryBlack,
  },
  // Clubs — pool with tube
  poolOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2.5,
    borderColor: Colors.primaryBlack,
    justifyContent: 'center',
    alignItems: 'center',
  },
  poolInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: Colors.primaryBlack,
  },
  // Portfolio — bar chart
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

// --- Tab config ---

const TABS: {key: TabKey; label: string; Icon: React.FC<{focused: boolean}>}[] = [
  {key: 'deals', label: 'DEALS', Icon: DealsIcon},
  {key: 'clubs', label: 'CLUBS', Icon: ClubsIcon},
  {key: 'portfolio', label: 'PORTFOLIO', Icon: PortfolioIcon},
];

// --- Main App ---

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('deals');

  const renderScreen = () => {
    switch (activeTab) {
      case 'deals':
        return <FeedScreen />;
      case 'clubs':
        return <ClubsScreen />;
      case 'portfolio':
        return <PortfolioScreen />;
    }
  };

  return (
    <View style={styles.root}>
      <ErrorBoundary>
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

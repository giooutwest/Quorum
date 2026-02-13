import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, StyleSheet} from 'react-native';
import {FeedScreen, PortfolioScreen, ClubsScreen} from '@screens';
import {Colors, Typography} from '@theme';

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

// Pools icon — diagonal pool outline with ladder and flamingo float
const PoolsIcon = ({focused}: {focused: boolean}) => (
  <View style={[iconStyles.box, focused && iconStyles.boxFocused]}>
    <View style={iconStyles.poolContainer}>
      {/* Pool shape — tilted rectangle */}
      <View style={iconStyles.poolShape}>
        {/* Ladder — left side */}
        <View style={iconStyles.ladderLeft} />
        <View style={iconStyles.ladderRight} />
        <View style={iconStyles.ladderRung1} />
        <View style={iconStyles.ladderRung2} />
        {/* Flamingo float — circle with accent color */}
        <View style={iconStyles.floatBody}>
          <View style={iconStyles.floatShades} />
        </View>
      </View>
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
  // Pools — diagonal pool with ladder and flamingo
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
});

export type BottomTabParamList = {
  Feed: undefined;
  Pools: undefined;
  Portfolio: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabs: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.backgroundPrimary,
          borderTopWidth: 1,
          borderTopColor: Colors.borderHeavy,
          height: 80,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          ...Typography.headerSmall,
          fontSize: 10,
          letterSpacing: 0.5,
        },
        tabBarActiveTintColor: Colors.primaryBlack,
        tabBarInactiveTintColor: Colors.textTertiary,
      }}>
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          tabBarLabel: 'Deals',
          tabBarIcon: ({focused}) => <DealsIcon focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Pools"
        component={ClubsScreen}
        options={{
          tabBarLabel: 'Pools',
          tabBarIcon: ({focused}) => <PoolsIcon focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Portfolio"
        component={PortfolioScreen}
        options={{
          tabBarLabel: 'Portfolio',
          tabBarIcon: ({focused}) => <PortfolioIcon focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;

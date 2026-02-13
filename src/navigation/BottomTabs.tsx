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

// Clubs icon — pool with circle tube
const ClubsIcon = ({focused}: {focused: boolean}) => (
  <View style={[iconStyles.box, focused && iconStyles.boxFocused]}>
    <View style={iconStyles.poolOuter}>
      <View style={iconStyles.poolInner} />
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
});

export type BottomTabParamList = {
  Feed: undefined;
  Clubs: undefined;
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
          borderTopWidth: 2,
          borderTopColor: Colors.borderHeavy,
          height: 80,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          ...Typography.headerSmall,
          fontSize: 10,
          letterSpacing: 2,
        },
        tabBarActiveTintColor: Colors.primaryBlack,
        tabBarInactiveTintColor: Colors.textTertiary,
      }}>
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          tabBarLabel: 'DEALS',
          tabBarIcon: ({focused}) => <DealsIcon focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Clubs"
        component={ClubsScreen}
        options={{
          tabBarLabel: 'CLUBS',
          tabBarIcon: ({focused}) => <ClubsIcon focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Portfolio"
        component={PortfolioScreen}
        options={{
          tabBarLabel: 'PORTFOLIO',
          tabBarIcon: ({focused}) => <PortfolioIcon focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;

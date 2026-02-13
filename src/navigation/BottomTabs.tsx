import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, StyleSheet} from 'react-native';
import {FeedScreen, PortfolioScreen} from '@screens';
import {Colors, Typography} from '@theme';

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

export type BottomTabParamList = {
  Feed: undefined;
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

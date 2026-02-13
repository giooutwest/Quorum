import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, StyleSheet} from 'react-native';
import {FeedScreen, ClubsScreen, ProfileScreen} from '@screens';
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
  // Profile — person silhouette
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

export type BottomTabParamList = {
  Feed: undefined;
  Pools: undefined;
  Profile: undefined;
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
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'You',
          tabBarIcon: ({focused}) => <ProfileIcon focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;

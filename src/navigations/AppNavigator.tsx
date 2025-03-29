// src/navigation/AppNavigator.js
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home/HomeScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';
import {SCREENS} from './utils';
import TabBarIcon from './TabBarIcon'; // Import the reusable icon component
import {Colors} from '../configs/Colors';
import VideoDetailsScreen from '../screens/videoDetails/VideoDetailsScreen';
import {VideoType} from '../types/video';

export type RootStackParamList = {
  [SCREENS.home]: undefined; // No params,
  [SCREENS.settings]: undefined;
  [SCREENS.videoDetails]: {video?: VideoType}; // Params for VideoDetailScreen
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: Colors.primary,
      tabBarInactiveTintColor: Colors.grey,
      tabBarStyle: {backgroundColor: 'white'},
    }}>
    <Tab.Screen
      options={{
        tabBarIcon: ({focused}) => (
          <TabBarIcon name="house" focused={focused} />
        ),
      }}
      name={SCREENS.home}
      component={HomeScreen}
    />
    <Tab.Screen
      options={{
        tabBarIcon: ({focused}) => (
          <TabBarIcon name="toolbox" focused={focused} />
        ),
      }}
      name={SCREENS.settings}
      component={SettingsScreen}
    />
  </Tab.Navigator>
);

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Main">
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen
        name={SCREENS.videoDetails}
        component={VideoDetailsScreen}
      />
      {/* Add other screens as needed */}
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../components/HomeScreen';
import MissionScreen from '../components/MissionScreen';
import MorningProgramScreen from '../components/MorningProgram';
import NavigationScreen from '../components/NavigationScreen';
import TipsScreen from '../components/TipsScreen';

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  Home: undefined;
  Navigation: { schoolName: string };
  Tracker: undefined;
  Mission: undefined;
};

function AppNavigation() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
        <Stack.Screen
          name="Navigation"
          component={NavigationScreen}
          options={({ navigation }) => ({
            headerTitle: '', // Remove title
            headerLeft: () => (
              <Icon name="arrow-back" size={24} color="black" onPress={() => navigation.goBack()} />
            ),
            headerBackVisible: false, // Hide the default back button
            headerStyle: {
              // Optional: if you want to style the header area
              minHeight: 0,
              elevation: 0, // for Android
              shadowOpacity: 0, // for iOS
            },
            headerLeftContainerStyle: {
              // Optional: style for back button container
            },
          })}
        />
        <Stack.Screen
          name="Mission"
          component={MissionScreen}
          options={({ navigation }) => ({
            headerTitle: '', // Remove title
            headerLeft: () => (
              <Icon name="arrow-back" size={24} color="black" onPress={() => navigation.goBack()} />
            ),
            headerBackVisible: false, // Hide the default back button
            headerStyle: {
              // Optional: if you want to style the header area
              minHeight: 0,
              elevation: 0, // for Android
              shadowOpacity: 0, // for iOS
            },
            headerLeftContainerStyle: {
              // Optional: style for back button container
            },
          })}
        />
        <Stack.Screen
          name="Tips"
          component={TipsScreen}
          options={({ navigation }) => ({
            headerTitle: '',
            headerLeft: () => (
              <Icon name="arrow-back" size={24} color="black" onPress={() => navigation.goBack()} />
            ),
            headerBackVisible: false, // Hide the default back button
            headerStyle: {
              // Optional: if you want to style the header area
              minHeight: 0,
              elevation: 0, // for Android
              shadowOpacity: 0, // for iOS
            },
            headerLeftContainerStyle: {
              // Optional: style for back button container
            },
          })}
        />
        <Stack.Screen
          name="Morning"
          component={MorningProgramScreen}
          options={({ navigation }) => ({
            headerTitle: '', // Remove title
            headerLeft: () => (
              <Icon name="arrow-back" size={24} color="black" onPress={() => navigation.goBack()} />
            ),
            headerBackVisible: false, // Hide the default back button
            headerStyle: {
              // Optional: if you want to style the header area
              minHeight: 0,
              elevation: 0, // for Android
              shadowOpacity: 0, // for iOS
            },
            headerLeftContainerStyle: {
              // Optional: style for back button container
            },
          })}
        />
      </Stack.Navigator>
    </GestureHandlerRootView>
  );
}

export default AppNavigation;

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from './HomeScreen';
import NavigationScreen from './NavigationScreen';
import TrackerScreen from './TrackerScreen';

const Stack = createNativeStackNavigator();

function AppNavigation() {
  return (
    //<NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
      <Stack.Screen name="Navigation" component={NavigationScreen} />
      <Stack.Screen name="Tracker" component={TrackerScreen} />
    </Stack.Navigator>
    //</NavigationContainer>
  );
}

export default AppNavigation;

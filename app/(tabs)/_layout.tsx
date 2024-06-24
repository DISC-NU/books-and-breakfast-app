import { FontAwesome } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Redirect, Tabs } from 'expo-router';
import React, { useContext } from 'react';

import Context from '../components/Context';

export default function TabLayout() {
  const { userInfo } = useContext(Context);

  // If user is not signed in, redirect to login page
  if (!userInfo) {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#36afbc',
        headerShown: false,
        tabBarStyle: {
          paddingTop: 5,
          display: !userInfo?.isRegistered ? 'none' : 'flex', // hide tab bar if user is not registered
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="transportation"
        options={{
          title: 'Transportation',
          tabBarIcon: ({ color }) => <Ionicons name="car" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color }) => <FontAwesome name="user" size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}

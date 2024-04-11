import React from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';

type ScreenWrapperProps = {
  children: React.ReactNode;
};

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({ children }) => {
  const statusBarHeight = StatusBar.currentHeight
    ? StatusBar.currentHeight
    : Platform.OS === 'ios'
      ? 30
      : 0;

  return (
    <SafeAreaView style={[styles.wrapper, { paddingTop: statusBarHeight }]}>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Ensure this is set to white
    // Other styles as necessary...
  },
});

export default ScreenWrapper;

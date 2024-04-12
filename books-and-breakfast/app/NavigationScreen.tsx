import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const NavigationScreen = () => {
  // Using the useNavigation hook to access navigation in this component
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Navigation Information</Text>
    </View>
  );
};

// Add styles for your DetailsScreen here
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 22,
    marginBottom: 20,
  },
});

export default NavigationScreen;

import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { SchoolTipsPage } from './TipsScreen';


const NavigationScreen = ({route, navigation}) => {
  // Using the useNavigation hook to access navigation in this component
  navigation = useNavigation();

  //passing in school name to article page from dropdown selection
  const { schoolName } = route.params;

  return (
    <View style={styles.container}>
      <SchoolTipsPage schoolName={schoolName} />
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

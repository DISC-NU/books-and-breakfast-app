import { useNavigation } from '@react-navigation/native';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';

import { SchoolTransportDetails } from './SchoolTransportDetails';

// // Define your navigation stack types as needed
// type NavigationScreenRouteParams = {
//   schoolName: string;
// };

const NavigationScreen = ({ route, navigation }) => {
  // Using the useNavigation hook to access navigation in this component
  navigation = useNavigation();

  //passing in school name to article page from dropdown selection
  const { schoolName } = route.params;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
      <View style={styles.container}>
        <SchoolTransportDetails schoolName={schoolName} />
      </View>
    </KeyboardAvoidingView>
  );
};

// Add styles for your DetailsScreen here
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});

export default NavigationScreen;

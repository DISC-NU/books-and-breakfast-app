import { useNavigation } from '@react-navigation/native';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';

import { SchoolTransportDetails } from './SchoolTransportDetails';

// // Define your navigation stack types as needed
// type NavigationScreenRouteParams = {
//   schoolName: string;
// };

const NavigationScreen = ({ route, navigation }) => {
  // Using the useNavigation hook to access navigation in this component
  navigation = useNavigation();

  //passing in school name to article page from dropdown selection
  const { schoolName, canEdit } = route.params;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 85 : 0}>
      <SchoolTransportDetails schoolName={schoolName} canEdit={canEdit} />
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
  text: {
    fontSize: 22,
    marginBottom: 20,
  },
});

export default NavigationScreen;

import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';

import Context from './Context';
import { SchoolTransportDetails } from './SchoolTransportDetails';

const NavigationScreen = ({ navigation }) => {
  // Using the useNavigation hook to access navigation in this component
  navigation = useNavigation();
  const { userInfo } = useContext(Context);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 85 : 0}>
      <SchoolTransportDetails schoolName={userInfo.schoolName} canEdit={userInfo.isAdmin} />
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

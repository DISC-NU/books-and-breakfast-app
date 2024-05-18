import { useNavigation } from '@react-navigation/native';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';

import TipsDetails from './TipsDetails';

const TipsScreen = ({ route, navigation }) => {
  navigation = useNavigation();

  const { schoolName } = route.params;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 85 : 0}>
      <TipsDetails schoolName={schoolName} />
    </KeyboardAvoidingView>
  );
};

export default TipsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
});

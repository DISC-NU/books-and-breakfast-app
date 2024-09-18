import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';

import Context from './Context';
import TipsDetails from './TipsDetails';

const TipsScreen = ({ navigation }) => {
  navigation = useNavigation();
  const { userInfo } = useContext(Context);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 85 : 0}>
      <TipsDetails schoolName={userInfo.schoolName} canEdit={userInfo.isAdmin} />
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

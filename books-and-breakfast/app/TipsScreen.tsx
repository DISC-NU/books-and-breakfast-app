import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';

import TipsDetails from './TipsDetails';

const TipsScreen = ({ route, navigation }) => {
  navigation = useNavigation();

  const { schoolName } = route.params;

  return (
    <View style={styles.container}>
      <TipsDetails schoolName={schoolName} />
    </View>
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
});

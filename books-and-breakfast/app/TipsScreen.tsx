import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';

import TipsDetails from './TipsDetails';

const TipsScreen = ({ route, navigation }) => {
  navigation = useNavigation();

  const { schoolName } = route.params;

  return (
    <View style={styles.container}>
      <TipsDetails schoolName={schoolName} />
      <Text style={styles.text}>HELLO IS ANYTHING RENDERING</Text>
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
  text: {
    fontSize: 20,
    marginBottom: 20,
  }
});

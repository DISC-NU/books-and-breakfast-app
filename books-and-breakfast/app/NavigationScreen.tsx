import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';


// // Define your navigation stack types as needed
// type NavigationScreenRouteParams = {
//   schoolName: string;
// };



const NavigationScreen = ({route, navigation}) => {
const NavigationScreen = ({ route, navigation }) => {
  // Using the useNavigation hook to access navigation in this component
  navigation = useNavigation();

  //passing in school name to article page from dropdown selection
  const { schoolName } = route.params;

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
    backgroundColor: 'white',
  },
});

export default NavigationScreen;

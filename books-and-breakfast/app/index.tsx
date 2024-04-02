import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SchoolTransportDetails } from './schooltransportdetails';

export default function App() {
  return (
    <View style={styles.container}>
      <SchoolTransportDetails schoolName={'willard'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
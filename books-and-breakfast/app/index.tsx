import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <SchoolTransportDetails
        schoolName="Willard Elementary Transportation"
        location="2700 Hurd Ave., Evanston, IL 60201"
        directions="All volunteers will enter the building using door #4, off of Park Place (at Hurd). The door will be unlocked, but if you have any issue send a text message to Juan using the number you will find on a B&B sign at door #4."
        parkingInfo="If you are driving, you can park on Hurd Ave. or on Central Park Ave. (*pay attention to the signs for street cleaning)."
        publicTransportInfo="For public transportation, you can take the 201 CTA BUS (going down Central St. to Old Orchard) from NU campus to Lincolnwood Ave., then walk 1 block west to Hurd, then go right 1.5 blocks to Park Pl. to find door #4."
      />
    </View>
  );
}

const Divider = ({ color = '#D9D9D9', thickness = 1, marginVertical = 20 }) => (
  <View
    style={{
      height: thickness,
      width: '100%',
      backgroundColor: color,
      marginVertical: marginVertical,
    }}
  />
);

const SchoolTransportDetails = ({
  schoolName,
  location,
  directions,
  parkingInfo,
  publicTransportInfo,
  rideShareInfo,
}) => {
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContentContainer}>
      <View style={styles.section}>
        <Text style={styles.header}>Directions</Text>
        <Text style={styles.text}>{directions}</Text>
        <Divider />
      </View>
      <View style={styles.section}>
        <Text style={styles.header}>Parking</Text>
        <Text style={styles.text}>{parkingInfo}</Text>
        <Divider />
      </View>
      <View style={styles.section}>
        <Text style={styles.header}>Public Transportation</Text>
        <Text style={styles.text}>{publicTransportInfo}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollViewContentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 30,
  },
  section: {
    margin: 0,
    width: '100%',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left',
  },
  text: {
    fontSize: 16,
    textAlign: 'left',
    lineHeight: 23,
  },
});

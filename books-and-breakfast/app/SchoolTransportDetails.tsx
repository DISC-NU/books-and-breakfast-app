import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';

import { DIRECTIONS_INFO } from './data/SchoolDirections';

const screenHeight = Dimensions.get('window').height;

const ArticleHeader = ({ schoolName, location }: { schoolName: string; location: string }) => (
  <View style={styles.headerContainer}>
    <Text style={styles.headerTitle}>{schoolName}</Text>
    <Text style={styles.headerLocation}>{location}</Text>
  </View>
);

const Divider = ({ color = '#D9D9D9', thickness = 1, marginVertical = 20 }) => (
  <View
    style={{
      height: thickness,
      width: '100%',
      backgroundColor: color,
      marginVertical,
    }}
  />
);

export const SchoolTransportDetails = ({ schoolName }: { schoolName: string }) => {
  const transportDetails = DIRECTIONS_INFO[schoolName];
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContentContainer}>
      <ArticleHeader schoolName={transportDetails.schoolName} location={transportDetails.address} />
      <View style={styles.section}>
        <Text style={styles.header}>Directions</Text>
        <Text style={styles.text}>{transportDetails.specifics}</Text>
      </View>
      {transportDetails.driving && (
        <View style={styles.section}>
          <Divider />
          <Text style={styles.header}>Parking</Text>
          <Text style={styles.text}>{transportDetails.driving}</Text>
        </View>
      )}
      {transportDetails.publicTransport && (
        <View style={styles.section}>
          <Divider />
          <Text style={styles.header}>Public Transportation</Text>
          <Text style={styles.text}>{transportDetails.publicTransport}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContentContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 30,
    minHeight: screenHeight,
    flexGrow: 1,
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
  headerContainer: {
    borderRadius: 20,
    padding: 20,
    width: '95%',
    backgroundColor: 'rgba(255,228,181, 0.2)',
    marginBottom: 25,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  headerLocation: {
    fontSize: 12,
  },
  text: {
    fontSize: 16,
    textAlign: 'left',
    lineHeight: 23,
  },
});

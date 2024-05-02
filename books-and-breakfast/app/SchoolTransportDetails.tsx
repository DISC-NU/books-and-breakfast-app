import { useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';

import { SchoolDirections } from './data/SchoolDirections';
import { getSchoolDirections } from './firebase/util';

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
  const [directionsInfo, setDirectionsInfo] = useState<SchoolDirections>();

  useEffect(() => {
    const fetchSchoolDirections = async () => {
      try {
        const directionsInfo = await getSchoolDirections(schoolName);
        if (directionsInfo != null) {
          setDirectionsInfo(directionsInfo);
        }
      } catch (error) {
        console.error('Failed to fetch school directions info', error);
      }
    };
    fetchSchoolDirections();
  }, [schoolName]);

  return (
    <>
      {directionsInfo && (
        <ScrollView contentContainerStyle={styles.scrollViewContentContainer}>
          <ArticleHeader schoolName={directionsInfo.schoolName} location={directionsInfo.address} />
          <View style={styles.section}>
            <Text style={styles.header}>Directions</Text>
            <Text style={styles.text}>{directionsInfo.specifics}</Text>
          </View>
          {directionsInfo.driving && (
            <View style={styles.section}>
              <Divider />
              <Text style={styles.header}>Parking</Text>
              <Text style={styles.text}>{directionsInfo.driving}</Text>
            </View>
          )}
          {directionsInfo.publicTransport && (
            <View style={styles.section}>
              <Divider />
              <Text style={styles.header}>Public Transportation</Text>
              <Text style={styles.text}>{directionsInfo.publicTransport}</Text>
            </View>
          )}
        </ScrollView>
      )}
    </>
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

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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // This useEffect is triggered when the component mounts and anytime the schoolName prop changes.
  useEffect(() => {
    // Define an asynchronous function inside the effect that will fetch the school directions.
    const fetchSchoolDirections = async () => {
      setIsLoading(true); // Set loading state to true to show a loading indicator
      setError(null); // Reset error state to null to clear previous errors

      try {
        // Attempt to fetch directions using the schoolName parameter.
        const directionsInfo = await getSchoolDirections(schoolName);

        // If fetch is successful and directions are returned, update state.
        if (directionsInfo != null) {
          setDirectionsInfo(directionsInfo);
        } else {
          // If no data is returned, set an appropriate error message.
          setError('No directions available for this school.');
        }
      } catch (error) {
        console.error('Failed to fetch school directions info', error); // Log error to console for debugging.
        setError('Failed to load directions. Please try again later.'); // Set user-friendly error message.
      } finally {
        setIsLoading(false); // Ensure loading state is set to false when fetch is complete.
      }
    };

    // Call the fetch function defined above.
    fetchSchoolDirections();
  }, [schoolName]); // The effect depends on schoolName, so it re-runs when schoolName changes.

  // Conditionally render UI based on the state of the data fetch.
  if (isLoading) {
    return <Text>Loading...</Text>; // Display loading text while data is being fetched.
  }
  if (error) {
    return <Text>{error}</Text>; // Show any error messages if present.
  }

  // Main content rendering, conditioned on having valid directions data.
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContentContainer}>
      {directionsInfo && (
        <>
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
        </>
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

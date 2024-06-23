import React, { useEffect, useState } from 'react';
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { showLocation } from 'react-native-map-link';
import FaIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  SchoolDirections,
  listenToSchoolDirections,
  updateSchoolDirections,
} from '../firebase/util';
import EditText from './EditText';

const screenHeight = Dimensions.get('window').height;

// Props interface for ArticleHeader component
interface ArticleHeaderProps {
  schoolName: string;
  location: string;
  latitude: string;
  longitude: string;
}

// Component to display the header with school name and location
const ArticleHeader: React.FC<ArticleHeaderProps> = ({
  schoolName,
  location,
  latitude,
  longitude,
}) => (
  <View style={styles.headerContainer}>
    <Text style={styles.headerTitle}>{schoolName}</Text>
    <TouchableOpacity
      onPress={() =>
        showLocation({
          latitude,
          longitude,
          googleForceLatLon: true, // force GoogleMaps to use the latitude and longitude for the query instead of the title
          alwaysIncludeGoogle: true, // include Google Maps
          title: schoolName, // display school name as the title in the map location
        })
      }>
      <View style={styles.row}>
        <FaIcon name="map-marker" size={20} color="#36afbc" />
        <Text style={[styles.headerLocation]}>{location}</Text>
      </View>
    </TouchableOpacity>
  </View>
);

// Props interface for Divider component
interface DividerProps {
  color?: string;
  thickness?: number;
  marginVertical?: number;
}

// Component to render a customizable divider line
const Divider: React.FC<DividerProps> = ({
  color = '#D9D9D9',
  thickness = 1,
  marginVertical = 20,
}) => (
  <View
    style={{
      height: thickness,
      width: '100%',
      backgroundColor: color,
      marginVertical,
    }}
  />
);

// Props interface for SchoolTransportDetails component
interface SchoolTransportDetailsProps {
  schoolName: string;
  canEdit?: boolean;
}

// Main component to display and edit school transportation details
export const SchoolTransportDetails: React.FC<SchoolTransportDetailsProps> = ({
  schoolName,
  canEdit,
}) => {
  const [directionsInfo, setDirectionsInfo] = useState<SchoolDirections | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [edit, setEdit] = useState(false);

  // Function to handle saving updated school directions
  const handleSave = async (schoolName: string, field: string, value: string) => {
    try {
      await updateSchoolDirections(schoolName, field, value);
      setDirectionsInfo((prev) => ({ ...prev, [field]: value })); // Update local state
    } catch (error) {
      console.error('Failed to update school directions', error);
      setError('Failed to update school directions. Please try again later.');
    }
  };

  // Effect to listen to real-time updates for school directions
  useEffect(() => {
    const unsubscribe = listenToSchoolDirections(schoolName, (data) => {
      if (data) {
        setDirectionsInfo(data);
      } else {
        setError('No directions available for this school.');
      }
      setIsLoading(false);
    });

    // Clean up listener on component unmount or when schoolName changes
    return () => unsubscribe();
  }, [schoolName]);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <View>
      <ScrollView contentContainerStyle={styles.scrollViewContentContainer}>
        {directionsInfo && (
          <>
            <ArticleHeader
              schoolName={directionsInfo.schoolName}
              location={directionsInfo.address}
              latitude={directionsInfo.geoLat}
              longitude={directionsInfo.geoLong}
            />
            <View style={styles.section}>
              <Text style={styles.header}>Directions</Text>
              <EditText
                value={directionsInfo.specifics}
                onSave={(newValue) => handleSave(directionsInfo.schoolName, 'specifics', newValue)}
                edit={edit}
                setEdit={setEdit}
                display="directions"
              />
            </View>
            {directionsInfo.driving && (
              <View style={styles.section}>
                <Divider />
                <Text style={styles.header}>Parking</Text>
                <EditText
                  value={directionsInfo.driving}
                  onSave={(newValue) => handleSave(directionsInfo.schoolName, 'driving', newValue)}
                  edit={edit}
                  setEdit={setEdit}
                  display="directions"
                />
              </View>
            )}
            {directionsInfo.publicTransport && (
              <View style={styles.section}>
                <Divider />
                <Text style={styles.header}>Public Transportation</Text>
                <EditText
                  value={directionsInfo.publicTransport}
                  onSave={(newValue) =>
                    handleSave(directionsInfo.schoolName, 'publicTransport', newValue)
                  }
                  edit={edit}
                  setEdit={setEdit}
                  display="directions"
                />
              </View>
            )}
          </>
        )}
      </ScrollView>
      {!edit && canEdit && (
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? '#0056b3' : '#007AFF',
            },
            styles.button,
          ]}
          onPress={() => setEdit(!edit)}>
          <Icon name="edit" size={30} color="white" />
        </Pressable>
      )}
    </View>
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
    position: 'relative',
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
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  headerLocation: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingLeft: 10,
    color: '#36afbc',
    textDecorationLine: 'underline',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: 'black',
  },
});

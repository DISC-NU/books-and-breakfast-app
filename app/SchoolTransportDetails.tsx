import React, { useEffect, useState } from 'react';
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import EditText from './components/EditText';
import { SchoolDirections } from './data/SchoolDirections';
import { listenToSchoolDirections, updateSchoolDirections } from './firebase/util';

const screenHeight = Dimensions.get('window').height;

// Props interface for ArticleHeader component
interface ArticleHeaderProps {
  schoolName: string;
  location: string;
}

// Component to display the header with school name and location
const ArticleHeader: React.FC<ArticleHeaderProps> = ({ schoolName, location }) => (
  <View style={styles.headerContainer}>
    <Text style={styles.headerTitle}>{schoolName}</Text>
    <Text style={styles.headerLocation}>{location}</Text>
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
}

// Main component to display and edit school transportation details
export const SchoolTransportDetails: React.FC<SchoolTransportDetailsProps> = ({ schoolName }) => {
  const [directionsInfo, setDirectionsInfo] = useState<SchoolDirections | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [edit, setEdit] = useState(false);

  // Function to handle saving updated school directions
  const handleSave = async (schoolName: string, field: string, value: string) => {
    try {
      await updateSchoolDirections(schoolName, field, value);
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
            />
            <View style={styles.section}>
              <Text style={styles.header}>Directions</Text>
              <EditText
                value={directionsInfo.specifics}
                onSave={(newValue) => handleSave(directionsInfo.schoolName, 'specifics', newValue)}
                edit={edit}
                setEdit={setEdit}
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
                />
              </View>
            )}
          </>
        )}
      </ScrollView>
      {!edit && (
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
    fontSize: 12,
  },
  text: {
    fontSize: 16,
    textAlign: 'left',
    lineHeight: 23,
  },
  editText: {
    fontSize: 16,
    textAlign: 'left',
    lineHeight: 23,
    borderWidth: 0.5,
    borderColor: 'gray',
    padding: 15,
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

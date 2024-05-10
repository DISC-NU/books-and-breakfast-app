import { useEffect, useState } from 'react';
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

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

// TEXTINPUT FOR EDITABLE TEXT FIELDS ON THE SCREEN
const EditText = ({
  value,
  onSave,
  edit,
  setEdit,
}: {
  value: string;
  onSave: (newValue: string) => void;
}) => {
  const [text, setText] = useState(value);

  const finishSave = () => {
    onSave(text);
    setEdit(false); // exit out of editing mode
  };
  return edit ? (
    <TextInput
      style={styles.editText}
      value={text}
      onChangeText={setText}
      onBlur={finishSave} // save after user is done editing
      multiline // keeps multiline view in edit mode
    />
  ) : (
    <Text style={styles.text}>{value}</Text>
  );
};

export const SchoolTransportDetails = ({ schoolName }: { schoolName: string }) => {
  const [directionsInfo, setDirectionsInfo] = useState<SchoolDirections>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [edit, setEdit] = useState(false);

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

  const handleSave = (field: keyof typeof transportDetails, value: string) => {
    // setTransportDetails({ ...transportDetails, [field]: value }); // creates new state object
  };

  // Main content rendering, conditioned on having valid directions data.
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
                onSave={(newValue) => handleSave('specifics', newValue)}
                edit={edit}
                setEdit={setEdit}
              />
            </View>
            {directionsInfo.driving && (
              <View style={styles.section}>
                <Divider />
                <Text style={styles.header}>Parking</Text>
                <EditText
                  value={directionsInfo.parking}
                  onSave={(newValue) => handleSave('specifics', newValue)}
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
                  onSave={(newValue) => handleSave('specifics', newValue)}
                  edit={edit}
                  setEdit={setEdit}
                />
              </View>
            )}
          </>
        )}
      </ScrollView>
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
    alignContent: 'center',
    justifyContent: 'center',
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

import { useState } from 'react';
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
  const [transportDetails, setTransportDetails] = useState(DIRECTIONS_INFO[schoolName]); // for updating when user edits
  const [edit, setEdit] = useState(false);

  const handleSave = (field: keyof typeof transportDetails, value: string) => {
    setTransportDetails({ ...transportDetails, [field]: value }); // creates new state object
  };

  return (
    <View>
      <ScrollView contentContainerStyle={styles.scrollViewContentContainer}>
        <ArticleHeader
          schoolName={transportDetails.schoolName}
          location={transportDetails.address}
        />
        <View style={styles.section}>
          <Text style={styles.header}>Directions</Text>
          <EditText
            value={transportDetails.specifics}
            onSave={(newValue) => handleSave('specifics', newValue)}
            edit={edit}
            setEdit={setEdit}
          />
        </View>
        {transportDetails.driving && (
          <View style={styles.section}>
            <Divider />
            <Text style={styles.header}>Parking</Text>
            <EditText
              value={transportDetails.driving}
              onSave={(newValue) => handleSave('driving', newValue)}
              edit={edit}
              setEdit={setEdit}
            />
          </View>
        )}
        {transportDetails.publicTransport && (
          <View style={styles.section}>
            <Divider />
            <Text style={styles.header}>Public Transportation</Text>
            <EditText
              value={transportDetails.publicTransport}
              onSave={(newValue) => handleSave('publicTransport', newValue)}
              edit={edit}
              setEdit={setEdit}
            />
          </View>
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

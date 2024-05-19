import React, { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

import EditText from './components/EditText';
import { addNewTip, deleteTip, listenToTips, updateTipsInfo } from './firebase/util';
import LightbulbIcon from './icons/LightbulbIcon';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export const TipsDetails = ({ schoolName }: { schoolName: string }) => {
  const [tipArray, setTipArray] = useState<{ id: string; content: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [edit, setEdit] = useState(false);
  const [newTipContent, setNewTipContent] = useState('');

  // Function to handle saving updated tips
  const handleSave = async (schoolName: string, newValue: string, tipID: string) => {
    try {
      console.log(tipArray);
      console.log(newValue);
      // Update the tip in the database
      await updateTipsInfo(schoolName, newValue, tipID);

      // Update the local state to reflect the change
      setTipArray((prevTips) =>
        prevTips.map((tip) => (tip.id === tipID ? { ...tip, content: newValue } : tip))
      );

      console.log(tipArray);

      console.log('Tip updated successfully');
    } catch (error) {
      console.error('Failed to update school tips', error);
      setError('Failed to update school tips. Please try again later.');
    }
  };

  // Function to handle adding new tip
  const handleAddTip = async () => {
    if (newTipContent.length === 0) {
      Alert.alert('Please enter text for your tip.');
      return;
    }
    try {
      const newTip = { content: newTipContent };
      console.log('Adding new tip:', newTip);

      // Generate a new reference with a unique key
      const newTipRef = await addNewTip(schoolName, newTip);

      // Capture the unique key
      const newTipID = newTipRef.key;
      console.log('New tip added successfully with ID:', newTipID);

      // setTipArray((prevTips) => [...prevTips, { id: newTipID, content: newTipContent }]);

      console.log(tipArray);

      // Clear the input field after adding the new tip
      setNewTipContent('');
    } catch (error) {
      console.error('Failed to add new tip:', error);
      setError('Failed to add new tip. Please try again later.');
    }
  };

  // Function to handle deleting a tip
  const handleDelete = async (tipID: string) => {
    try {
      console.log('Attempting to delete tip with ID:', tipID); // Log the tipID being deleted
      await deleteTip(schoolName, tipID);
      setTipArray((prevTips) => prevTips.filter((tip) => tip.id !== tipID));
      console.log('Tip deleted successfully:', tipID);
    } catch (error) {
      console.error('Failed to delete tip:', error);
      setError('Failed to delete tip. Please try again later.');
    }
  };

  // Render the delete action
  const renderRightActions = (tipID: string) => {
    return (
      <Pressable style={style.deleteButton} onPress={() => handleDelete(tipID)}>
        <Text style={style.deleteButtonText}>Delete</Text>
      </Pressable>
    );
  };

  // Effect to listen to real-time updates for school tips
  useEffect(() => {
    const unsubscribe = listenToTips(schoolName, (tips) => {
      if (tips) {
        console.log(tips);
        setTipArray(tips);
      } else {
        setError('No tips available for this school.');
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
      <ScrollView contentContainerStyle={style.scrollViewContentContainer}>
        <Text style={style.title}>Tips!</Text>
        <View style={style.section}>
          {tipArray.map((tip) => (
            <Swipeable key={tip.id} renderRightActions={() => renderRightActions(tip.id)}>
              <View style={style.standoutText}>
                <LightbulbIcon style={style.icon} />
                <EditText
                  value={tip.content}
                  onSave={(newValue) => handleSave(schoolName, newValue, tip.id)}
                  edit={edit}
                  setEdit={setEdit}
                  display="tips"
                />
              </View>
            </Swipeable>
          ))}
          {/* Input field for adding a new tip */}
          <TextInput
            style={style.input}
            placeholder="Add a new tip"
            value={newTipContent}
            onChangeText={(text) => setNewTipContent(text)}
          />
          {/* Button to add the new tip */}
          <Pressable style={style.addButton} onPress={handleAddTip}>
            <Text style={style.addButtonText}>Add Tip</Text>
          </Pressable>
        </View>
      </ScrollView>
      {!edit && (
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? '#0056b3' : '#007AFF',
            },
            style.button,
          ]}
          onPress={() => setEdit(!edit)}>
          <Icon name="edit" size={30} color="white" />
        </Pressable>
      )}
    </View>
  );
};

export default TipsDetails;

const style = StyleSheet.create({
  scrollViewContentContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 30,
    minHeight: screenHeight,
    width: screenWidth,
    flexGrow: 1,
    position: 'relative',
  },
  section: {
    width: '100%',
    margin: 0,
  },
  standoutText: {
    padding: 15,
    backgroundColor: '#FFF8B4',
    borderColor: '#FFF8B4',
    borderRadius: 15,
    marginRight: 5,
    marginLeft: 5,
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center', // Ensure items are centered vertically
  },
  title: {
    fontSize: 28,
    color: '#34B3C2',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 20,
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
  input: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  icon: {
    marginRight: 15, // Adjust the spacing as needed
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 10,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

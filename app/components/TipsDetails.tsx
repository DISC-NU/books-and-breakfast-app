import React, { useContext, useEffect, useState } from 'react';
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

import Context from '../components/Context';
import EditText from '../components/EditText';
import { addNewTip, deleteTip, listenToTips, updateTipsInfo } from '../firebase/util';
import LightbulbIcon from '../icons/LightbulbIcon';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export const TipsDetails = ({ schoolName, canEdit }: { schoolName: string; canEdit?: boolean }) => {
  const { userInfo } = useContext(Context);
  const [tipArray, setTipArray] = useState<{ id: string; content: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [edit, setEdit] = useState(false);
  const [newTipContent, setNewTipContent] = useState('');

  // Function to handle saving updated tips
  const handleSave = async (schoolName: string, newValue: string, tipID: string) => {
    try {
      // Update the tip in the database
      await updateTipsInfo(schoolName, newValue, tipID);
      // Update the local state to reflect the change
      setTipArray((prevTips) =>
        prevTips.map((tip) => (tip.id === tipID ? { ...tip, content: newValue } : tip))
      );
    } catch (error) {
      console.error('Failed to update school tips', error);
      setError('Failed to update school tips. Please try again later.');
    }
  };

  // Function to handle adding a new tip
  const handleAddTip = async () => {
    if (newTipContent.length === 0) {
      Alert.alert('Please enter text for your tip.');
      return;
    }
    try {
      const newTip = { content: newTipContent };
      await addNewTip(schoolName, newTip);
      setNewTipContent('');
    } catch (error) {
      console.error('Failed to add new tip:', error);
      setError('Failed to add new tip. Please try again later.');
    }
  };

  // Function to handle deleting a tip
  const handleDelete = async (tipID: string) => {
    try {
      await deleteTip(schoolName, tipID);
      setTipArray((prevTips) => prevTips.filter((tip) => tip.id !== tipID));
    } catch (error) {
      console.error('Failed to delete tip:', error);
      setError('Failed to delete tip. Please try again later.');
    }
  };

  // Render the child component
  const ChildComponent = ({ tip }: { tip: { id: string; content: string } }) => (
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
  );

  // Conditionally render Swipeable or just the child component
  const renderTip = (tip: { id: string; content: string }) => {
    return userInfo?.isAdmin ? (
      <Swipeable
        key={tip.id}
        renderRightActions={() => (
          <Pressable style={style.deleteButton} onPress={() => handleDelete(tip.id)}>
            <Text style={style.deleteButtonText}>Delete</Text>
          </Pressable>
        )}>
        <ChildComponent tip={tip} />
      </Swipeable>
    ) : (
      <ChildComponent key={tip.id} tip={tip} />
    );
  };

  useEffect(() => {
    // Effect to listen to real-time updates for school tips
    const unsubscribe = listenToTips(schoolName, (tips) => {
      if (tips) {
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
          {tipArray.map((tip) => renderTip(tip))}
          {canEdit && (
            <>
              <TextInput
                style={style.input}
                placeholder="Add a new tip"
                value={newTipContent}
                onChangeText={(text) => setNewTipContent(text)}
              />
              <Pressable style={style.addButton} onPress={handleAddTip}>
                <Text style={style.addButtonText}>Add Tip</Text>
              </Pressable>
            </>
          )}
        </View>
      </ScrollView>
      {!edit && canEdit && (
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
    alignItems: 'center',
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
    marginRight: 15,
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

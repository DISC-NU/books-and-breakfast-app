import { router } from 'expo-router';
import moment from 'moment';
import React, { useCallback, useContext, useState } from 'react';
import { Alert, Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Context from '../../components/Context';
import ScreenWrapper from '../../components/ScreenWrapper';
import { StatusScreenDetails } from './status';

const screenHeight = Dimensions.get('window').height;

const DatePickerScreen: React.FC = () => {
  const [date, setDate] = useState(new Date());
  const { schoolName } = useContext(Context);

  const onChange = useCallback((event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
  }, []);

  const handleEnterChat = useCallback(() => {
    if (!schoolName) {
      Alert.alert('Please select a school.');
    } else if (!date) {
      Alert.alert('Please select a date.');
    } else {
      router.push({
        pathname: '/(tabs)/rideshare/chat',
        params: { selectedDate: moment(date).format('YYYY-MM-DD') },
      });
    }
  }, [date, schoolName]);

  // // fetch users in real time and group them by transport method and unsubscribe in useeffect. wrap it in async function
  // useEffect(() => {
  //   let unsubscribe;

  //   const fetchUsers = async () => {
  //     unsubscribe = fetchAndGroupUsersForTransportationScreen(schoolName, 'Monday', (users) => {});
  //   };

  //   fetchUsers();

  //   // Cleanup function to unsubscribe
  //   return () => {
  //     if (unsubscribe) unsubscribe();
  //   };
  // }, [date, schoolName]);

  return (
    <ScreenWrapper>
      <View>
        <ScrollView contentContainerStyle={styles.container}>
          {/* <View style={styles.datePickerContainer}>
          <DateTimePicker value={date} mode="date" display="default" onChange={onChange} /> */}
          {/* </View> */}
          <StatusScreenDetails />
        </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleEnterChat}>
            <Icon name="chat" size={35} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'space-between', // Space out elements with space between them
    alignItems: 'center',
    padding: 20,
    minHeight: screenHeight + 50,
    backgroundColor: 'white',
  },
  datePickerContainer: {
    marginTop: 50, // Adjust as needed to position at the top
    alignItems: 'center', // Center the date picker horizontally
  },
  buttonContainer: {
    width: '100%', // Make the button container full width
    alignItems: 'center', // Center the button horizontally
    marginBottom: 30, // Add some padding at the bottom if necessary
  },
  button: {
    backgroundColor: '#36afbc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    position: 'absolute',
    right: 20,
    bottom: 20,
    height: 70,
    borderRadius: 50,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default DatePickerScreen;

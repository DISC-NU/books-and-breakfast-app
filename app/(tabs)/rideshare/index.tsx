import DateTimePicker from '@react-native-community/datetimepicker';
import { router } from 'expo-router';
import moment from 'moment';
import React, { useCallback, useContext, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Context from '../../components/Context';

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

  return (
    <View style={styles.container}>
      <View style={styles.datePickerContainer}>
        <DateTimePicker value={date} mode="date" display="default" onChange={onChange} />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleEnterChat}>
          <Text style={styles.buttonText}>Enter Chat</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between', // Space out elements with space between them
    alignItems: 'center',
    padding: 16,
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
    borderRadius: 10, // Make the button rounded
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%', // Make the button width responsive
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default DatePickerScreen;

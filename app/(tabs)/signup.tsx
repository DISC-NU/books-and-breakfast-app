import { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import ScreenWrapper from '../components/ScreenWrapper';
import { getNextThreeMonthsDates } from '../data/siteDates';

const { width: screenWidth } = Dimensions.get('window');
const { height: screenHeight } = Dimensions.get('window');

const nextThreeMonthsDates = getNextThreeMonthsDates();

export default function SignUpScreen() {
  const [dateArray, setDateArray] = useState(nextThreeMonthsDates);
  const [dateColors, setDateColors] = useState(Array(nextThreeMonthsDates.length).fill('#CBCBCB'));
  const [lastButtonColor, setLastButtonColor] = useState('#F1375A');
  const [lastText, setLastText] = useState('Edit');
  const [isFilterSelected, setIsFilterSelected] = useState(false);

  let editable = true;

  const handleRedButtonPress = (buttonIndex) => {
    let newDateArray;
    if (buttonIndex === 1) {
      newDateArray = Object.values(nextThreeMonthsDates).filter(
        (date) => date.dayOfWeek === 'Monday'
      );
    } else if (buttonIndex === 2) {
      newDateArray = Object.values(nextThreeMonthsDates).filter(
        (date) => date.dayOfWeek === 'Tuesday'
      );
    } else if (buttonIndex === 3) {
      newDateArray = Object.values(nextThreeMonthsDates).filter(
        (date) => date.dayOfWeek === 'Wednesday'
      );
    } else if (buttonIndex === 4) {
      newDateArray = Object.values(nextThreeMonthsDates).filter(
        (date) => date.dayOfWeek === 'Thursday'
      );
    } else {
      newDateArray = Object.values(nextThreeMonthsDates).filter(
        (date) => date.dayOfWeek === 'Friday'
      );
    }
    setDateArray(newDateArray);
    setDateColors(Array(newDateArray.length).fill('#CBCBCB'));
  };

  const handleDateButtonPress = (index) => {
    if (!isFilterSelected) {
      const newDateColors = [...dateColors];
      newDateColors[index] = newDateColors[index] === '#CBCBCB' ? '#36afbc' : '#CBCBCB';
      setDateColors(newDateColors);
    }
  };

  const handleLastButtonPress = () => {
    if (lastButtonColor === '#F1375A') {
      setLastText('Submit');
      editable = true;
      setLastButtonColor('#36afbc');
    } else {
      setLastText('Edit');
      editable = false;
      setLastButtonColor('#F1375A');
    }
  };

  return (
    <ScreenWrapper>
      <Text style={styles.title}>Volunteering Session Sign Up</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.redButton} onPress={() => handleRedButtonPress(1)}>
          <Text style={styles.redButtonText}>M</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.redButton} onPress={() => handleRedButtonPress(2)}>
          <Text style={styles.redButtonText}>T</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.redButton} onPress={() => handleRedButtonPress(3)}>
          <Text style={styles.redButtonText}>W</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.redButton} onPress={() => handleRedButtonPress(4)}>
          <Text style={styles.redButtonText}>Th</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.redButton} onPress={() => handleRedButtonPress(5)}>
          <Text style={styles.redButtonText}>F</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContentContainer}>
        {Object.values(dateArray).map((date, index) => (
          <View key={index} style={styles.datesContainer}>
            <TouchableOpacity
              style={[styles.dateButton, { borderColor: dateColors[index] }]}
              onPress={() => handleDateButtonPress(index)}>
              <Text style={[styles.unselectedText, { color: dateColors[index] }]}>{date.date}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <View style={styles.finalContainer}>
        <TouchableOpacity
          style={[styles.finalButton, { backgroundColor: lastButtonColor }]}
          onPress={handleLastButtonPress}>
          <Text style={styles.finalButtonText}>{lastText}</Text>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  scrollViewContentContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 30,
    minHeight: screenHeight * 0.6,
    flexGrow: 1,
    position: 'relative',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#36afbc',
    marginTop: 30,
  },
  redButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1375A',
    borderRadius: 50,
    width: screenWidth * 0.135,
    height: screenWidth * 0.135,
    opacity: 0.7,
  },
  redButtonText: {
    fontWeight: 'bold',
    fontSize: 28,
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 30,
    marginVertical: 15,
  },
  dateButton: {
    justifyContent: 'center',
    backgroundColor: 'white',
    borderWidth: 2,
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
    width: 320,
  },
  unselectedText: {
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'left',
  },
  datesContainer: {
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
  },
  finalContainer: {
    paddingHorizontal: 40,
    paddingBottom: 30,
  },
  finalButton: {
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
  },
  finalButtonText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
  },
});

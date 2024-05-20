import { useState } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';

import { nextThreeMonthsDates } from '../data/siteDates';
import ScreenWrapper from './ScreenWrapper';

const { width: screenWidth } = Dimensions.get('window');
const { height: screenHeight } = Dimensions.get('window');

export default function SignUpScreen() {
  const [dateArray, setDateArray] = useState(nextThreeMonthsDates);

  const handleRedButtonPress = (buttonIndex: number) => {
    let newDateArray;
    if (buttonIndex == 1) {
      newDateArray = Object.values(nextThreeMonthsDates).filter(
        (date) => date.dayOfWeek === 'Monday'
      );
    } else if (buttonIndex == 2) {
      newDateArray = Object.values(nextThreeMonthsDates).filter(
        (date) => date.dayOfWeek === 'Tuesday'
      );
    } else if (buttonIndex == 3) {
      newDateArray = Object.values(nextThreeMonthsDates).filter(
        (date) => date.dayOfWeek === 'Wednesday'
      );
    } else if (buttonIndex == 4) {
      newDateArray = Object.values(nextThreeMonthsDates).filter(
        (date) => date.dayOfWeek === 'Thursday'
      );
    } else {
      newDateArray = Object.values(nextThreeMonthsDates).filter(
        (date) => date.dayOfWeek === 'Friday'
      );
    }
    setDateArray(newDateArray);
  };

  // const handleDateButtonPress = () => {
  //     style.
  // }

  return (
    <ScreenWrapper>
      <text style={styles.title}>Volunteering Session Sign Up</text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.redButton} onPress={() => handleRedButtonPress(1)}>
          <text style={styles.redButtonText}>M</text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.redButton} onPress={() => handleRedButtonPress(2)}>
          <text style={styles.redButtonText}>T</text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.redButton} onPress={() => handleRedButtonPress(3)}>
          <text style={styles.redButtonText}>W</text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.redButton} onPress={() => handleRedButtonPress(4)}>
          <text style={styles.redButtonText}>Th</text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.redButton} onPress={() => handleRedButtonPress(5)}>
          <text style={styles.redButtonText}>F</text>
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
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center', // Ensures the title is centered
    color: '#36afbc',
  },
  redButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1375A',
    borderRadius: 50,
    width: screenWidth * 0.125,
    height: screenWidth * 0.125,
  },
  redButtonText: {
    fontWeight: 'bold',
    fontSize: 30,
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateButtonSelected: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderColor: '#36afbc',
    borderWidth: 5,
  },
  selectedText: {
    fontWeight: 'condensedBold',
    fontSize: 25,
    color: '#36afbc',
  },
  dateButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 5,
  },
  unselectedText: {
    fontWeight: 'condensedBold',
    fontSize: 25,
    color: 'grey',
  },
});

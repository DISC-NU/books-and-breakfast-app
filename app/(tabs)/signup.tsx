import { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import ScreenWrapper from '../components/ScreenWrapper';
import { getNextThreeMonthsDates } from '../data/siteDates';
// eslint-disable-next-line import/namespace, import/no-duplicates
// import { nextThreeMonthsDates } from '../data/siteDates';

const { width: screenWidth } = Dimensions.get('window');
const { height: screenHeight } = Dimensions.get('window');

const nextThreeMonthsDates = getNextThreeMonthsDates();

export default function SignUpScreen() {
  const [dateArray, setDateArray] = useState(nextThreeMonthsDates);
  const [dateColor, setDateColor] = useState('#CBCBCB');
  const [lastButtonColor, setLastButtonColor] = useState('#F1375A');

  let lastText = 'Edit';
  let editable = true;

  const handleRedButtonPress = (buttonIndex: number) => {
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
  };

  const handleDateButtonPress = () => {
    if (editable) {
      if (dateColor === '#CBCBCB') {
        setDateColor('#36afbc');
      } else {
        setDateColor('#CBCBCB');
      }
    }
  };

  const handleLastButtonPress = () => {
    if (lastButtonColor === '#F1375A') {
      lastText = 'Submit';
      console.log(lastText);
      editable = true;
      console.log(editable);
      setLastButtonColor('#36afbc');
    } else {
      lastText = 'Edit';
      console.log(lastText);
      editable = false;
      console.log(editable);
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
          <View style={styles.datesContainer}>
            <TouchableOpacity
              style={[styles.dateButton, { borderColor: dateColor }]}
              onPress={handleDateButtonPress}>
              <Text key={index} style={[styles.unselectedText, { color: dateColor }]}>
                {date.date}
              </Text>
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
    textAlign: 'center', // Ensures the title is centered
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
    fontWeight: 'condensedBold',
    fontSize: 28,
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 30,
    marginVertical: 15,
  },
  // dateButtonSelected: {
  //   justifyContent: 'center',
  //   backgroundColor: 'white',
  //   borderColor: '#36afbc',
  //   borderWidth: 5,
  // },
  // selectedText: {
  //   fontWeight: 'condensedBold',
  //   fontSize: 30,
  //   color: '#36afbc',
  //   textAlign: 'left',
  // },
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
    fontWeight: 'condensedBold',
    fontSize: 22,
    textAlign: 'left',
  },
  datesContainer: {
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
  },
  finalContainer: {
    alignContent: 'center',
    justifyContent: 'center',
  },
  finalButton: {
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1375A',
    borderRadius: 20,
    marginVertical: 20,
    paddingVertical: 20,
    width: 200,
  },
  finalButtonText: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
  },
});

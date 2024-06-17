import { router } from 'expo-router';
import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Context from './components/Context';
import ScreenWrapper from './components/ScreenWrapper';

const QuestionScreen = () => {
  const { userInfo, setUserInfo } = useContext(Context);

  const handleButtonPressYes = () => {
    setUserInfo({ ...userInfo, assigned: true });
  };

  const handleButtonPressNo = () => {
    setUserInfo({ ...userInfo, assigned: false });
  };

  const handleButtonPressContinue = () => {
    if (userInfo.assigned) {
      router.replace('components/customization');
    } else {
      router.replace('/');
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.questionText}>Do you have an assigned volunteering site?</Text>
        <View style={styles.buttonLayout}>
          <TouchableOpacity style={styles.button} onPress={handleButtonPressYes}>
            <Text style={styles.buttonText}>YES</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleButtonPressNo}>
            <Text style={styles.buttonText}>NO</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.continueButton} onPress={handleButtonPressContinue}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: '#34B3C2',
    padding: 15,
    margin: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#34B3C2',
    padding: 10,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    padding: 10,
  },
  button: {
    width: 60,
    height: 45,
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 10,
  },
  buttonLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 40,
    marginVertical: 15,
  },
  footer: {
    paddingHorizontal: 40,
    paddingBottom: 30,
  },
  continueButton: {
    backgroundColor: '#F1375A',
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
    width: 120,
    height: 55,
  },
  continueButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default QuestionScreen;

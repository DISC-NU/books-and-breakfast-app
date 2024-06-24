import { router } from 'expo-router';
import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Context from './components/Context';
import ScreenWrapper from './components/ScreenWrapper';

const QuestionScreen = () => {
  const { userInfo, setUserInfo } = useContext(Context);
  const [yesPressed, setYesPressed] = useState(false);
  const [noPressed, setNoPressed] = useState(false);

  const handleButtonPressYes = () => {
    setUserInfo({ ...userInfo, isRegistered: true });
    setYesPressed(true);
    setNoPressed(false);
  };

  const handleButtonPressNo = () => {
    setUserInfo({ ...userInfo, isRegistered: false });
    setYesPressed(false);
    setNoPressed(true);
  };

  const handleButtonPressContinue = () => {
    if (userInfo.isRegistered) {
      router.replace('components/customization');
    } else {
      router.replace('/');
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.mainContent}>
          <Text style={styles.questionText}>
            Are you a registered volunteer with an assigned volunteering site?
          </Text>
          <View style={styles.buttonLayout}>
            <TouchableOpacity
              style={[styles.button, yesPressed && styles.buttonPressed]}
              onPress={handleButtonPressYes}>
              <Text style={[styles.buttonText, yesPressed && styles.buttonPressedText]}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, noPressed && styles.buttonPressed]}
              onPress={handleButtonPressNo}>
              <Text style={[styles.buttonText, noPressed && styles.buttonPressedText]}>No</Text>
            </TouchableOpacity>
          </View>
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
    padding: 15,
    margin: 15,
    justifyContent: 'center',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#34B3C2',
    textAlign: 'center',
  },
  questionText: {
    fontSize: 24,
    color: 'black',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 15,
    marginVertical: 10,
    padding: 15,
    borderColor: '#34B3C2',
    borderWidth: 1,
  },
  buttonPressed: {
    backgroundColor: '#34B3C2',
  },
  buttonPressedText: {
    color: 'white',
  },
  buttonLayout: {
    width: '100%',
    alignItems: 'center',
  },
  footer: {
    width: '100%',
    alignItems: 'center',
  },
  continueButton: {
    backgroundColor: 'black',
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
    width: '90%',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default QuestionScreen;

import { useNavigation } from '@react-navigation/native';
import React from 'react';
//import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import ScreenWrapper from '../components/ScreenWrapper';
import { MORNING_PROGRAM_INFO } from '../data/MorningProgramInfo';

const MorningProgram = ({ activity }: { activity: string }) => {
  const navigation = useNavigation();
  const morningProgram = MORNING_PROGRAM_INFO[activity];
  let help = null;

  if ('helpInfo' in morningProgram) {
    help = morningProgram.helpInfo;
  }

  return (
    <ScreenWrapper>
      <Text style={style.title}> {morningProgram.title} </Text>
      <View>
        <Text style={style.headers}>What's Happening: </Text>
        <Text style={style.text}> {morningProgram.description} </Text>
      </View>
      <View>
        <Text style={style.headers}> ? How you can help ?</Text>
        <Text style={style.standoutText}> {help}</Text>
      </View>
      <Text style={style.standoutText}>{help}</Text>
      <button disabled={navigation.canGoBack()} onClick={navigation.goBack} style={style.buttons}>
        Back
      </button>
    </ScreenWrapper>
  );
};

const style = StyleSheet.create({
  standoutText: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#F1375A',
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    backgroundColor: '#FFFFFF',
  },
  headers: {
    fontSize: 23,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 30,
    color: '#34B3C2',
  },
  buttons: {
    backgroundColor: 'black',
    width: 20,
    height: 10,
    margin: 5,
  },
});

export default MorningProgram;

// import React from 'react';
// import AppNavigation from './AppNavigation'; // Adjust the import path as necessary

// export default function App() {
//   return <AppNavigation />;
// }

import { useNavigation } from '@react-navigation/native';
import React from 'react';
//import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import ScreenWrapper from './ScreenWrapper';

const MorningProgram = () => {
  const navigation = useNavigation();
  //const [pageIndex, setPageIndex] = useState(0);

  //const goBack = () => setPageIndex(prevPageIndex => prevPageIndex - 1);
  //const goNext = () => setPageIndex(prevPageIndex => prevPageIndex + 1);

  return (
    <ScreenWrapper>
      <Text style={style.title}>Before B&B Begins</Text>
      <View>
        <Text style={style.headers}>What's Happening</Text>
        <Text style={style.text}>
          At 7:30 a.m, the Site Director and Food Manager arrive to set up breakfast and supplies.
        </Text>
        <Text style={style.text}>At 7:55 a.m. Northwesterhn leadership Team arrives</Text>
        <Text style={style.text}>
          B&B begins at 8:00 a.m. Students and volunteers begin to arrive and get settled.
        </Text>
      </View>
      <View>
        <Text style={style.headers}>How you can help</Text>
        <Text style={style.standoutText}>
          Check in with your Site Director for your next stops.
        </Text>
      </View>
      {/* <Button onPress={navigation.goBack} title="Back" /> */}
    </ScreenWrapper>
  );
};

const style = StyleSheet.create({
  standoutText: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#F1375A',
    borderRadius: 20,
  },
  text: {
    fontSize: 18,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  headers: {
    fontSize: 23,
    alignContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 30,
    color: '#34B3C2',
    alignContent: 'center',
    paddingVertical: 30,
    paddingHorizontal: 30,
  },
  buttons: {
    backgroundColor: 'black',
    width: 20,
    height: 10,
    margin: 5,
  },
});

export default MorningProgram;

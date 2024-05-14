import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';

import { TIPS_INFO } from './data/TipsInfo';

const screenHeight = Dimensions.get('window').height;

const TipsHeader = ({ schoolName }: { schoolName: string }) => (
  <View style={style.headerContainer}>
    <Text style={style.header}>{schoolName}</Text>
  </View>
);

const TipsDetails = ({ schoolName }: { schoolName: string }) => {
  const tipArray = []; //create new array to keep track of which tips are from the school
  // let testTip = TIPS_INFO['tip1'];

  console.log(schoolName);

  // loops over TIPS_INFO object and pulls which key:value pairs coordinate to the relevant school
  for (const key in TIPS_INFO) {
    const value = TIPS_INFO[key];
    if (value.site == schoolName) {
      tipArray.push(value);
    }
  }
  console.log(tipArray);

  // Rendering the header and a list of tips

  return (
    <ScrollView contentContainerStyle={style.scrollViewContentContainer}>
      <Text style={style.title}>Tips!</Text>
      <TipsHeader schoolName={schoolName} />
      {tipArray.map((tip) => (
        <View style={style.standoutText}>
          <Text style={style.text}>{tip.content} </Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default TipsDetails;

const style = StyleSheet.create({
  standoutText: {
    paddingHorizontal: 7,
    paddingVertical: 7,
    backgroundColor: '#FFF8B4',
    borderColor: '#FFF8B4',
    borderRadius: 10,
    marginRight: 20,
    marginLeft: 20,
    marginTop: 10,
  },

  text: {
    fontSize: 15,
    color: 'black',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    marginRight: 5,
    marginLeft: 5,
    marginTop: 5,
  },

  title: {
    fontSize: 28,
    color: '#34B3C2',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    borderRadius: 20,
    padding: 5,
    width: '95%',
    // backgroundColor: 'rgba(255, 228, 181, 0.2)',
    marginBottom: 10,
  },
  headerContainer: {
    borderRadius: 20,
    padding: 10,
    backgroundColor: 'rgba(255, 228, 181, 0.2)',
    marginBottom: 25,
    marginLeft: 20,
    marginRight: 20,
    alignItems: 'center',
  },
  scrollViewContentContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 30,
    minHeight: screenHeight,
    flexGrow: 1,
  },
});

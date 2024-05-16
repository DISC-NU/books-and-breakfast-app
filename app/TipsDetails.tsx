import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';

import { TIPS_INFO } from './data/TipsInfo';
import LightbulbIcon from './icons/LightbulbIcon';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const TipsHeader = ({ schoolName }: { schoolName: string }) => (
  <View style={style.headerContainer}>
    <Text style={style.header}>{schoolName}</Text>
  </View>
);

const TipsDetails = ({ schoolName }: { schoolName: string }) => {
  const tipArray = []; //create new array to keep track of which tips are from the school

  console.log(schoolName);

  // loops over TIPS_INFO object and pulls which key:value pairs coordinate to the relevant school
  for (const key in TIPS_INFO) {
    const value = TIPS_INFO[key];
    if (value.site === schoolName) {
      tipArray.push(value);
    }
  }

  // Rendering the header and a list of tips

  return (
    <ScrollView contentContainerStyle={style.scrollViewContentContainer}>
      <Text style={style.title}>Tips!</Text>
      <TipsHeader schoolName={schoolName} />
      <View style={style.section}>
        {tipArray.map((tip) => (
          <View style={style.standoutText}>
            <LightbulbIcon />
            <Text style={style.text}>{tip.content} </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default TipsDetails;

const style = StyleSheet.create({
  scrollViewContentContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 30,
    minHeight: screenHeight,
    width: screenWidth,
    flexGrow: 1,
    position: 'relative',
  },
  section: {
    width: '100%',
    margin: 0,
  },
  standoutText: {
    padding: 15,
    backgroundColor: '#FFF8B4',
    borderColor: '#FFF8B4',
    borderRadius: 15,
    marginRight: 5,
    marginLeft: 5,
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
  },

  text: {
    fontSize: 15,
    color: 'black',
    padding: 10,
    margin: 5,
    width: '85%',
    fontWeight: 'condensedBold',
  },

  icon: {
    marginTop: 5,
  },

  title: {
    fontSize: 28,
    color: '#34B3C2',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    borderRadius: 20,
    padding: 5,
    // backgroundColor: 'rgba(255, 228, 181, 0.2)',
    // marginBottom: 10,
  },
  headerContainer: {
    borderRadius: 20,
    padding: 10,
    backgroundColor: 'rgba(255, 228, 181, 0.2)',
    marginBottom: 25,
    marginLeft: 20,
    marginRight: 20,
    alignItems: 'center',
    width: '85%',
  },
});

import { StyleSheet, Text, View } from 'react-native';

import ScreenWrapper from './ScreenWrapper';
import { TIPS_INFO } from './data/TipsInfo';

// const Tips = ({ tip }: { tip: any }) => (
//   <View style={style.section}>
//     <Text style={style.title}> Tips! </Text>
//     <View style={style.standoutText}>
//       <Text style={style.text}>{tip.content} </Text>
//     </View>
//   </View>
// );

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
    <ScreenWrapper>
      <TipsHeader schoolName={schoolName} />
      {tipArray.map((tip) => (
        <View style={style.standoutText}>
          <Text style={style.text}>{tip.content} </Text>
        </View>
      ))}
      {/* <View style={style.standoutText}>
          <Text style={style.text}>{testTip.content} </Text>
          <Text style={style.text}>seeing if this map function works LMAO</Text>
        </View>
      <Text style={style.text}>Is anything rendering at all???/</Text> */}
    </ScreenWrapper>
  );
};

export default TipsDetails;

const style = StyleSheet.create({
  standoutText: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
  },

  text: {
    fontSize: 18,
    color: 'black',
  },

  title: {
    fontSize: 28,
    color: '#34B3C2',
  },
  section: {
    margin: 0,
    width: '100%',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  headerContainer: {
    borderRadius: 20,
    padding: 20,
    width: '95%',
    backgroundColor: 'rgba(255, 228, 181, 0.2)',
    marginBottom: 25,
  },
});

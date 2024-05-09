import React, { useState } from 'react';
import { Dimensions, LogBox, StyleSheet, Text, View } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

interface Entry {
  title: string;
  missionCenter?: string;
  subtitle?: string;
  body: string;
  subtitle1?: string;
  body1?: string;
  subtitle2?: string;
  body2?: string;
  subtitle3?: string;
  body3?: string;
  subtitle4?: string;
  body4?: string;
  link?: string;
}

const { width: screenWidth } = Dimensions.get('window');

LogBox.ignoreLogs(['ViewPropTypes will be removed from React Native']);

const entries: Entry[] = [
  {
    title: 'The Mission',
    missionCenter:
      '"Books & Breakfast is a before-school program offering a healthy breakfast and homework help to students in need of additional support. B&B exists so that every student enters his or her classroom physically, emotionally and academically prepared. Our mission is to advance educational equity in Evanston schools."',
    body: ' ',
  },
  {
    title: 'Primary Strategies',
    subtitle: 'Relationships:',
    body: 'Every part of the B&B experience should highlight relationships (welcome, breakfast, homework, games, clean up and dismissal). We want students to experience the refrain, "You are important. You are valuable" in our words, demeanor and actions. We build community and connection every day.\n',
    subtitle1: 'Daily School Readiness:',
    body1:
      'The goal of B&B is to help students be prepared for the next 6-7 hours of the day. If kids enter the classroom ready physically, emotionally and academically, daily learning has a greater impact.\n',
    subtitle2: 'Academic Mindset:',
    body2:
      'What you believe about yourself as a student and what you believe about your connection to your academic community. \n"I belong in this academic community." \n"My ability and competence grow with my effort." \n"I can succeed at this.” \n"This work has value for me."',
  },
  {
    title: 'Your Role',
    subtitle: 'Friend:',
    body: "A good friend wants to know the other person. A good friend asks questions about the other person's life, family, likes and dislikes. Take time to build trust and connection.\n",
    subtitle1: 'Cheerleader (EnCOURAGE):',
    body1:
      'Pour courage into your students, be positive, call out the good stuff, communicate that you believe in them.\n',
    subtitle2: 'Coach:',
    body2:
      'We ask for strong effort and for each student to do their best work. We believe students can succeed. We support and train all the way.\n',
    subtitle3: 'Driver’s Education Teacher:',
    body3:
      'The goal is for the student to drive, keeping them safe emotionally in mastering a difficult task. Students need to learn to drive themselves!\n',
    subtitle4: 'Learner:',
    body4:
      "We are learning together! It's ok if you don't know an answer or how to help. We encourage asking for help and see it as a chance to model that for children.\n",
  },
];

const MissionScreen: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0); // State to track active slide index

  const renderItem = ({ item }: { item: Entry }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.subtitle}>{item.subtitle}</Text>
      <Text style={styles.missionCenter}>{item.missionCenter}</Text>
      <Text style={styles.body}>{item.body}</Text>
      {item.subtitle1 && <Text style={styles.subtitle}>{item.subtitle1}</Text>}
      {item.body1 && <Text style={styles.body}>{item.body1}</Text>}
      {item.subtitle2 && <Text style={styles.subtitle}>{item.subtitle2}</Text>}
      {item.body2 && <Text style={styles.body}>{item.body2}</Text>}
      {item.subtitle3 && <Text style={styles.subtitle}>{item.subtitle3}</Text>}
      {item.body3 && <Text style={styles.body}>{item.body3}</Text>}
      {item.subtitle4 && <Text style={styles.subtitle}>{item.subtitle4}</Text>}
      {item.body4 && <Text style={styles.body}>{item.body4}</Text>}
    </View>
  );

  return (
    <View style={styles.container}>
      <Carousel
        data={entries}
        renderItem={renderItem}
        sliderWidth={screenWidth}
        itemWidth={screenWidth}
        layout="default"
        onSnapToItem={(index) => setActiveSlide(index)}
      />
      <Pagination
        dotsLength={entries.length}
        activeDotIndex={activeSlide}
        containerStyle={styles.paginationContainer}
        dotStyle={styles.dotStyle}
        inactiveDotStyle={styles.inactiveDotStyle}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Sets the background color for the entire screen
  },
  item: {
    backgroundColor: 'white',
    borderRadius: 5,
    height: 500,
    padding: 20,
    marginLeft: 30,
    marginRight: 30,
    alignItems: 'center', // Ensures that all children in the item view are centered
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center', // Centers the subtitles as well
  },
  missionCenter: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center', // Correct property to center text
    marginBottom: 10, // Adds spacing below the missionCenter text
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center', // Ensures the title is centered
    color: '#36afbc',
  },
  body: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center', // Ensures body text is also centered if needed
  },
  paginationContainer: {
    backgroundColor: 'white',
    paddingVertical: 20,
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: 'rgba(95, 87, 79, 0.92)',
  },
  inactiveDotStyle: {
    backgroundColor: 'rgba(95, 87, 79, 0.5)',
  },
});

export default MissionScreen;

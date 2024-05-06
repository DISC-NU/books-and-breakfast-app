import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

interface Entry {
  title: string;
  subtitle?: string;
  body: string;
  link?: string;
}

const { width: screenWidth } = Dimensions.get('window');

const entries: Entry[] = [
  {
    title: 'The Mission',
    body: 'Books & Breakfast is a before-school program offering a healthy breakfast and homework help to students in need of additional support. B&B exists so that every student enters his or her classroom physically, emotionally, and academically prepared. Our mission is to advance educational equity in Evanston schools.',
  },
  {
    title: 'Physically (Body)',
    body: 'Every student will begin the day with a healthy meal so they have the fuel they need to do their best as learners.',
  },
  {
    title: 'Emotionally (Heart)',
    body: 'We will create a positive, personal, and welcoming environment so that children feel safe, known, and cared for.',
  },
  {
    title: 'Academically (Mind)',
    body: 'We will focus primarily on homework support so that every student can start the day prepared and ready. We will also provide additional support according to teacher requests.',
  },
  {
    title: 'Primary Strategies',
    body: '"I belong in this academic community." "My ability and competence grow with my effort." "I can succeed at this." "This work has value for me."',
  },
  {
    title: 'The Tutor Role',
    body: "Friend, Cheerleader, Coach, Driver's Education Teacher, Learner - each plays a vital role in supporting the students.",
  },
  {
    title: 'The Site Director Role',
    body: "Daily Program Manager, Family and Student Connector, District 65 Partner, Student and Family Advocate - responsible for overseeing the program's daily operations and long-term success.",
  },
];

const MissionScreen: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0); // State to track active slide index

  const renderItem = ({ item }: { item: Entry }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.body}>{item.body}</Text>
    </View>
  );

  return (
    <>
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
    </>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'floralwhite',
    borderRadius: 5,
    height: 250,
    padding: 20,
    marginLeft: 30,
    marginRight: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  body: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  paginationContainer: {
    backgroundColor: 'transparent',
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

import React, { useState } from 'react';
import { Dimensions, LogBox, StyleSheet, Text, View } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

// Import both entries and Entry from EntryData
import { entries, Entry } from './data/MissionData';

LogBox.ignoreLogs(['ViewPropTypes will be removed from React Native']);

const { width: screenWidth } = Dimensions.get('window');

const MissionScreen: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0); // State to track active slide index

  const renderItem = ({ item }: { item: Entry }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
      {item.subtitle && <Text style={styles.subtitle}>{item.subtitle}</Text>}
      {item.missionCenter && <Text style={styles.missionCenter}>{item.missionCenter}</Text>}
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
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  missionCenter: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center', // Correct property to center text
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center', // Ensures the title is centered
    color: '#36afbc',
  },
  body: {
    fontSize: 16,
    color: '#333',
  },
  paginationContainer: {
    backgroundColor: 'white',
    paddingVertical: 20,
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: -3,
    backgroundColor: 'rgba(95, 87, 79, 0.92)',
  },
  inactiveDotStyle: {
    backgroundColor: 'rgba(95, 87, 79, 0.5)',
  },
});

export default MissionScreen;

import React, { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

// Import both entries and Entry from EntryData
import { entries, Entry } from '../data/MissionData';

const { width: screenWidth } = Dimensions.get('window');

const MissionScreen: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0); // State to track active slide index

  const renderItem = ({ item }: { item: Entry }) => (
    <ScrollView style={styles.item}>
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
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <Carousel
        data={entries}
        renderItem={renderItem}
        width={screenWidth}
        height={500}
        onSnapToItem={(index) => setActiveSlide(index)}
        loop={false}
        autoPlay
        autoPlayInterval={5000}
      />
      <View style={styles.paginationContainer}>
        {entries.map((_, index) => (
          <View
            key={index}
            style={[styles.dotStyle, { opacity: index === activeSlide ? 1 : 0.4 }]}
          />
        ))}
      </View>
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
    padding: 30,
    marginBottom: 20, // Added marginBottom to separate items if needed
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginBottom: 10, // Added marginBottom for spacing
  },
  missionCenter: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center', // Correct property to center text
    marginBottom: 10, // Added marginBottom for spacing
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center', // Ensures the title is centered
    color: '#36afbc',
  },
  body: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10, // Added marginBottom for spacing
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 3,
    backgroundColor: 'rgba(95, 87, 79, 0.92)',
  },
  inactiveDotStyle: {
    backgroundColor: 'rgba(95, 87, 79, 0.5)',
  },
});

export default MissionScreen;

import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

import { Entry, getMissionEntries } from '../firebase/util';

const { width: screenWidth } = Dimensions.get('window');
const screenHeight = Dimensions.get('window').height;

const MissionScreen: React.FC = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const fetchEntries = async () => {
      const fetchedEntries = await getMissionEntries();
      try {
        setEntries(fetchedEntries);
      } catch (error) {
        console.error('Failed to fetch mission entries:', error);
      }
    };
    fetchEntries();
  }, []);

  const renderItem = ({ item }: { item: Entry }) => (
    <View>
      <ScrollView contentContainerStyle={styles.item}>
        <Text style={styles.title}>{item.title}</Text>
        {item.subtitle && <Text style={styles.subtitle}>{item.subtitle}</Text>}
        {item.missionCenter && <Text style={styles.missionCenter}>{item.missionCenter}</Text>}
        {item.missionCenter && (
          <Image source={require('../../assets/mission-stmt-1.jpg')} style={styles.image} />
        )}
        {item.missionCenter && (
          <Image source={require('../../assets/mission-stmt-2.jpeg')} style={styles.image} />
        )}
        <Text style={styles.body}>{item.body}</Text>
        {item.subtitle1 && <Text style={styles.subtitle}>{item.subtitle1}</Text>}
        {item.body1 && <Text style={styles.body}>{item.body1}</Text>}
        {item.subtitle2 && <Text style={styles.subtitle}>{item.subtitle2}</Text>}
        {item.body2 && <Text style={styles.body}>{item.body2}</Text>}
        {item.subtitle3 && <Text style={styles.subtitle}>{item.subtitle3}</Text>}
        {item.body3 && <Text style={styles.body}>{item.body3}</Text>}
        {item.body3 && !item.subtitle4 && (
          <Image source={require('../../assets/site-director.jpg')} style={styles.image} />
        )}
        {item.subtitle4 && <Text style={styles.subtitle}>{item.subtitle4}</Text>}
        {item.body4 && <Text style={styles.body}>{item.body4}</Text>}
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.container}>
      <Carousel
        data={entries}
        renderItem={renderItem}
        width={screenWidth}
        onSnapToItem={(index) => setActiveSlide(index)}
        loop={false}
        pagingEnabled
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
    borderRadius: 5,
    padding: 30,
    marginBottom: 20, // Added marginBottom to separate items if needed
    flexGrow: 1,
    minHeight: screenHeight,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginBottom: 10, // Added marginBottom for spacing
  },
  missionCenter: {
    fontSize: 15,
    color: '#333',
    textAlign: 'center', // Correct property to center text
    marginBottom: 5, // Added marginBottom for spacing
    lineHeight: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center', // Ensures the title is centered
    color: '#36afbc',
  },
  body: {
    fontSize: 15,
    color: '#333',
    marginBottom: 10, // Added marginBottom for spacing
    lineHeight: 20,
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
  image: {
    width: 325,
    height: 225,
    marginTop: 20,
    marginLeft: 12,
  },
});

export default MissionScreen;

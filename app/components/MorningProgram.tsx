import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

//importing morning program data
import { MorningProgram, getMorningProgramInfo } from '../firebase/util';
import QuestionIcon from '../icons/QuestionIcon';

const { width: screenWidth } = Dimensions.get('window');
const { height: screenHeight } = Dimensions.get('window');

const MorningProgramScreen: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [entries, setEntries] = useState<MorningProgram[]>([]);

  useEffect(() => {
    const fetchEntries = async () => {
      const fetchedEntries = await getMorningProgramInfo();
      try {
        setEntries(fetchedEntries);
      } catch (error) {
        console.error('Failed to fetch mission entries:', error);
      }
    };
    fetchEntries();
  }, []);

  const renderItem = ({ item }: { item: MorningProgram }) => (
    <ScrollView style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.subtitle}> What's Happening: </Text>
      <Text style={styles.body}> {item.description}</Text>
      {item.helpInfo && (
        <View style={styles.standoutText}>
          <View style={styles.row}>
            <QuestionIcon />
            <Text style={styles.helpSubtitle}>How you can help! </Text>
          </View>
          <Text style={styles.helpBody}>{item.helpInfo}</Text>
        </View>
      )}
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <Carousel
        data={entries}
        renderItem={renderItem}
        width={screenWidth}
        height={screenHeight}
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
    backgroundColor: 'white',
    borderRadius: 5,
    height: 500,
    marginBottom: 20,
    padding: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center', // Ensures the title is centered
    color: '#36afbc',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    margin: 7,
  },
  helpSubtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 7,
    marginLeft: 5,
    color: 'white',
  },
  body: {
    fontSize: 16,
    color: '#333',
    marginRight: 10,
    marginLeft: 10,
  },
  helpBody: {
    fontSize: 16,
    color: 'white',
    marginHorizontal: 10,
    marginTop: 5,
    marginBottom: 10,
  },
  standoutText: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#F1375A',
    borderRadius: 20,
    margin: 10,
    marginBottom: 200,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: 'white',
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

export default MorningProgramScreen;

import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// interface StatusScreenProps {
//   date: string;
//   schoolName: string;
// }

interface StatusHeaderProps {
  day: string;
  volunteerNum: number;
}

const StatusHeader: React.FC<StatusHeaderProps> = ({ day, volunteerNum }) => (
  <View style={styles.headerContainer}>
    <Text style={styles.headerTitle}>Join Your Fellow Volunteers:</Text>
    <Text style={styles.headerInfo}>
      {day} | Volunteers Expected: {volunteerNum}
    </Text>
  </View>
);

const SectionHeader: React.FC<{ text: string }> = ({ text }) => (
  <Text style={styles.sectionHeader}>{text}</Text>
);

const ProfileImage = ({ source }) => (
  <View style={styles.pfpContainer}>
    <Image source={source} style={styles.circleImage} />
  </View>
);

//hardcoded pfps for now
const pfpSources = [
  require('../../../assets/circle-icon.png'),
  require('../../../assets/circle-icon.png'),
  require('../../../assets/circle-icon.png'),
  require('../../../assets/circle-icon.png'),
];

const SectionCircleIcons = () => (
  <ScrollView
    contentContainerStyle={styles.scrollViewContainer}
    horizontal={true}
    showsHorizontalScrollIndicator={false}>
    <View style={styles.circleIconsContainer}>
      {pfpSources.map((source, index) => (
        <ProfileImage key={index} source={source} />
      ))}
    </View>
  </ScrollView>
);

// interface StatusScreenDetailsProps {
//   schoolName: string; // update later
// }

export const StatusScreenDetails = () => {
  const statusSelections = [
    { key: '0', value: 'Looking for Walking Buddy' },
    { key: '1', value: 'Looking for CTA Buddy' },
    { key: '2', value: 'Looking for Carpool' },
    { key: '3', value: 'Can Drive People' },
  ];

  return (
    <View style={styles.container}>
      <StatusHeader day="Monday" volunteerNum={10} />
      <View style={styles.section}>
        {statusSelections.map((status) => (
          <View key={status.key}>
            <SectionHeader text={status.value} />
            <SectionCircleIcons />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  scrollViewContainer: {
    marginBottom: -125,
  },
  headerContainer: {
    padding: 30,
    alignItems: 'center',
    backgroundColor: '#FAF9F9',
    borderRadius: 20,
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 25,
    alignItems: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#34B3C2',
  },
  headerInfo: {
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
  },
  // dropdownContainer: {
  //   padding: 10,
  //   borderRadius: 20,
  //   width: '80%',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   marginVertical: 20,
  // },
  // dropdownStyles: {
  //   color: '#fff',
  //   fontSize: 18,
  //   alignContent: 'center',
  // },
  // dropdownBox: {
  //   borderRadius: 10,
  //   borderColor: '#27530B',
  //   backgroundColor: '#5ED217',
  // },

  // dropdownInput: {
  //   fontSize: 18,
  //   fontWeight: '600',
  //   color: 'white',
  // },
  // dropdownText: {
  //   fontSize: 15,
  //   color: 'black',
  //   fontWeight: 'semibold',
  // },
  // carIcon: {
  //   marginRight: 10,
  // },
  circleIconsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'flex-start',
  },
  pfpContainer: {
    width: 95,
    height: 95,
    borderRadius: 50,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    marginTop: 15,
    marginBottom: 15,
  },
  circleImage: {
    width: 95,
    height: 95,
    resizeMode: 'cover',
  },
  section: {
    width: '100%',
    alignSelf: 'flex-start',
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  statusHeader: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

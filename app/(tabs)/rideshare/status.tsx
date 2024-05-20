import React, { useEffect, useState } from 'react';
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SelectList } from 'react-native-dropdown-select-list';

// interface StatusScreenProps {
//   date: string;
//   schoolName: string;
// }

interface StatusHeaderProps {
  date: string;
  totalGoing: number;
}

const StatusHeader: React.FC<StatusHeaderProps> = ({ date, totalGoing }) => (
  <View style={styles.headerContainer}>
    <Text style={styles.headerTitle}>Your Upcoming Volunteering Session:</Text>
    <Text style={styles.headerInfo}>
      {date} | Total Going: {totalGoing}
    </Text>
  </View>
);

const SectionHeader: React.FC<{ text: string }> = ({ text }) => (
  <Text style={styles.sectionHeader}>{text}</Text>
);

const SectionCircleIcons: React.FC = () => (
  <View style={styles.circleIconsContainer}>
    <Icon name="circle" size={110} color="#D9D9D9" />
    <Icon name="circle" size={110} color="#D9D9D9" />
    <Icon name="circle" size={110} color="#D9D9D9" />
  </View>
);

interface StatusScreenDetailsProps {
  schoolName: string;
}

export const StatusScreenDetails: React.FC<StatusScreenDetailsProps> = ({ schoolName }) => {
  const [status, setStatus] = useState('');

  const statusSelections = [
    { key: '0', value: 'Willing to Drive!' },
    { key: '1', value: 'Looking for Carpool!' },
    { key: '2', value: "I'm Good!" },
  ];

  return (
    <View style={styles.container}>
      <StatusHeader date="May 20, 2024" totalGoing="10" />
      <View style={styles.dropdownContainer}>
        <SelectList
          setSelected={setStatus}
          data={statusSelections}
          placeholder="Select your status"
          dropdownStyles={styles.dropdownStyles}
          boxStyles={styles.dropdownBox}
          inputStyles={styles.dropdownInput}
          dropdownTextStyles={styles.dropdownText}  
          search={false}
        />
      </View>
      <View style={styles.section}>
        <SectionHeader text="Looking For Carpool" />
        <SectionCircleIcons />
        <SectionHeader text="Can Drive People" />
        <SectionCircleIcons />
        <SectionHeader text="I'm Good :)" />
        <SectionCircleIcons />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  headerContainer: {
    padding: 30,
    alignItems: 'center',
    backgroundColor: '#FAF9F9',
    borderRadius: 20,
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
    fontSize: 16,
    textAlign: 'center',
  },
  dropdownContainer: {
    padding: 10,
    borderRadius: 20,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  dropdownStyles: {
    color: '#fff',
    fontSize: 18,
    alignContent: 'center',
  },
  dropdownBox: {
    borderRadius: 10,
    borderColor: '#27530B',
    backgroundColor: '#5ED217',
  },
  dropdownInput: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  dropdownText: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'semibold',
  },
  // buttonContainer: {
  //   padding: 10,
  //   borderRadius: 20,
  //   width: '80%',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   marginVertical: 20,
  // },
  // buttonContent: {
  //   flexDirection: 'row',
  // },
  // buttonText: {
  //   color: '#fff',
  //   fontSize: 18,
  //   marginLeft: 10,
  //   alignContent: 'center',
  // },
  // carIcon: {
  //   marginRight: 10,
  // },
  circleIconsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'flex-start',
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

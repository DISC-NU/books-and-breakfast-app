import React from 'react';
import { Dimensions, StyleSheet, Text, View, ScrollView, Image } from 'react-native';

const screenHeight = Dimensions.get('window').height;

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
    // there might be an issue with how source is passed, might have to use uri: photo_url
    <Image source={source} style={styles.circleImage} />
  </View>
);

const SectionCircleIcons = ({ users }) => (
  <ScrollView
    contentContainerStyle={styles.scrollViewContainer}
    horizontal={true}
    showsVerticalScrollIndicator={false}
    alwaysBounceVertical={false}
    showsHorizontalScrollIndicator={false}>
    <View style={styles.circleIconsContainer}>
      {users.map((user, index) => (
        <ProfileImage key={index} source={user.photo} />
      ))}
    </View>
  </ScrollView>
);

export const StatusScreenDetails = ({ day, groupedUsers }) => {
  const statusSelections = [
    { key: '0', value: 'Looking for Walking Buddy' },
    { key: '1', value: 'Looking for CTA Buddy' },
    { key: '2', value: 'Looking for Carpool' },
    { key: '3', value: 'Can Drive People' },
  ];

  return (
    <View style={styles.container}>
      <StatusHeader day={day} volunteerNum={Object.keys(groupedUsers).length} />
      <View style={styles.section}>
        {statusSelections.map((status) => (
          <View key={status.key}>
            <SectionHeader text={status.value} />
            //pass in users for each status
            <SectionCircleIcons users={groupedUsers[status.key]} />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    minHeight: screenHeight,
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

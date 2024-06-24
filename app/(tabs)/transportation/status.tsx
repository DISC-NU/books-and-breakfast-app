import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native';

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

const ProfileImage = ({ name, source }) => (
  <View>
    <View style={styles.pfpContainer}>
      <Image source={source} style={styles.circleImage} />
    </View>
    <Text>{name}</Text>
  </View>
);

const SectionCircleIcons = ({ users }) => {
  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContainer}
      horizontal
      showsVerticalScrollIndicator={false}
      alwaysBounceVertical={false}
      showsHorizontalScrollIndicator={false}>
      <View style={styles.circleIconsContainer}>
        {users &&
          users.map(
            (user, index) =>
              user &&
              user.name && (
                <React.Fragment key={index}>
                  <ProfileImage name={user.name} source={{ uri: user.photo }} />
                </React.Fragment>
              )
          )}
      </View>
    </ScrollView>
  );
};

export const StatusScreenDetails = ({ day, groupedUsers }) => {
  const statusSelections = [
    { key: '0', value: 'Looking for Walking Buddy' },
    { key: '1', value: 'Looking for CTA/Shuttle Buddy' },
    { key: '2', value: 'Looking for Carpool' },
    { key: '3', value: 'Can Drive People' },
  ];

  return (
    <View style={styles.container}>
      <StatusHeader day={day} volunteerNum={Object.keys(groupedUsers).length} />
      <View style={styles.section}>
        {statusSelections.map(
          (status, index) =>
            groupedUsers[status.value] &&
            groupedUsers[status.value].length >= 0 && (
              <React.Fragment key={index}>
                <SectionHeader text={status.value} />
                <SectionCircleIcons users={groupedUsers[status.value]} />
              </React.Fragment>
            )
        )}
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
    marginBottom: 20,
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
    alignItems: 'center',
  },
  pfpContainer: {
    width: 95,
    height: 95,
    borderRadius: 50,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 30,
    marginTop: 15,
    marginBottom: 10,
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

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { Avatar } from 'react-native-elements';

import Context, { TransportStatus, VolunteeringDay } from '../components/Context';
import ScreenWrapper from '../components/ScreenWrapper';
import {
  SchoolKeyPair,
  deleteUser,
  getSchoolList,
  updateUserFields,
  wipeData,
} from '../firebase/util';

export const TRANSPORT_METHOD_SELECTION = [
  'Willing to Drive',
  'Looking for Carpool',
  'Looking for CTA/Shuttle Buddy',
  'Looking for Walking Buddy',
];

export const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export default function ProfileScreen() {
  const { userInfo, setUserInfo } = useContext(Context);
  const [schoolOptions, setSchoolOptions] = useState<SchoolKeyPair[]>([]);
  const [schoolName, setSchoolName] = useState<string>(userInfo.schoolName);
  const [transportStatus, setTransportStatus] = useState<TransportStatus>(userInfo.transportStatus);
  const [volunteeringDay, setVolunteeringDay] = useState<VolunteeringDay>(userInfo.volunteeringDay);
  const [dropdownStyle, setDropdownStyle] = useState<object>(styles.dropdownUnselected);

  // Update dropdown styling based on selection state
  useEffect(() => {
    setDropdownStyle(schoolName !== '' ? styles.dropdownSelected : styles.dropdownUnselected);
  }, [schoolName]);

  const fetchSchools = useCallback(async () => {
    try {
      // Attempt to fetch the school list using the getSchoolList function.
      const schoolList = await getSchoolList();
      if (schoolList != null) {
        setSchoolOptions(schoolList);
      }
    } catch (error) {
      // If an error occurs during fetching, log it to the console.
      console.error('Failed to fetch schools:', error);
    }
  }, []);

  useEffect(() => {
    fetchSchools();
  }, []); // The empty dependency array ensures this effect runs only once after the component mounts.

  const handleSetSchool = useCallback(
    (val: string) => {
      setUserInfo({ ...userInfo, schoolName: val });
      updateUserFields(userInfo.id, { ...userInfo, schoolName: val });
    },
    [schoolName]
  );

  const handleSetVolunteeringDay = useCallback(
    (val: VolunteeringDay) => {
      setUserInfo({ ...userInfo, volunteeringDay: val });
      updateUserFields(userInfo.id, { ...userInfo, volunteeringDay: val });
    },
    [volunteeringDay]
  );

  const handleSetTransportStatus = useCallback(
    (val: TransportStatus) => {
      setUserInfo({ ...userInfo, transportStatus: val });
      updateUserFields(userInfo.id, { ...userInfo, transportStatus: val });
    },
    [transportStatus]
  );

  const handleSignOut = async () => {
    try {
      await GoogleSignin.signOut();
      setUserInfo(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteAllUsers = async () => {
    await wipeData();
  };

  const handleDeleteUserAccount = useCallback(async () => {
    await deleteUser(userInfo.id);
    setUserInfo(null);
  }, [userInfo]);

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.mainContent}>
          <View style={styles.profileContainer}>
            <Avatar
              rounded
              size="xlarge"
              source={{
                uri: userInfo?.photo,
              }}
            />
            <Text style={styles.nameText}>{userInfo?.name}</Text>
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.subtitle}>Your Volunteering Site</Text>
              <View style={styles.dropdownWrapper}>
                <View style={styles.dropdownContainer}>
                  <SelectList
                    setSelected={setSchoolName}
                    onSelect={() => handleSetSchool(schoolName)}
                    data={schoolOptions}
                    inputStyles={styles.selectInput}
                    save="value"
                    placeholder={userInfo.schoolName || 'Select School'}
                    maxHeight={275}
                    search={false}
                    boxStyles={dropdownStyle}
                  />
                </View>
              </View>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.subtitle}>Your Assigned Day</Text>
              <View style={styles.dropdownWrapper}>
                <View style={styles.dropdownContainer}>
                  <SelectList
                    setSelected={setVolunteeringDay}
                    onSelect={() => handleSetVolunteeringDay(volunteeringDay)}
                    data={DAYS_OF_WEEK}
                    placeholder={userInfo.volunteeringDay || 'Select your assigned day'}
                    inputStyles={styles.selectInput}
                    maxHeight={180}
                    search={false}
                    boxStyles={dropdownStyle}
                  />
                </View>
              </View>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.subtitle}>Your Transport Status</Text>
              <View style={styles.dropdownWrapper}>
                <View style={styles.dropdownContainer}>
                  <SelectList
                    setSelected={setTransportStatus}
                    onSelect={() => handleSetTransportStatus(transportStatus)}
                    data={TRANSPORT_METHOD_SELECTION}
                    placeholder={userInfo.transportStatus || 'Select your transport status'}
                    inputStyles={styles.selectInput}
                    maxHeight={180}
                    search={false}
                    boxStyles={dropdownStyle}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
          {userInfo.isAdmin ? (
            <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAllUsers}>
              <Text style={styles.logoutButtonText}>DELETE ALL USER DATA</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteUserAccount}>
              <Text style={styles.logoutButtonText}>Delete Account</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  mainContent: {
    flex: 1,
  },
  profileContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  infoContainer: {
    paddingHorizontal: 20,
  },
  infoRow: {
    marginBottom: 15,
    position: 'relative',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    padding: 5,
  },
  subtitle: {
    fontSize: 14,
    color: 'black',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  dropdownWrapper: {
    position: 'relative',
    zIndex: 998, // Ensure dropdown appears above other elements
  },
  dropdownContainer: {
    width: '100%',
  },
  selectInput: {
    fontSize: 16,
    width: '100%',
    color: 'black',
  },
  dropdownUnselected: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 10,
  },
  dropdownSelected: {
    borderWidth: 1,
    borderRadius: 10,
  },
  footer: {
    paddingHorizontal: 40,
    paddingBottom: 30,
  },
  logoutButton: {
    backgroundColor: '#36afbc',
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
    margin: 10,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#F1375A',
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
    margin: 10,
  },
});

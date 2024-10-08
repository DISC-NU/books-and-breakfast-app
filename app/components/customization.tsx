import { router } from 'expo-router';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import Icon from 'react-native-vector-icons/Ionicons';

import ScreenWrapper from './ScreenWrapper';
import { DAYS_OF_WEEK, TRANSPORT_METHOD_SELECTION } from '../(tabs)/account';
import Context, { TransportStatus, VolunteeringDay } from '../components/Context';
import { SchoolKeyPair, getSchoolList, updateUserFields } from '../firebase/util';

export default function CustomizationScreen() {
  const { userInfo, setUserInfo } = useContext(Context);
  const [schoolName, setSchoolName] = useState<string>(userInfo.schoolName);
  const [transportStatus, setTransportStatus] = useState<TransportStatus>(userInfo.transportStatus);
  const [volunteeringDay, setVolunteeringDay] = useState<VolunteeringDay>(userInfo.volunteeringDay);
  const [schoolOptions, setSchoolOptions] = useState<SchoolKeyPair[]>([]);
  const [dropdownStyle, setDropdownStyle] = useState<object>(styles.dropdownUnselected);

  // Update dropdown styling based on selection state
  useEffect(() => {
    setDropdownStyle(
      userInfo.schoolName !== '' ? styles.dropdownSelected : styles.dropdownUnselected
    );
  }, [schoolName]);

  useEffect(() => {
    // Define an asynchronous function inside the useEffect hook to fetch the list of schools.
    const fetchSchools = async () => {
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
    };

    // Call the fetchSchools function defined above to execute the fetching process.
    // This function is called right after the component mounts due to the empty dependency array.
    fetchSchools();
  }, []); // The empty dependency array ensures this effect runs only once after the component mounts.

  // handle continue
  const handleContinue = useCallback(() => {
    if (!schoolName) {
      alert('Please select a school');
    } else if (!volunteeringDay) {
      alert('Please select a volunteering day');
    } else {
      setSchoolName(schoolName);
      if (transportStatus) {
        setUserInfo({ ...userInfo, schoolName, volunteeringDay, transportStatus });
        updateUserFields(userInfo.id, {
          ...userInfo,
          schoolName,
          volunteeringDay,
          transportStatus,
          isRegistered: true,
        });
      } else {
        setUserInfo({ ...userInfo, schoolName, volunteeringDay });
        updateUserFields(userInfo.id, {
          ...userInfo,
          schoolName,
          volunteeringDay,
          isRegistered: true,
        });
      }
      router.replace('/');
    }
  }, [schoolName, volunteeringDay, transportStatus, userInfo]);

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace('UserScreening')}>
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View style={styles.mainContent}>
          <View style={styles.profileContainer}>
            <Text style={styles.nameText}>Welcome!</Text>
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.subtitle}>Your Assigned Volunteering Site</Text>
              <View style={styles.dropdownWrapper}>
                <View style={styles.dropdownContainer}>
                  <SelectList
                    setSelected={(val: string) => setSchoolName(val)}
                    data={schoolOptions}
                    inputStyles={styles.selectInput}
                    save="value"
                    placeholder="Select School"
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
                    setSelected={(val: VolunteeringDay) => setVolunteeringDay(val)}
                    data={DAYS_OF_WEEK}
                    placeholder="Select your assigned day"
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
                    setSelected={(val: TransportStatus) => setTransportStatus(val)}
                    data={TRANSPORT_METHOD_SELECTION}
                    placeholder="Select your transport status"
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
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
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
    fontSize: 32,
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
    color: '#36afbc',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  dropdownWrapper: {
    position: 'relative',
    zIndex: 1, // Ensure dropdown appears above other elements
  },
  dropdownContainer: {
    width: '100%',
  },
  selectInput: {
    fontSize: 16,
    width: '100%',
    color: '#36afbc',
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
  continueButton: {
    backgroundColor: '#36afbc',
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

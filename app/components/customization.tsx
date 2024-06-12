import { router } from 'expo-router';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';

import { SchoolKeyPair, getSchoolList, updateUserFields } from '../firebase/util';
import Context from './Context';
import ScreenWrapper from './ScreenWrapper';

export default function CustomizationScreen() {
  const { schoolName, setSchoolName, userInfo, setUserInfo } = useContext(Context);
  const [schoolOptions, setSchoolOptions] = useState<SchoolKeyPair[]>([]);
  const [dropdownStyle, setDropdownStyle] = useState<object>(styles.dropdownUnselected);

  // Update dropdown styling based on selection state
  useEffect(() => {
    setDropdownStyle(schoolName !== '' ? styles.dropdownSelected : styles.dropdownUnselected);
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
    } else {
      setSchoolName(schoolName);
      setUserInfo({ ...userInfo, schoolName });
      updateUserFields(userInfo.id, { ...userInfo, schoolName });
      router.replace('/');
    }
  }, [schoolName]);

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.mainContent}>
          <View style={styles.profileContainer}>
            <Text style={styles.nameText}>Welcome!</Text>
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.subtitle}>Your Volunteering Site</Text>
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
          </View>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
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
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 10,
  },
  infoContainer: {
    paddingHorizontal: 20,
  },
  infoRow: {
    marginBottom: 15,
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
    position: 'absolute',
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
    borderColor: '#36afbc',
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
});

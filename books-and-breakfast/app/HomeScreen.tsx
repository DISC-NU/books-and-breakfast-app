import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Alert, Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';

import ScreenWrapper from './ScreenWrapper'; // Import ScreenWrapper
import { SCHOOLS } from './data/SchoolDirections';

// Button configuration for smaller action buttons
const SMALLBUTTONS = [
  { index: 2, label: 'Mission Statement' },
  { index: 3, label: 'Evanston History' },
  { index: 4, label: 'B&B Team' },
  { index: 5, label: 'Link to GroupMe' },
];

// Utility function to handle URL opening with error management
const attemptOpenURL = async (url: string, failureMessage: string): Promise<void> => {
  const canOpen = await Linking.canOpenURL(url);
  if (canOpen) {
    await Linking.openURL(url);
  } else {
    Alert.alert('Error', failureMessage);
  }
};

function HomeScreen() {
  const navigation = useNavigation<any>();
  const [selected, setSelected] = useState<string>('');
  const [dropdownStyle, setDropdownStyle] = useState<object>(styles.dropdownUnselected);

  // Update dropdown styling based on selection state
  useEffect(() => {
    setDropdownStyle(selected !== '' ? styles.dropdownSelected : styles.dropdownUnselected);
  }, [selected]);

  // Button press handler for navigation and action buttons
  const handleButtonPress = (buttonIndex: number) => {
    switch (buttonIndex) {
      case 1:
        if (selected) {
          navigation.navigate('Navigation', { schoolName: selected });
        } else {
          // Handle the error - alert the user or log an error
          alert('Please select a school before continuing.');
        }
        break;
      case 2:
        navigation.navigate('Tracker');
        break;
      case 3:
        navigation.navigate('Mission');
        break;
      case 6:
        // Directly using the URL opening logic here
        attemptOpenURL(
          'https://groupme.com/join_group/58634493/LJyTEs7U',
          'Sorry, it looks like GroupMe cannot be opened.'
        );
        break;
      default:
        console.log(`Button ${buttonIndex} pressed`);
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.imageContainer}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      </View>
      <View style={styles.dropdownContainer}>
        <SelectList
          setSelected={(val: string) => setSelected(val)}
          data={SCHOOLS}
          inputStyles={{ fontSize: 16, width: '90%', color: '#36afbc' }}
          save="value"
          placeholder="Select School"
          maxHeight={275}
          search={false}
          boxStyles={dropdownStyle}
        />
        <View style={styles.buttonsGrid}>
          <TouchableOpacity style={styles.bigButton} onPress={() => handleButtonPress(1)}>
            <Image source={require('../assets/navicon.jpg')} style={styles.buttonIcon} />
            <Text style={styles.trackerNavText}>Navigation</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bigButton} onPress={() => handleButtonPress(2)}>
            <Image source={require('../assets/trackericon.jpg')} style={styles.buttonIcon} />
            <Text style={styles.trackerNavText}>Tracker</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonsGrid}>
          {SMALLBUTTONS.map((button) => (
            <TouchableOpacity
              key={button.index}
              style={styles.button}
              onPress={() => handleButtonPress(button.index + 1)}>
              <Text style={styles.buttonText}>{button.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    paddingHorizontal: 20,
    paddingTop: 20, // Keep top padding to distance from screen edge
    paddingBottom: 10, // Reduced bottom padding
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  dropdownContainer: {
    paddingHorizontal: 20,
    paddingTop: 0, // Remove top padding to bring closer to the image above
    paddingBottom: 20,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  bigButton: {
    margin: 8,
    height: 160,
    width: 160,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#36afbc',
    borderRadius: 30,
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowColor: '#000',
    shadowOffset: { height: 2, width: 0 },
    elevation: 5,
  },
  buttonIcon: {
    width: 50, // Adjust size as needed
    height: 50, // Adjust size as needed
    marginBottom: 10, // Space between the icon and text
  },
  logo: {
    width: 300,
    height: 100,
  },
  boxStyles: {
    borderRadius: 8,
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowColor: '#000',
    shadowOffset: { height: 2, width: 0 },
    elevation: 3,
  },
  dropdownUnselected: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 10,
  },
  dropdownSelected: {
    borderWidth: 2,
    borderColor: '#36afbc',
    borderRadius: 10,
  },
  buttonsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  button: {
    borderWidth: 0.5,
    borderColor: '#e73e5f',
    backgroundColor: '#FFFFFF',
    margin: 5,
    width: '95%',
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowColor: '#000',
    shadowOffset: { height: 2, width: 0 },
    elevation: 2,
  },
  buttonText: {
    color: '#36afbc',
    fontSize: 16,
  },
  trackerNavText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default HomeScreen;

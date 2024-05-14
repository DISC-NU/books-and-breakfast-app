import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';

import ScreenWrapper from './ScreenWrapper';
import { SchoolKeyPair, getSchoolList } from './firebase/util';
import ClockIcon from './icons/ClockIcon';
import MapIcon from './icons/MapIcon';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window'); // Get screen width and height

// Button configuration for smaller action buttons
const SMALLBUTTONS = [
  { index: 1, label: 'Mission Statement' },
  { index: 2, label: 'Morning Program' },
  { index: }
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
  const [schoolOptions, setSchoolOptions] = useState<SchoolKeyPair[]>([]);
  const [dropdownStyle, setDropdownStyle] = useState<object>(styles.dropdownUnselected);

  // Update dropdown styling based on selection state
  useEffect(() => {
    setDropdownStyle(selected !== '' ? styles.dropdownSelected : styles.dropdownUnselected);
  }, [selected]);

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

  // Button press handler for navigation and action buttons
  const handleButtonPress = (buttonIndex: number) => {
    const actions = {
      1: () => {
        if (!selected) {
          Alert.alert('Please select a school.');
        } else {
          navigation.navigate('Navigation', { schoolName: selected });
        }
      },
      2: () => {
        attemptOpenURL(
          'https://docs.google.com/document/d/17JsIMiF2knKqC4TZqaNPyEhFAvBbVVAbyQA0CX49lGo/edit',
          'Sorry, it looks like the Tracker cannot be opened'
        );
      },
      3: () => {
        if (!selected) {
          Alert.alert('Please select a school.');
        } else {
          navigation.navigate('Tips', { schoolName: selected });
        }
      },

      4: () => {
        attemptOpenURL(
          'https://groupme.com/join_group/58634493/LJyTEs7U',
          'Sorry, it looks like GroupMe cannot be opened.'
        );
      },
      5: () => navigation.navigate('Mission'),
    };

    const action = actions[buttonIndex];
    if (action) {
      action();
    } else {
      console.log(`Button ${buttonIndex} pressed with no action defined.`);
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
          data={schoolOptions}
          inputStyles={styles.selectInput}
          save="value"
          placeholder="Select School"
          maxHeight={275}
          search={false}
          boxStyles={dropdownStyle}
        />
      </View>
      <Text style={styles.subtitle}>Resources</Text>
      <View style={styles.buttonsGrid}>
        <TouchableOpacity style={styles.bigButton} onPress={() => handleButtonPress(1)}>
          <MapIcon />
          <Text style={styles.bigButtonText}>Directions</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bigButton} onPress={() => handleButtonPress(2)}>
          <ClockIcon />
          <Text style={styles.bigButtonText}>Tracker</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bigButton} onPress={() => handleButtonPress(3)}>
          <TipsIcon />
          <Text style={styles.bigButtonText}>Tips</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bigButton} onPress={() => handleButtonPress(4)}>
          <GroupMeIcon />
          <Text style={styles.bigButtonText}>GroupMe</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.subtitle}>Program Info</Text>
      <View style={styles.buttonsGrid}>
        {SMALLBUTTONS.map((button) => (
          <TouchableOpacity
            key={button.index}
            style={styles.button}
            onPress={() => handleButtonPress(4 + button.index)}>
            <Text style={styles.buttonText}>{button.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScreenWrapper>
  );
}

const layoutConstants = {
  padding: 20,
  subtitlePaddingLeft: screenWidth * 0.11,
  buttonMargin: screenWidth / 23,
  buttonSize: screenWidth / 2.9,
  smallButtonHeight: screenHeight / 15,
};

const styles = StyleSheet.create({
  imageContainer: {
    paddingHorizontal: layoutConstants.padding,
    paddingTop: 2,
    paddingBottom: 0,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  dropdownContainer: {
    paddingHorizontal: 20,
    paddingTop: 0,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingLeft: screenWidth / 19,
  },
  subtitle: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#36afbc',
    textAlign: 'left', // Align text to the left within the Text component
    paddingLeft: layoutConstants.subtitlePaddingLeft,
  },
  bigButton: {
    margin: layoutConstants.buttonMargin,
    height: layoutConstants.buttonSize,
    width: layoutConstants.buttonSize,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#36afbc',
    borderRadius: 30,
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowColor: '#000',
    shadowOffset: { height: 3, width: 0 },
    elevation: 5,
    borderWidth: 0.5,
    borderColor: '#ffffff',
  },
  selectInput: {
    fontSize: 16,
    width: '81%',
    color: '#36afbc',
  },
  selectInput: {
    fontSize: 16,
    width: '81%',
    color: '#36afbc',
  },
  buttonIcon: {
    width: 50, // Adjust size as needed
    height: 50, // Adjust size as needed
    marginBottom: 14, // Space between the icon and text
  },
  logo: {
    width: 300,
    height: 100,
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
    justifyContent: 'center',
  },
  button: {
    borderWidth: 0.2,
    borderColor: '#F3F3F3',
    backgroundColor: '#FFFFFF',
    margin: 10,
    width: '78%',
    height: screenHeight / 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowColor: '#000',
    shadowOffset: { height: 3, width: 0 },
    elevation: 2,
  },
  buttonText: {
    color: '#36afbc',
    fontSize: 16,
  },
  bigButtonText: {
    marginTop: 5,
    color: '#fff',
    fontSize: 16,
  },
});

export default HomeScreen;

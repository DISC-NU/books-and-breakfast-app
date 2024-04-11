import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import ScreenWrapper from './ScreenWrapper'; // Import ScreenWrapper

const SCHOOLS = [
  { key: '1', value: 'Willard Elementary School' },
  { key: '2', value: 'Dewey Elementary School' },
  { key: '3', value: 'Haven Middle School' },
  { key: '4', value: 'Kingsley Elementary School' },
  { key: '5', value: 'Lincoln Elementary School' },
  { key: '6', value: 'Walker Elementary School' },
  { key: '7', value: 'Washington Elementary School' },
  { key: '8', value: 'Lincolnwood Elementary School' },
];

// code to open urls
const attemptOpenURL = async (url: string, failureMessage: string): Promise<void> => {
  const canOpen = await Linking.canOpenURL(url);
  if (canOpen) {
    await Linking.openURL(url);
  } else {
    Alert.alert('Error', failureMessage);
  }
};

function HomeScreen() {
  const navigation = useNavigation();
  const [selected, setSelected] = useState<string>('');
  const [dropdownStyle, setDropdownStyle] = useState(styles.dropdownUnselected);

  useEffect(() => {
    if (selected !== '') {
      setDropdownStyle(styles.dropdownSelected);
    } else {
      setDropdownStyle(styles.dropdownUnselected);
    }
  }, [selected]);

  const SMALL_BUTTONS = [
    { label: 'Mission Statement', action: () => console.log('Mission Statement') },
    { label: 'Evanston History', action: () => console.log('Evanston History') },
    { label: 'B&B Team', action: () => console.log('B&B Team') },
    {
      label: 'Link to GroupMe',
      action: () =>
        attemptOpenURL(
          'https://groupme.com/join_group/58634493/LJyTEs7U',
          'Sorry, it looks like GroupMe cannot be opened.'
        ),
    },
  ];

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
          <TouchableOpacity
            style={styles.bigButton}
            onPress={() => navigation.navigate('Navigation')}>
            <Text style={styles.trackerNavText}>Navigation</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bigButton} onPress={() => navigation.navigate('Tracker')}>
            <Text style={styles.trackerNavText}>Tracker</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonsGridSmall}>
          {SMALL_BUTTONS.map((button, index) => (
            <TouchableOpacity key={index} style={styles.smallButton} onPress={button.action}>
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
  buttonsGridSmall: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  smallButton: {
    // Define styles for smaller buttons here
    borderWidth: 0.5,
    borderColor: '#e73e5f',
    backgroundColor: '#FFFFFF',
    margin: 5,
    width: '100%', // Adjust width for smaller buttons
    height: 72, // Keep or adjust the height as needed
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

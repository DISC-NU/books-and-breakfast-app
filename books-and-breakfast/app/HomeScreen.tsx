import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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

const SMALLBUTTONS = [
  { index: 2, label: 'Mission Statement' },
  { index: 3, label: 'Evanston History' },
  { index: 4, label: 'B&B Team' },
  { index: 5, label: 'Day in the Life' },
];

function HomeScreen() {
  const [selected, setSelected] = useState<string>('');
  const [dropdownStyle, setDropdownStyle] = useState(styles.dropdownUnselected);

  useEffect(() => {
    if (selected !== '') {
      setDropdownStyle(styles.dropdownSelected);
    } else {
      setDropdownStyle(styles.dropdownUnselected);
    }
  }, [selected]);

  const navigation = useNavigation();

  const handleButtonPress = (buttonIndex: number) => {
    if (buttonIndex == 1) {
      navigation.navigate('Navigation');
    } else if (buttonIndex == 2) {
      navigation.navigate('Tracker');
    }
    console.log(`Button ${buttonIndex} pressed`);
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
          <TouchableOpacity
            style={styles.bigButton} // Use the specific style for button 1
            onPress={() => handleButtonPress(1)}>
            <Text style={styles.trackerNavText}>Navigation</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bigButton} // Use the specific style for button 2
            onPress={() => handleButtonPress(2)}>
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

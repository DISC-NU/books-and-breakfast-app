import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
//import { SchoolTransportDetails } from './schooltransportdetails';

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
//
// Transportation article for later
//
// export default function App() {
//   return (
//     <View style={styles.container}>
//       <SchoolTransportDetails schoolName={'willard'} />
//     </View>
//   );
// }

const App = () => {
  const [selected, setSelected] = useState<string>(''); // Initial state of 'selected'

  // Enhance feedback by changing the style of the dropdown based on selection
  const [dropdownStyle, setDropdownStyle] = useState(styles.dropdownUnselected);

  useEffect(() => {
    if (selected !== '') {
      // Change the dropdown style when an item is selected
      setDropdownStyle(styles.dropdownSelected);
    } else {
      setDropdownStyle(styles.dropdownUnselected);
    }
  }, [selected]);

  // Function to handle button press
  const handleButtonPress = (buttonIndex: number) => {
    console.log(`Button ${buttonIndex} pressed`);
    // Add your button press handling logic here
  };

  return (
    <View style={styles.container}>
      <SelectList /* Dropdown List */
        setSelected={(val: string) => setSelected(val)}
        data={SCHOOLS}
        inputStyles={{
          fontSize: 14,
          width: '83%',
        }}
        save="value"
        dropdownStyles={{ backgroundColor: '#ADD8E6' }}
        placeholder="Select School"
        maxHeight={275}
        search={false}
        boxStyles={dropdownStyle}
      />
      {/* Buttons grid */}
      <View style={styles.buttonsGrid}>
        {Array.from({ length: 6 }, (_, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() => handleButtonPress(index + 1)}>
            <Text style={styles.buttonText}>Button {index + 1}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 50,
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  boxStyles: {
    borderRadius: 8, // Applying rounded corners here
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowColor: '#000',
    shadowOffset: { height: 2, width: 0 },
    elevation: 3,
  },
  dropdownUnselected: {
    borderWidth: 1,
    borderColor: '#999', // Unselected state border color
    // Keeping the borderRadius for consistency
    borderRadius: 8,
  },
  dropdownSelected: {
    borderWidth: 2,
    borderColor: '#007BFF', // Highlight color for selected state
    // Ensuring rounded corners are applied here as well
    borderRadius: 8,
  },
  buttonsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    borderWidth: 1,
    borderColor: '#4A90E2',
    paddingHorizontal: 30,
    paddingVertical: 15,
    margin: 5,
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4A90E2',
    borderRadius: 12, // More pronounced rounded corners for buttons
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowColor: '#000',
    shadowOffset: { height: 2, width: 0 },
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    // fontFamily: custom font tbd???
  },
});

export default App;

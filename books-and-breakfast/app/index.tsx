import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';

const App = () => {
  const [selected, setSelected] = useState<string>("");

  const data = [
    { key: '1', value: 'Willard Elementary School' },
    { key: '2', value: 'Dewey Elementary School' },
    { key: '3', value: 'Haven Middle School' },
    { key: '4', value: 'Kingsley Elementary School' },
    { key: '5', value: 'Lincoln Elementary School' },
    { key: '6', value: 'Walker Elementary School' },
    { key: '7', value: 'Washington Elementary School' },
    { key: '8', value: 'Lincolnwood Elementary School' },
  ];

  // Function to handle button press
  const handleButtonPress = (buttonIndex: number) => {
    console.log(`Button ${buttonIndex} pressed`);
    // Add your button press handling logic here
  };

  return (
    <View style={styles.container}>
      <SelectList 
        setSelected={(val: string) => setSelected(val)}
        data={data}
        inputStyles={{
          fontSize:14,
          width: '83%'
        }}
        save="value"
        dropdownStyles={{backgroundColor:'#ADD8E6'}}
        placeholder="Select school"
        maxHeight={275}
        search={false}
        boxStyles={{borderRadius:0}} //override default styles
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
  },
  buttonsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around', // Space buttons evenly in the container
    marginTop: 20,
  },
  button: {
    borderWidth: 1,
    borderColor: '#ABCDEF', // Red border color
    paddingHorizontal: 30,
    paddingVertical: 15,
    margin: 5,
    width: '40%', // Adjust button width to fit 2 in a row
    alignItems: 'center', // Center text horizontally
    justifyContent: 'center', // Center text vertically
    backgroundColor: 'transparent', // Transparent background
  },
  buttonText: {
    color: 'red', // Red text color
    fontSize: 16, // Font size for the button text
  },
});

export default App;

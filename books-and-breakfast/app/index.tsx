import React, { useState } from 'react'; // Import React and the useState hook from the 'react' package.
import {View, Text} from 'react-native' // Import View and Text components from the 'react-native' library.
import { SelectList } from 'react-native-dropdown-select-list'; // Import the SelectList component from the 'react-native-dropdown-select-list' package.

const App = () => { // Define a functional component named App.
  const [selected, setSelected] = useState<string>(""); // Initialize state named 'selected' with an empty string, using the useState hook. This state will store the current selection from the dropdown.

  const data = [ // Define an array named 'data' containing objects with 'key' and 'value' properties. These objects represent the options in the dropdown list.
    { key: '1', value: 'Willard Elementary'},
    { key: '2', value: 'Dewey Elementary' },
    { key: '3', value: 'Haven Middle' },
    { key: '4', value: 'Kingsley Elementary'},
    { key: '5', value: 'Lincoln Elementary' },
    { key: '6', value: 'Walker Elementary' },
    { key: '7', value: 'Washington Elementary' },
    { key: '8', value: 'Lincolnwood Elementary' },
  ];

  return ( // The component's return statement.
    <View style = {{paddingHorizontal:20,paddingVertical:50,flex:1}}> 
      {/* Render a View component with padding around it. This View acts as a container for the SelectList component. */}
      
      <SelectList 
        setSelected={(val: string) => setSelected(val)} // Pass a function to the setSelected prop that updates the 'selected' state with the value chosen from the dropdown.
        data={data} // Pass the 'data' array to the SelectList component to render the dropdown options.
        inputStyles={{fontSize:14}} // Apply custom styles to the input element of the SelectList, setting the font size to 14.
        save="value" // Specify that the 'value' property of the data objects should be used to track the selected item.
        dropdownStyles={{backgroundColor:'#ADD8E6'}} // Apply custom styles to the dropdown list, setting the background color to a light blue.
    />
    </View>
  );
};

export default App; // Export the App component to make it available for use in other parts of the application.

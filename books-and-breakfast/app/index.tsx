import React, { useState } from 'react'; // Import React and useState hook
import {View, Text} from 'react-native'
import { SelectList } from 'react-native-dropdown-select-list';

const App = () => {
  const [selected, setSelected] = useState<string>(""); // Specify the state type as string
  
  const data = [
    { key: '1', value: 'Willard Elementary'},
    { key: '2', value: 'Dewey Elementary' },
    { key: '3', value: 'Haven Middle' },
    { key: '4', value: 'Kingsley Elementary'},
    { key: '5', value: 'Lincoln Elementary' },
    { key: '6', value: 'Walker Elementary' },
    { key: '7', value: 'Washington Elementary' },
    { key: '8', value: 'Lincolnwood Elementary' },
  ];

  return (
    <View style = {{paddingHorizontal:20,paddingVertical:50,flex:1}}>
      <SelectList 
        setSelected={(val: string) => setSelected(val)} // Annotate the parameter type as string
        data={data} 
        inputStyles={{fontSize:14}}
        save="value"
        dropdownStyles={{backgroundColor:'#ADD8E6'}}
    />
    </View>
    
  );
};

export default App; // Don't forget to export your component

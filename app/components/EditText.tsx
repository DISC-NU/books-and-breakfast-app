import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput } from 'react-native';

// Props interface for EditText component
interface EditTextProps {
  value: string;
  onSave: (newValue: string) => void;
  edit: boolean;
  setEdit: (edit: boolean) => void;
  display: 'directions' | 'tips';
}

// Component to render an editable text input field
const EditText: React.FC<EditTextProps> = ({ value, onSave, edit, setEdit, display }) => {
  const [text, setText] = useState(value);

  // Function to handle saving text and exiting edit mode
  const finishSave = () => {
    onSave(text);
    setEdit(false);
  };

  // Update text state when value prop changes
  useEffect(() => {
    setText(value);
  }, [value]);

  const textStyle = display === 'directions' ? styles.directionsText : styles.tipText;
  const editStyle = display === 'directions' ? styles.editDirectionsText : styles.editTipText;

  return edit ? (
    <TextInput
      style={editStyle}
      value={text}
      onChangeText={setText}
      onBlur={finishSave}
      multiline
    />
  ) : (
    <Text style={textStyle}>{value}</Text>
  );
};

const styles = StyleSheet.create({
  directionsText: {
    fontSize: 16,
    textAlign: 'left',
    lineHeight: 23,
  },
  tipText: {
    fontSize: 15,
    color: 'black',
    padding: 10,
    margin: 5,
    width: '85%',
    fontWeight: 'condensedBold',
  },
  editDirectionsText: {
    fontSize: 16,
    textAlign: 'left',
    lineHeight: 23,
    borderWidth: 0.5,
    borderColor: 'gray',
    padding: 15,
  },
  editTipText: {
    fontSize: 15,
    color: 'black',
    padding: 10,
    margin: 5,
    width: '85%',
    fontWeight: 'condensedBold',
    borderWidth: 0.5,
    borderColor: 'gray',
  },
});

export default EditText;

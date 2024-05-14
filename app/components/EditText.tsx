import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput } from 'react-native';

// Props interface for EditText component
interface EditTextProps {
  value: string;
  onSave: (newValue: string) => void;
  edit: boolean;
  setEdit: (edit: boolean) => void;
}

// Component to render an editable text input field
const EditText: React.FC<EditTextProps> = ({ value, onSave, edit, setEdit }) => {
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

  return edit ? (
    <TextInput
      style={styles.editText}
      value={text}
      onChangeText={setText}
      onBlur={finishSave}
      multiline
    />
  ) : (
    <Text style={styles.text}>{value}</Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    textAlign: 'left',
    lineHeight: 23,
  },
  editText: {
    fontSize: 16,
    textAlign: 'left',
    lineHeight: 23,
    borderWidth: 0.5,
    borderColor: 'gray',
    padding: 15,
  },
});

export default EditText;

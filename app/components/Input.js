import { StyleSheet, TextInput } from "react-native";
import { BLACK, PLACEHOLDER_COLOR } from "../styles";

export default function Input({ autoFocus = false, placeholder, password = false, onChange, value }){
  return (
    <TextInput
        style={styles.input}
        autoFocus={autoFocus}
        placeholder={placeholder}
        placeholderTextColor={PLACEHOLDER_COLOR}
        secureTextEntry={password} 
        onChangeText={text => onChange(text)}
        value={value}
    />
  )
}

const styles = StyleSheet.create({
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: BLACK,
        borderRadius: 16,
        padding: 16,
    },
  });
  

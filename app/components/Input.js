import { StyleSheet, TextInput } from "react-native";
import { BLACK, PLACEHOLDER_COLOR } from "../styles";
import MaskInput from 'react-native-mask-input';

export default function Input({ type = "", maskInput = false, mask, autoFocus = false, placeholder, password = false, onChange, value }){


  if(maskInput){
    return (
      <MaskInput
          style={styles.input}
          autoFocus={autoFocus}
          placeholder={placeholder}
          placeholderTextColor={PLACEHOLDER_COLOR}
          onChangeText={(masked, unmasked) => {
            onChange(masked);
          }}
          value={value}
          mask={mask}
          keyboardType={type}
      />
    )
  }else{
    return (
      <TextInput
          style={styles.input}
          autoFocus={autoFocus}
          placeholder={placeholder}
          placeholderTextColor={PLACEHOLDER_COLOR}
          secureTextEntry={password} 
          onChangeText={text => onChange(text)}
          value={value}
          keyboardType={type}
      />
    )
  }

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
  

import { StyleSheet, TextInput, View, Pressable } from "react-native";
import { BLACK, ORANGE, PLACEHOLDER_COLOR, GREY } from "../styles";
import MaskInput from 'react-native-mask-input';

// Icons
import Feather from '@expo/vector-icons/Feather';

export default function Input({ type = "", maskInput = false, search = false, mask, autoFocus = false, placeholder, password = false, onChange, value, onSearch, multiline, numberOfLines}){

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
          inputMode={type}
      />
    )
  }else if(search){

    return <View style={styles.search}>
        <TextInput
        autoFocus={autoFocus}
        placeholder={placeholder}
        placeholderTextColor={GREY}
        secureTextEntry={password} 
        onChangeText={text => onChange(text)}
        value={value}
        inputMode={type}
      />
      <Pressable onPress={() => onSearch()}>
        <Feather name="search" size={24} color={GREY} />
      </Pressable>
    </View> 

  }else{
    return (
      <TextInput
          style={styles.input}
          multiline={multiline}
          numberOfLines={numberOfLines}
          autoFocus={autoFocus}
          placeholder={placeholder}
          placeholderTextColor={PLACEHOLDER_COLOR}
          secureTextEntry={password} 
          onChangeText={text => onChange(text)}
          value={value}
          inputMode={type}
      />
    )
  }

}

const styles = StyleSheet.create({
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: BLACK,
        borderRadius: 24,
        paddingVertical: 12,
        paddingHorizontal: 24,
    },
    search: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      borderWidth: 1,
      borderColor: GREY,
      borderRadius: 24,
      paddingVertical: 12,
      paddingHorizontal: 24,
  },
  });
  

import { StyleSheet, Pressable, Text } from "react-native";
import { ORANGE, WHITE } from "../styles";

export default function ButtonComponent({ text, onPress, outline }){

  if(outline){
    return (
      <Pressable style={styles.button_outline} onPress={onPress}>
          <Text style={styles.text_outline}>{text}</Text>
      </Pressable>
    )
  }else{
    return (
      <Pressable style={styles.button} onPress={onPress}>
          <Text style={styles.text}>{text}</Text>
      </Pressable>
    )
  }


}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        backgroundColor: ORANGE,
        borderWidth: 1,
        borderRadius: 24,
        borderColor: ORANGE,
        padding: 13,
    },
    button_outline: {
      width: '100%',
      backgroundColor: WHITE,
      borderWidth: 1,
      borderRadius: 24,
      borderColor: ORANGE,
      padding: 13,
    },
    text: {
        color: WHITE,
        fontWeight: '700',
        textAlign: 'center'
    },
    text_outline: {
        color: ORANGE,
        fontWeight: '700',
        textAlign: 'center'
    }
  });
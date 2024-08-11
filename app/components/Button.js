import { StyleSheet, Pressable, Text } from "react-native";
import { ORANGE, WHITE } from "../styles";

export default function Button({ text, onPress }){
  return (
    <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.text}>{text}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        backgroundColor: ORANGE,
        borderWidth: 1,
        borderRadius: 16,
        borderColor: ORANGE,
        padding: 16,
    },
    text: {
        color: WHITE,
        fontWeight: '700',
        textAlign: 'center'
    }
  });
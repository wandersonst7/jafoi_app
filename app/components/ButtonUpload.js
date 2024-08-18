import { StyleSheet, Pressable, Text } from "react-native";
import { BLACK } from "../styles";
import Feather from '@expo/vector-icons/Feather';

export default function ButtonUpload({ text, onPress }){

    return (
      <Pressable style={styles.button} onPress={onPress}>
          <Text style={styles.text}>{text}</Text>
          <Feather name="upload" size={24} color="black" />
      </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        borderWidth: 1,
        borderColor: BLACK,
        borderRadius: 24,
        paddingVertical: 12,
        paddingHorizontal: 24,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    text: {
        color: BLACK,
        fontWeight: '700',
        textAlign: 'center',
        marginRight: 8
    },
  });
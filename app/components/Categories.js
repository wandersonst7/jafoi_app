import { ORANGE, WHITE } from "../styles";
import { StyleSheet, Pressable, Text } from "react-native";

export default function Categories({ name, onPress, active }){

  if(active){
    return <Pressable style={styles.active} onPress={onPress}>
        <Text style={styles.text_active}>{ name }</Text>
    </Pressable>
  }else{
    return <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.text}>{ name }</Text>
    </Pressable>
  }

}

const styles = StyleSheet.create({
    button: {
        backgroundColor: WHITE,
        borderWidth: 1,
        borderRadius: 24,
        borderColor: ORANGE,
        paddingVertical: 8,
        paddingHorizontal: 20,
        marginRight: 16
    },
    active: {
      backgroundColor: ORANGE,
      borderWidth: 1,
      borderRadius: 24,
      borderColor: WHITE,
      paddingVertical: 8,
      paddingHorizontal: 20,
      marginRight: 16
  },
  text: {
      color: ORANGE,
      fontWeight: '700',
      textAlign: 'center'
  },
  text_active: {
    color: WHITE,
    fontWeight: '700',
    textAlign: 'center'
  }
});
import { ORANGE, WHITE, GREY } from "../styles";
import { StyleSheet, Pressable, Text } from "react-native";

export default function Category({ id, name, onPress, active }){

  if(active){
    return <Pressable style={styles.active} onPress={() => onPress(id)}>
        <Text style={styles.text_active}>{ name }</Text>
    </Pressable>
  }else{
    return <Pressable style={styles.button} onPress={() => onPress(id)}>
        <Text style={styles.text}>{ name }</Text>
    </Pressable>
  }

}

const styles = StyleSheet.create({
    button: {
        backgroundColor: WHITE,
        borderWidth: 1,
        borderRadius: 24,
        borderColor: GREY,
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
      color: GREY,
      fontWeight: '700',
      textAlign: 'center'
  },
  text_active: {
    color: WHITE,
    fontWeight: '700',
    textAlign: 'center'
  }
});
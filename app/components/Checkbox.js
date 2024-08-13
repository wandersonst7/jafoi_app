import { StyleSheet, Text, View, Pressable } from "react-native";
import { BLACK } from "../styles";
import Feather from '@expo/vector-icons/Feather';


export default function Checkbox({ text, checked, setChecked }){

    if(checked){
        return (
            <Pressable
                    style={styles.container} 
                    onPress={() => { 
                        setChecked(false)
                }}>
                    <View style={styles.box_checked}>
                        <Feather name="check" size={24} color="white" />
                    </View>
                    <Text style={styles.text}>{text}</Text>
            </Pressable>
        )
    }else{
        return (
            <Pressable
                style={styles.container} 
                onPress={() => { 
                    setChecked(true)
            }}>
                <View style={styles.box}></View>
                <Text style={styles.text}>{text}</Text>
            </Pressable>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
    },
    box: {
        width: 24,
        height: 24,
        borderWidth: 1,
        borderColor: BLACK,
        borderRadius: 4,
    },
    box_checked: {
        width: 24,
        height: 24,
        backgroundColor: BLACK,
        borderWidth: 1,
        borderColor: BLACK,
        borderRadius: 4,
    },
    text: {
        color: BLACK
    }
  });
  

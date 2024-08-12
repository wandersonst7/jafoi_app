import { StyleSheet, Text, View, Pressable } from "react-native";
import { BLACK } from "../styles";
import { useState } from "react";
import { Image } from "react-native";

export default function Checkbox({ text, onPress }){

    const [checked, setChecked] = useState(false);

    if(checked){
        return (
            <Pressable
                    style={styles.container} 
                    onPress={() => { 
                        setChecked(false) 
                        onPress()
                }}>
                    <View style={styles.box_checked}>
                        <Image 
                            style={{ width: 24, height: 24 }} 
                            source={require('../assets/img/check.png')} />
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
                    onPress()
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
  

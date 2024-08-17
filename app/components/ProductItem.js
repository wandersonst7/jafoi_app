import { StyleSheet, View, Image, Pressable, Text } from "react-native";
import { uploads } from "../services/api";
import { BLACK, ORANGE, WHITE, GREY } from "../styles";

// Icons
import Feather from '@expo/vector-icons/Feather';


export default function ProductItem({ id, image, title, username, location, onPress }){
  return (
    <View style={styles.container}>
        <View style={styles.image}>
            <Image source={{ uri: `${uploads}/${image}`}} resizeMode="cover" style={styles.image} />
        </View>
        <View style={styles.container_info}>
            <Text numberOfLines={1} style={styles.title}>{title}</Text>
            <View numberOfLines={1} style={styles.item_info}>
                <Feather name="map-pin" size={20} color={GREY} />
                <Text numberOfLines={1} style={styles.text_item_info}>{location}</Text>
            </View>
            <View numberOfLines={1} style={styles.item_info}>
                <Feather name="user" size={20} color={GREY} />
                <Text numberOfLines={1} style={styles.text_item_info}>{username}</Text>
            </View>
            <Pressable style={styles.btn_datails} onPress={() => onPress(id)}>
                <Text style={styles.text_btn_details}>Detalhes</Text>
            </Pressable>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: '98%',
        borderRadius: 16,
        backgroundColor: WHITE,
        shadowColor: GREY,
        shadowOffset: {
        width: 0,
        height: 3,
        },
        shadowOpacity:  0.17,
        shadowRadius: 3.05,
        elevation: 4,
        marginBottom: 24,
        alignSelf: 'center',
    },
    container_info: {
        padding: 24
    },
    title: {
        fontSize: 21,
        fontWeight: '700',
        color: BLACK,
        overflow: "hidden",
        marginBottom: 14,
    },
    item_info: {
        flexDirection: 'row',
        marginBottom: 8
    },
    text_item_info: {
        marginLeft: 4,
        fontSize: 16,
        fontWeight: '700',
        color: GREY,
    },
    image: {
        width: '100%',
        borderTopEndRadius: 16,
        borderTopStartRadius: 16,
        height: 200,
        overflow: 'hidden',
        backgroundColor: 'transparent'
    },
    btn_datails: {
        marginTop: 8,
        alignSelf: 'flex-end',
        backgroundColor: ORANGE,
        borderRadius: 24,
        paddingVertical: 8,
        paddingHorizontal: 20,
        shadowColor: "#000000",
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity:  0.17,
        shadowRadius: 2.54,
        elevation: 3
    },
    text_btn_details: {
        color: WHITE,
        fontWeight: '700',
    }
})
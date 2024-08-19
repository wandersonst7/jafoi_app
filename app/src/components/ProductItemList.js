import { StyleSheet, View, Pressable, Text, Alert } from "react-native";
import { BLACK, WHITE, RED, GREY, LINKS_COLOR, ORANGE } from "../styles";

// Icons
import Feather from '@expo/vector-icons/Feather';

export default function ProductItemList({ id, title, userLogged, username, onDelete, edit, details }){

    const handleDelete = () => {
        Alert.alert(
          "Confirmar Exclusão",
          "Você tem certeza que deseja excluir este item?",
          [
            {
              text: "Cancelar",
              style: "cancel"
            },
            {
              text: "Excluir",
              onPress: () => onDelete(id),
              style: "destructive"
            }
          ]
        );
    };

    if(userLogged){
        return (
            <View style={styles.container} >
                <View style={styles.titleGroup}>
                    <Feather name="tag" size={24} color={BLACK} />
                    <Text numberOfLines={1} style={styles.title}>{title}</Text>
                </View>
                <View style={styles.bodyProduct}>
                    <View>
                        <View style={styles.item_info}>
                            <Feather name="user" size={20} color={LINKS_COLOR} />
                            <Text numberOfLines={1} style={styles.text_item_info_logged}>Você</Text>
                        </View>
                    </View>
                    <View style={styles.actions}>
                        <Pressable style={styles.button_edit} onPress={() => edit(id)}>
                            <Feather name="edit" size={24} color={WHITE} />
                        </Pressable>
                        <Pressable style={styles.button_delete} onPress={() => handleDelete()}>
                            <Feather name="trash-2" size={24} color={WHITE} />
                        </Pressable>
                    </View>
                </View>
            </View>
        )
    }else{
        return (
            <View style={styles.container} >
                <View style={styles.titleGroup}>
                    <Feather name="tag" size={24} color={BLACK} />
                    <Text numberOfLines={1} style={styles.title}>{title}</Text>
                </View>
                <View style={styles.bodyProduct}>
                    <View>
                        <View style={styles.item_info}>
                            <Feather name="user" size={20} color={ORANGE} />
                            <Text numberOfLines={1} style={styles.text_item_info}>{username}</Text>
                        </View>
                    </View>
                    <View style={styles.actions}>
                        <Pressable style={styles.button_details} onPress={() => details(id)}>
                            <Feather name="eye" size={24} color={WHITE} />
                        </Pressable>
                        <Pressable style={styles.button_delete} onPress={() => handleDelete()}>
                            <Feather name="trash-2" size={24} color={WHITE} />
                        </Pressable>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: 16,
        backgroundColor: '#f7f7f7',
        marginBottom: 24,
        padding: 16
    },
    titleGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12
    },
    title: {
        fontSize: 21,
        fontWeight: '700',
        color: BLACK,
        marginLeft: 8
    },
    bodyProduct: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    item_info: {
        flexDirection: 'row',
        marginBottom: 8,
        maxWidth: 200,
    },
    text_item_info_logged: {
        marginLeft: 4,
        fontSize: 16,
        fontWeight: '700',
        color: LINKS_COLOR,
    },
    text_item_info: {
        marginLeft: 4,
        fontSize: 16,
        fontWeight: '700',
        color: ORANGE,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button_details: {
        backgroundColor: GREY,
        borderRadius: 8,
        padding: 16
    },
    button_edit: {
        backgroundColor: LINKS_COLOR,
        borderRadius: 8,
        padding: 16
    },
    button_delete: {
        backgroundColor: RED,
        borderRadius: 8,
        padding: 16,
        marginLeft: 12
    }
})
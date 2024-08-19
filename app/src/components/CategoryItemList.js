import { StyleSheet, View, Pressable, Text, Alert } from "react-native";
import { BLACK, WHITE, RED, LINKS_COLOR } from "../styles";

// Icons
import Feather from '@expo/vector-icons/Feather';

export default function CategoryItemList({ id, name, onDelete, edit }){

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

  return (
    <View style={styles.container} >
        <View style={styles.titleGroup}>
            <Feather name="bookmark" size={24} color={BLACK}/>
            <Text numberOfLines={1} style={styles.title}>{name}</Text>
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
  )
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
    actions: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end'
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
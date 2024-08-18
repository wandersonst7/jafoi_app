import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

export default function ProductList() {

  // Navigation
  const navigation = useNavigation();
  const [id, setId] = useState("66c16324c0d3ea967e82f674")

  const ProductEdit = () => {
    navigation.navigate("ProductEdit", {id: id});
  }

  return (
    <View style={styles.container}>
      <Text>Todos os Produtos Cadastrados</Text>
      <Pressable onPress={ProductEdit}>
          <Text>Editar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

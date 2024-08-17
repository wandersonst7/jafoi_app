import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ProductUserList() {

  // Navigation
  const navigation = useNavigation();

  const Home = () => {
    navigation.navigate("Home");
  }

  const ProductEdit = () => {
    navigation.navigate("ProductEdit");
  }

  return (
    <View style={styles.container}>
      <Text>Meus Produtos</Text>

      <Pressable style={{ margin: 8, backgroundColor: '#ff6600', padding: 10, borderRadius: 16 }} onPress={() => ProductEdit() }>
        <Text style={{ color: '#fff', fontWeight: '700' }}>Editar Produto</Text>
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

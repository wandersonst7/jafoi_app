import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ProductList() {

  // Navigation
  const navigation = useNavigation();

  const Home = () => {
    navigation.navigate("Home");
  }

  return (
    <View style={styles.container}>
      <Text>Meus Produtos</Text>
      <Pressable onPress={() => Home()}>
      <Pressable style={{ margin: 8, backgroundColor: '#ff6600', padding: 10, borderRadius: 16 }} onPress={() => Home() }>
        <Text style={{ color: '#fff', fontWeight: '700' }}>Home</Text>
      </Pressable>
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

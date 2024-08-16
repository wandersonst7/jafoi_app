import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function AddProduct() {

  // Navigation
  const navigation = useNavigation();

  const Home = () => {
    navigation.navigate("Home");
  }

  return (
    <View style={styles.container}>
      <Text>Cadastrar Produto</Text>
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

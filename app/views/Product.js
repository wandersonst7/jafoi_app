import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

export default function Product() {

  // Context
  const { user, token, logout } = useAuth();

  // Navigation
  const navigation = useNavigation();

  const Home = () => {
    navigation.navigate("Home");
  }

  return (
    <View style={styles.container}>
      <Text>Página de Descrição do Produto</Text>
      <Pressable onPress={() => Home()}>
        <Text>Voltar Home</Text>
      </Pressable>
      <StatusBar style="auto" />
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

import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';

export default function UserPage() {

    // Context
    const { user, token, logout, setAuthError } = useAuth();

  // Navigation
  const navigation = useNavigation();

  const ListProduct = () => {
    navigation.navigate("ListProduct");
  }

  return (
    <View style={styles.container}>
      <Text>Página do Usuário</Text>
      <Pressable style={{ margin: 8, backgroundColor: '#ff6600', padding: 10, borderRadius: 16 }} onPress={async () => await logout()}>
        <Text style={{ color: '#fff', fontWeight: '700' }}>Logout</Text>
      </Pressable>
      <Pressable style={{ margin: 8, backgroundColor: '#ff6600', padding: 10, borderRadius: 16 }} onPress={() => ListProduct() }>
        <Text style={{ color: '#fff', fontWeight: '700' }}>Meus Anúncios</Text>
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

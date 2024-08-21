import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { BLACK } from '../styles';

// Components
import ButtonComponent from '../components/ButtonComponent';

// Icons
import Feather from '@expo/vector-icons/Feather';

export default function UserPage() {

  // Context
  const { user, logout } = useAuth();

  // Navigation
  const navigation = useNavigation();

  // Resolvendo bug
  // Situação: 
  // O usuário realiza o login | 
  // Vem para página "Conta" (esta página) |
  // Entra na página de Produtos e volta para página "Conta" (esta página) |
  // Realiza o logout | Ao logar novamente, ele entra direto na página "Conta" (não pode) |
  // E não consegue acessar as rotas de produto, ou categoria (se for admin)
  // Solução:
  // Ao realizar logout, redireciono o usuário para a página Inicio |
  const ExitRedirectBug = async () => {
    await logout();
    navigation.navigate("Inicio")
  };

  const ProductList = () => {
    navigation.navigate("ProductList");
  }

  const CategoryList = () => {
    navigation.navigate("CategoryList");
  }

  return (
    <View style={styles.container}>

      <View style={styles.container_user}>
        <Feather name="user" size={34} color={BLACK} />
        <Text numberOfLines={1} style={styles.text_user}>{user.name}</Text>
      </View>

      <View style={{ marginBottom: 24, width: '100%'}}>
        <ButtonComponent onPress={ProductList} text="Produtos"/>
      </View>

      { user.role === "ADMIN" && (
        <>
        <View style={{ marginBottom: 24, width: '100%'}}>
          <ButtonComponent onPress={CategoryList} text="Categorias"/>
        </View>
        </>
      )}

      <View style={{ marginBottom: 24, width: '100%'}}>
        <ButtonComponent text="Logout" onPress={ ExitRedirectBug } outline={true}/>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 44
  },
  container_user: { 
    marginBottom: 24, 
    width: '100%', 
    flexDirection: 'row',
    justifyContent: 'center'
  },
  text_user: {
    fontSize: 26,
    fontWeight: '700',
    color: BLACK,
    marginLeft: 8,
  }
});

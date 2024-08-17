import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';

// Components
import ButtonComponent from '../components/ButtonComponent';

export default function UserPage() {

    // Context
    const { user, logout } = useAuth();

  // Navigation
  const navigation = useNavigation();

  const ProductUserList = () => {
    navigation.navigate("ProductUserList");
  }

  const ProductList = () => {
    navigation.navigate("ProductList");
  }

  const CategoryList = () => {
    navigation.navigate("CategoryList");
  }

  return (
    <View style={styles.container}>

      <View style={{ marginBottom: 24, width: '100%'}}>
        <ButtonComponent onPress={ProductUserList} text="Meus Produtos"/>
      </View>

      { user.role === "ADMIN" && (
        <>
        <View style={{ marginBottom: 24, width: '100%'}}>
          <ButtonComponent onPress={ProductList} text="Todos os Produtos"/>
        </View>
        <View style={{ marginBottom: 24, width: '100%'}}>
          <ButtonComponent onPress={CategoryList} text="Categorias"/>
        </View>
        </>
      )}

      <View style={{ marginBottom: 24, width: '100%'}}>
        <ButtonComponent text="Logout" onPress={ logout } outline={true}/>
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
});

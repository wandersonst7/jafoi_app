import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { useState, useEffect, useCallback } from 'react';
import { getAllProducts, deleteProduct } from '../../requests/ProductsRequest';
import { useAuth } from '../../context/AuthContext';
import { global_styles, BLACK } from '../../styles';

// Components
import Loading from '../../components/Loading';
import ProductItemList from '../../components/ProductItemList';
import RequestMessage from '../../components/RequestMessage';

export default function ProductList() {

  // Context
  const { user, token, logout, setAuthError} = useAuth();

  // States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [products, setProducts] = useState(null);

  // Navigation
  const navigation = useNavigation();
  const route = useRoute();

  useFocusEffect(
    useCallback(() => {
      
      (async () => {

        try{

          setLoading(true)

          const respProducts = await getAllProducts(token)

          if(respProducts.status === 401){
            await logout()
            setAuthError("A sessão expirou.")
            navigation.navigate("Login");
            return;
          }
    
          const jsonProducts = await respProducts.json();

          if(jsonProducts.length > 0){
            setProducts(jsonProducts)
          }else{
            setProducts(null)
          }
      
        }catch(err){
          console.log(err)
        }finally{
          setLoading(false)
        }
  
      })()

      setError("")

      if(route.params && route.params.success){
        setSuccess(route.params.success)
      }

    }, [
      logout, 
      token,
      route.params
    ])
  )

  useEffect(() => {
    setTimeout(() => {
      setSuccess("")
    }, 3000)
  }, [success])

  const ProductEdit = (id) => {
    navigation.navigate("ProductEdit", {id: id});
  }

  const ProductDetails = (id) => {
    navigation.navigate("ProductDetails", { id: id})
  }

  const onDeleteProduct = async (id) => {
    try {
      setLoading(true)
      const resp = await deleteProduct(token, id);

      if(resp.status === 401){
        await logout()
        setAuthError("A sessão expirou.")
        navigation.navigate("Login");
        return;
      }

      if(resp.status !== 200){
        const json = await resp.json();
        setError(json.error)
        return;
      }

      setProducts(prevProducts => prevProducts.filter(product => product._id !== id));
      setError("")
      setSuccess('Produto excluído com sucesso.')
      
    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false)
    }
  }

  // Exibindo Loading
  if(loading){
      return <Loading />
  }

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollview} showsVerticalScrollIndicator={false}>

        <Text style={{...global_styles.title, textAlign: 'center', marginBottom: 24}}>Produtos</Text>

        { error && (
          <View style={{ marginBottom: 24, width: '100%'}}>
            <RequestMessage status="error" message={error} />
          </View>
        )}

        { success && (
          <View style={{ marginBottom: 24, width: '100%'}}>
            <RequestMessage status="success" message={success} />
          </View>
        )}

        <ScrollView style={{ marginBottom: 24 }} showsVerticalScrollIndicator={false}>
          {products && products.map((product) => (
            <ProductItemList key={product._id}
            userLogged={product.userId === user._id} 
            id={product._id} 
            title={product.title}
            username={product.username} 
            details={ProductDetails}  
            onDelete={onDeleteProduct} 
            edit={ProductEdit} />
          ))}
        </ScrollView>
      
        {!products && <Text style={{ textAlign: 'center', color: BLACK }}>Não foram encontrados produtos.</Text>}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollview: {
    backgroundColor: '#fff',
    padding: 24,
  },
});

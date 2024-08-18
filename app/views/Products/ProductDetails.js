import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { getProduct } from '../../requests/ProductsRequest';
import Loading from '../../components/Loading';
import { useAuth } from '../../context/AuthContext';
import { BLACK } from '../../styles';

export default function ProductDetails() {

    // Context
    const { token, setAuthError, logout } = useAuth();

    // States
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);

  // Navigation
  const navigation = useNavigation();
  const route = useRoute();

  useFocusEffect(
    useCallback(() => {

        (async () => {
            try {
                setLoading(true)

                if(route.params.id){
                    const respProduct = await getProduct(token, route.params.id);
            
                    if(respProduct.status === 401){
                      await logout()
                      setAuthError("A sessão expirou.")
                      navigation.navigate("Login");
                      return;
                    }
            
                    const jsonProduct = await respProduct.json();
                    console.log(jsonProduct)
          
                    if(jsonProduct._id){
                      setProduct(jsonProduct)
                    }
                    
                    console.log(product)
                }

            } catch (error) {
                console.log(error)
            }finally{
                setLoading(false)
            }
        })()

    }, [route.params.id])
  )

    // Exibindo Loading
    if(loading){
        return <Loading />
    }

  return (
    <View style={styles.container}>
        { product && (
            <>
                <Text>{product.title}</Text>
                <Text>{product.description}</Text>
                <Text>{product.price}</Text>
                <Text>{product.location}</Text>
                <Text>{product.contact}</Text>
                <Text>{product.username}</Text>
                <Text>{product.whatsapp}</Text>
            </>
        )}
        {!product && <Text style={{ textAlign: 'center', color: BLACK }}>O produto não foi encontrado.</Text>}
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

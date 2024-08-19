import { StyleSheet, Text, View, Linking, Pressable, Image, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { getProduct } from '../../requests/ProductsRequest';
import { useAuth } from '../../context/AuthContext';
import { BLACK, GREY, ORANGE } from '../../styles';
import { uploads } from '../../services/api';

// Components
import Loading from '../../components/Loading';
import WhatsappButton from '../../components/WhatsappButton';

// Icons
import Feather from '@expo/vector-icons/Feather';

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
          
                    if(jsonProduct._id){
                      setProduct(jsonProduct)
                    }
                    
                }

            } catch (error) {
              
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
    <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollview} showsVerticalScrollIndicator={false}>
        { product && (
            <>
              <View>
                  <Image source={{ uri: `${uploads}/${product.image}`}} resizeMode="cover" style={styles.image}/>
              </View>

              <View style={styles.container_info}>
                <Text style={styles.title}>{product.title}</Text>

                <View style={styles.item_info}>
                  <Text style={styles.info_text}>{product.description}</Text>
                </View>
                
                <View style={styles.item_info}>
                  <Feather name="map-pin" size={20} color={ORANGE} />
                  <Text style={{ ...styles.text_item_info, color: ORANGE }}>{product.location}</Text>
                </View>

                <View style={styles.item_info}>
                  <Feather name="user" size={20} color={ORANGE} />
                  <Text style={{ ...styles.text_item_info, color: ORANGE }}>{product.username}</Text>
                </View>

                <View style={styles.item_info}>
                  <View style={styles.price}>
                      <Text style={styles.cifrao}>R$</Text>
                      <Text style={styles.price_value}>{product.price}</Text>
                  </View>
                </View>

                {/* SUMIR BARRA DE navegação quando abrir teclado */}

                {/* Whatsapp */}
                <View style={{ marginBottom: 24 }}>
                  <WhatsappButton text="Whatsapp" 
                    productTitle={product.title}
                    whatsapp={product.whatsapp}
                  />
                </View>

                <View style={styles.container_contact}>
                  <Text style={{ ...styles.text_item_info, color: ORANGE, marginLeft: 0 }}>Contato Alternativo: </Text>
                  <Text style={{ color: BLACK }}>{product.contact}</Text>                
                </View>
                
              </View>
            </>
          )}
            {!product && <Text style={{ textAlign: 'center', color: BLACK }}>O produto não foi encontrado.</Text>}
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
  },
  image: {
    width: '100%',
    height: 300,
    overflow: 'hidden',
    backgroundColor: 'transparent'
  },
  container_info: {
    padding: 24
  },
  title: {
    fontSize: 21,
    fontWeight: '700',
    color: BLACK,
    overflow: "hidden",
    marginBottom: 16,
  },
  item_info: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  container_contact: {
    flexDirection: 'column',
    marginBottom: 16
  },
  text_item_info: {
      marginLeft: 4,
      fontSize: 16,
      fontWeight: '700',
      color: GREY,
  },
    container_price_btn_details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  price: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  cifrao: {
      fontSize: 16,
      fontWeight: '700',
      color: '#AAAAAA',
      marginTop: 5,
      marginRight: 4,
  },
  price_value: {
      fontSize: 26,
      fontWeight: '700',
      color: "#2F9E41",
  },
});

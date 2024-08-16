import { StatusBar } from 'expo-status-bar';
import { StyleSheet, FlatList, Text, View, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { getCategories } from '../requests/CategoriesRequest';
import { searchProducts, getProductsByCategory, getAllAvailableProducts } from '../requests/ProductsRequest';

// Styles
import { global_styles, ORANGE, BLACK } from '../styles';

// Components
import Input from '../components/Input';
import Category from '../components/Category';
import ProductItem from '../components/ProductItem';
import Loading from '../components/Loading';

// Icons
import Feather from '@expo/vector-icons/Feather';

export default function Home() {

  // States
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState(null);
  const [products, setProducts] = useState(null);

  // States Filtro Categoria
  const [activeCategory, setActiveCategory] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState(null);

  // Context
  const { user, token, logout, setAuthError } = useAuth();

  // Navigation
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {

      (async () => {

        try{

          if(!search){
            setLoading(true)

            const respCategories = await getCategories(token)
            
            let respProducts;
            if(activeCategory){
              respProducts = await getProductsByCategory(token, activeCategoryId)
            }else{
              respProducts = await getAllAvailableProducts(token)
            }
  
            if(respCategories.status === 401 || respProducts.status === 401){
              await logout()
              setAuthError("A sessão expirou.")
              navigation.navigate("Login");
              return;
            }
      
            const jsonCategories = await respCategories.json();
            const jsonProducts = await respProducts.json();
    
            if(jsonCategories.length > 0){
              setCategories(jsonCategories)
            }
  
            if(jsonProducts.length > 0){
              setProducts(jsonProducts)
            }  
          }
      
        }catch(err){
          console.log(err)
        }finally{
          setLoading(false)
        }
  
      })()

    }, [
      logout, 
      token,
      activeCategory, 
      activeCategoryId,
    ])
  )
  
  const filterCategory = (categoryId) => {
    if(categoryId === activeCategoryId && activeCategory){
      setActiveCategory(false)
      setActiveCategoryId(null)
    }else{
      // Esvaziando busca
      setSearch("")
      setActiveCategoryId(categoryId)
      setActiveCategory(true)
    }
  }

  const onSearch = async () => {
      let respProducts = null;

      try {
        setLoading(true)

        respProducts = await searchProducts(token, search)
  
        const jsonProducts = await respProducts.json();
        if(jsonProducts.length > 0){
          setProducts(jsonProducts)
        }else{
          setProducts(null)
        }

        // Desmarcando a categoria
        setActiveCategory(false)
        setActiveCategoryId(null)

      } catch (error) {
        console.log(error)
      }finally{
        setLoading(false)
      }
  }

  const ProductDetails = (id) => {
    navigation.navigate("ProductDetails", { id: id})
  }

    // Exibindo Loading
    if(loading){
        return <Loading />
    }

  return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollview} showsVerticalScrollIndicator={false}>

        <View style={{ marginBottom: 44, width: '100%'}}>
          <Input
            search={true}
            onSearch={onSearch}
            autoFocus={false} 
            onChange={setSearch} 
            value={search} 
            placeholder="Faça uma busca"/>
        </View>

        <View style={styles.container_topics}>
          <Text style={global_styles.topics_orange}>Categorias</Text>
          <Feather name="arrow-right" size={24} color="#EB7330" />
        </View>

        <ScrollView showsHorizontalScrollIndicator={false} style={{ marginBottom: 44 }} horizontal={true}>
          {categories && categories.map((category) => (

            activeCategoryId === category._id ? 
              <Category key={category._id} id={category._id} name={category.name} active={true} onPress={filterCategory}/>
            : (
              <Category key={category._id} id={category._id} name={category.name} onPress={filterCategory}/>
            )
            
          ))}

          {!categories && <Text style={{ textAlign: 'center', color: BLACK }}>Não há categorias.</Text>}
        </ScrollView>

        <View style={styles.container_topics}>
          <Text style={global_styles.topics_orange}>Ultimos Anúncios</Text>
          <Feather name="arrow-down" size={24} color="#EB7330"/>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 44 }}>
          {products && products.map((product) => (
              <ProductItem key={product._id}
                id={product._id} 
                image={product.image} 
                title={product.title} 
                username={product.username}
                location={product.location}
                onPress={ ProductDetails } 
              />
            ))}
          {!products && <Text style={{ textAlign: 'center', color: BLACK }}>Não há produtos anunciados.</Text>}
        </ScrollView>

        </ScrollView>
        <StatusBar style="auto" />
      </SafeAreaView>
     
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container_topics: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 24, 
    width: '100%'
  },
  scrollview: {
    backgroundColor: '#fff',
    padding: 24,
  },
});

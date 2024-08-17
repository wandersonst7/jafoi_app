import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useState, useCallback } from 'react';
import { getCategories } from '../../requests/CategoriesRequest';
import { global_styles, BLACK } from '../../styles';
import { useAuth } from '../../context/AuthContext';
import { deleteCategory } from '../../requests/CategoriesRequest';

// Components
import Loading from '../../components/Loading';
import CategoryItemList from '../../components/CategoryItemList';
import RequestMessage from '../../components/RequestMessage';
import ButtonComponent from '../../components/ButtonComponent';

export default function CategoryList() {

    // Context
    const { token, logout, setAuthError} = useAuth();

    // States
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [categories, setCategories] = useState(null);

    // Navigation
    const navigation = useNavigation();

    useFocusEffect(
      useCallback(() => {
        
        (async () => {
  
          try{
  
            setLoading(true)

            const respCategories = await getCategories(token)
  
            if(respCategories.status === 401){
              await logout()
              setAuthError("A sessão expirou.")
              navigation.navigate("Login");
              return;
            }
      
            const jsonCategories = await respCategories.json();

            if(jsonCategories.length > 0){
              setCategories(jsonCategories)
            }
        
          }catch(err){
            console.log(err)
          }finally{
            setLoading(false)
          }
    
        })()

        setError("")
  
      }, [
        logout, 
        token,
      ])
    )

    const CategoryEdit = (id) => {
      navigation.navigate("CategoryEdit", { id: id })
    }

    const onDeleteCategory = async (id) => {
      try {
        setLoading(true)
        const resp = await deleteCategory(token, id);

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

        setCategories(prevCategories => prevCategories.filter(category => category._id !== id));
        setError("")
        
      } catch (error) {
        console.log(error)
      }finally{
        setLoading(false)
      }
    }

    const CategoryNew = () => {
      navigation.navigate("CategoryNew");
    }

    // Exibindo Loading
    if(loading){
        return <Loading />
    }

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollview} showsVerticalScrollIndicator={false}>

        <Text style={{...global_styles.title, textAlign: 'center', marginBottom: 24}}>Categorias</Text>
        
        <View style={{ marginBottom: 24, width: '50%', marginHorizontal: 'auto'}}>
            <ButtonComponent text="Cadastrar" onPress={ CategoryNew } outline={true}/>
        </View>

        { error && (
          <View style={{ marginBottom: 24, width: '100%'}}>
            <RequestMessage status="error" message={error} />
          </View>
        )}

        <ScrollView showsHorizontalScrollIndicator={false}>
          {categories && categories.map((category) => (
            <CategoryItemList key={category._id} id={category._id} name={category.name} onDelete={onDeleteCategory} edit={CategoryEdit}/>
          ))}
        </ScrollView>
      
        {!categories && <Text style={{ textAlign: 'center', color: BLACK }}>Não foi possível carregar categorias.</Text>}
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

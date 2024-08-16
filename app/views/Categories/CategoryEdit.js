import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useNavigation, useFocusEffect, useRoute } from '@react-navigation/native';
import { useState, useCallback, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getCategory } from '../../requests/CategoriesRequest';

// components
import Loading from '../../components/Loading';

export default function CategoryEdit() {

  // Context
  const { token, setAuthError, logout } = useAuth();

  // States
  const [category, setCategory] = useState(null);
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
                  
                    const respCategory = await getCategory(token, route.params.id);
            
                    if(respCategory.status === 401){
                      await logout()
                      setAuthError("A sessão expirou.")
                      navigation.navigate("Login");
                      return;
                    }
            
                    const jsonCategory = await respCategory.json();
                    console.log(jsonCategory)
          
                    if(jsonCategory._id){
                      setCategory(jsonCategory)
                    }
                }

            } catch (error) {
                console.log(error)
            }finally{
                setLoading(false)
            }
        })()

    }, [route.params.id])
  )

  useEffect(() => {
    (async () => {
      if (route.params.id) {
        console.log(route.params.id)
      }
    })();
  }, [route.params.id]);

    // Exibindo Loading
    if(loading){
        return <Loading />
    }

  return (
    <View style={styles.container}>
      <Text>Editar Categoria</Text>
      { category && (
            <>
              <Text>{category.name}</Text>
            </>
        )}
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

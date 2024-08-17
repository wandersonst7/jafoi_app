import { StyleSheet, Text, View, SafeAreaView  } from 'react-native';
import { useNavigation, useFocusEffect, useRoute } from '@react-navigation/native';
import { useState, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getCategory, updateCategory } from '../../requests/CategoriesRequest';
import { global_styles } from '../../styles';

// components
import Loading from '../../components/Loading';
import RequestMessage from '../../components/RequestMessage';
import ButtonComponent from '../../components/ButtonComponent';
import Input from '../../components/Input';

export default function CategoryEdit() {

  // Context
  const { token, setAuthError, logout } = useAuth();

  // States
  const [id, setId] = useState(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
          
                    if(jsonCategory._id){
                      setId(jsonCategory._id)
                      setName(jsonCategory.name)
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

  const editCategory = async () => {

    const data = {
        name: name
    }

    try {
      setLoading(true)
      const resp = await updateCategory(token, data, id);

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

      navigation.navigate("CategoryList")
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

        <Text style={{...global_styles.title, textAlign: 'center', marginBottom: 24}}>Editar Categoria</Text>

        { error && (
          <View style={{ marginBottom: 24, width: '100%'}}>
            <RequestMessage status="error" message={error} />
          </View>
        )}

        <View style={{ marginBottom: 24, width: '100%'}}>
            <Input
            autoFocus={true} 
            onChange={setName} 
            value={name} 
            placeholder="Nome da categoria"/>
        </View>

        <View style={{ marginBottom: 24, width: '100%'}}>
            <ButtonComponent text="Salvar" onPress={ editCategory }/>
        </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 44
  },
});

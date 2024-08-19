import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { global_styles } from '../../styles';
import { useAuth } from '../../context/AuthContext';
import { createCategory } from '../../requests/CategoriesRequest';

// Components
import Loading from '../../components/Loading';
import RequestMessage from '../../components/RequestMessage';
import ButtonComponent from '../../components/ButtonComponent';
import Input from '../../components/Input';

export default function CategoryNew() {

    // Context
    const { token, logout, setAuthError} = useAuth();

    // States
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [name, setName] = useState("");

    // Navigation
    const navigation = useNavigation();

    const saveCategory = async () => {

        const data = {
            name: name
        }

      try {
        setLoading(true)
        const resp = await createCategory(token, data);

        if(resp.status === 401){
          await logout()
          setAuthError("A sessão expirou.")
          navigation.navigate("Login");
          return;
        }

        if(resp.status !== 201){
          const json = await resp.json();
          setError(json.error)
          return;
        }

        navigation.navigate("CategoryList", {success: "Categoria cadastrada com sucesso."})
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
    <View style={styles.container}>

        <Text style={{...global_styles.title, textAlign: 'center', marginBottom: 24}}>Cadastrar Categoria</Text>

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
            <ButtonComponent text="Salvar" onPress={ saveCategory }/>
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
        padding: 44
    },
});

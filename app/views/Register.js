import { useState } from "react"
import { StatusBar } from 'expo-status-bar';
import { View, Text, Image, Pressable, ActivityIndicator } from "react-native";
import { global_styles, BLACK, LINKS_COLOR, ORANGE } from "../styles";
import { useNavigation } from '@react-navigation/native';
import { useAuth } from "../context/AuthContext";
import AsyncStorage from '@react-native-async-storage/async-storage';

// components
import Input from "../components/Input"
import ButtonComponent from "../components/ButtonComponent";
import RequestMessage from "../components/RequestMessage";
import Loading from "../components/Loading";

export default function Register(){

    // Context
    const { register, setUser, setToken, loading, setLoading, } = useAuth();

    // Navigation
    const navigation = useNavigation();

    // Register
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    
    // Error
    const [error, setError] = useState("");

    const handleSubmit = async () => {

      const data = {
        name,
        phone, 
        password,
      }
      
      try{
        setLoading(true)
        const resp = await register(data);
        const json = await resp.json();

        if(resp.status !== 201){
          setError(json.error)
          return;
        }

        setUser(json.data.user)
        setToken(json.data.token)
        await AsyncStorage.setItem('jfa_token', json.data.token);
        setError("")
        navigation.navigate('Inicio');
      }catch(err){
        setError("Ocorreu um erro ao realizar o cadastro.")
      }finally{
        setLoading(false)
      }
      
    }

    const Login = () => {
      navigation.navigate('Login');
    }

    // Exibindo Loading
    if(loading){
      return <Loading />
    }

  return (
    <View style={global_styles.container}>

      <Image style={{ marginBottom: 34 }} source={require('../assets/img/logo.png')} />

      <Text style={{...global_styles.title, marginBottom: 34}}>Cadastre-se</Text>

      <View style={{ marginBottom: 16, width: '100%'}}>
        <Input
          autoFocus={true} 
          onChange={setName} 
          value={name} 
          placeholder="Seu nome"/>
      </View>

      <View style={{ marginBottom: 16, width: '100%' }}>
        <Input
          autoFocus={true}
          maskInput={true}
          type="numeric"
          mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]} 
          onChange={setPhone} 
          value={phone} 
          placeholder="Seu número de telefone"/>
      </View>

      <View style={{ marginBottom: 16, width: '100%'}}>
        <Input 
          password={true} 
          onChange={setPassword} 
          value={password} 
          placeholder="Senha"/>
      </View>

      <View style={{ marginBottom: 24, width: '100%'}}>
        <ButtonComponent text="Cadastre-se" onPress={ handleSubmit }/>
      </View>

      { error && (
        <View style={{ marginBottom: 24, width: '100%'}}>
          <RequestMessage status="error" message={error} />
        </View>
      )}

      <View style={{ marginBottom: 16 }}>
        <Text style={{ color: BLACK }} >Já possui cadastro?</Text>
      </View>

      <View>
        <Pressable onPress={() => Login()}>
          <Text style={{ color: LINKS_COLOR, fontWeight: '700' }}>Fazer Login</Text>
        </Pressable>
      </View>
      
      <StatusBar style="auto" />
    </View>
  )
}



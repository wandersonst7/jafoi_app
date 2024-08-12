import { useState } from "react"
import { StatusBar } from 'expo-status-bar';
import { View, Text, Image, Pressable } from "react-native";
import { global_styles, BLACK, LINKS_COLOR } from "../styles";
import { useNavigation } from '@react-navigation/native';

// components
import Input from "../components/Input"
import ButtonComponent from "../components/ButtonComponent";
import Checkbox from "../components/Checkbox";
import RequestMessage from "../components/RequestMessage";
import { useAuth } from "../context/AuthContext";

export default function Login(){

  // Context
  const { setUser, setToken, login } = useAuth();

  // Navigation
  const navigation = useNavigation();

  // Utils
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Login
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [keepAlive, setKeepAlive] = useState(false);

  const handleSubmit = async () => {

    const data = {
      phone, 
      password,
      keepAlive
    }

    try{
      setLoading(true)
      const resp = await login(data);
      const json = await resp.json();

      if(resp.status !== 200){
        setError(json.error)
        return;
      }

      setUser(json.data.user)
      setToken(json.data.token)
      navigation.navigate('Home');
    }catch(err){
      console.log(err)
      setError("Ocorreu um erro ao realizar o login.")
    }finally{
      setLoading(false)
    }

  }

  const toggleKeepAlive = () => {
    if(keepAlive){
      setKeepAlive(false)
    }else{
      setKeepAlive(true)
    }
  }

  const Register = () => {
    navigation.navigate('Register');
  }

  // Exibindo Loading
  if(loading){
    return <Text>Loading...</Text>
  }

  return (
    <View style={global_styles.container}>

      <Image style={{ marginBottom: 64 }} source={require('../assets/img/logo.png')} />

      <Text style={{...global_styles.title, marginBottom: 34}}>Login</Text>

      <View style={{ marginBottom: 16, width: '100%'}}>
        <Input
          autoFocus={true} 
          onChange={setPhone} 
          value={phone} 
          placeholder="Número de telefone"/>
      </View>

      <View style={{ marginBottom: 16, width: '100%'}}>
        <Input 
          password={true} 
          onChange={setPassword} 
          value={password} 
          placeholder="Senha"/>
      </View>

      <View style={{ marginBottom: 24, width: '100%'}}>
        <ButtonComponent text="Entrar" onPress={ handleSubmit }/>
      </View>

      <View style={{ marginBottom: 34 }}>
        <Checkbox onPress={toggleKeepAlive} text="Manter Conectado"/>
      </View>

      { error && (
        <View style={{ marginBottom: 24, width: '100%'}}>
          <RequestMessage status="error" message={error} />
        </View>
      )}

      <View style={{ marginBottom: 16 }}>
        <Text style={{ color: BLACK }} >Ainda não possui cadastro?</Text>
      </View>

      <View>
        <Pressable onPress={() => Register()}>
          <Text style={{ color: LINKS_COLOR, fontWeight: '700' }}>Cadastre-se</Text>
        </Pressable>
      </View>
      
      <StatusBar style="auto" />
    </View>
  )
}



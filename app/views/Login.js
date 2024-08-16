import { useState, useEffect, useCallback } from "react"
import { StatusBar } from 'expo-status-bar';
import { View, Text, Image, Pressable, ActivityIndicator } from "react-native";
import { global_styles, BLACK, LINKS_COLOR, ORANGE } from "../styles";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useAuth } from "../context/AuthContext";
import AsyncStorage from '@react-native-async-storage/async-storage';

// components
import Input from "../components/Input"
import ButtonComponent from "../components/ButtonComponent";
import Checkbox from "../components/Checkbox";
import RequestMessage from "../components/RequestMessage";

export default function Login(){

    // Context
    const { setUser, setToken, user, token, login, loading, setLoading, authError } = useAuth();

    // Navigation
    const navigation = useNavigation();

    // Login
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [keepAlive, setKeepAlive] = useState(false);

    // Error
    const [error, setError] = useState("");

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

        // Se ele clicar em manter conectado
        if(data.keepAlive){
          await AsyncStorage.setItem('jfa_token', json.data.token);
        }
        
        setError("")

      }catch(err){
        console.log(err)
        setError("Ocorreu um erro ao realizar o login.")
      }finally{
        setLoading(false)
      }

    }

    const Register = () => {
      navigation.navigate('Register');
    }

    useFocusEffect(
      useCallback(() => {
        if (user && token) {
          navigation.navigate('Home');
        }
      }, [user, token, navigation])
    );

    // Exibindo Loading
    if(loading){
        return (
          <View style={global_styles.container}>
            <ActivityIndicator size="large" color={ ORANGE } />
          </View>
        )
    }

  return (
    <View style={global_styles.container}>

      <Image style={{ marginBottom: 34 }} source={require('../assets/img/logo.png')} />

      <Text style={{...global_styles.title, marginBottom: 34 }}>Login</Text>

      <View style={{ marginBottom: 16, width: '100%' }}>
        <Input
          autoFocus={true}
          maskInput={true}
          type="numeric"
          mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]} 
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
        <Checkbox checked={keepAlive} setChecked={setKeepAlive} text="Manter Conectado"/>
      </View>

      {/* error view text node está aqui: */}
      { error && (
        <View style={{ marginBottom: 24, width: '100%'}}>
          <RequestMessage status="error" message={error} />
        </View>
      )}

      { authError && (
        <View style={{ marginBottom: 24, width: '100%'}}>
          <RequestMessage status="error" message={authError} />
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



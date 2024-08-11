import { useState } from "react"
import { StatusBar } from 'expo-status-bar';
import { View, Text, Image } from "react-native";
import { global_styles, BLACK, LINKS_COLOR } from "../styles";

// components
import Input from "../components/Input"
import Button from "../components/Button";
import Checkbox from "../components/Checkbox";

export default function Login(){

    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [keepAlive, setKeepAlive] = useState(false);

    const handleSubmit = async () => {

      const login = {
        phone, 
        password,
        keepAlive
      }

      try{
        const resp = await fetch('http://localhost:4000/login', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(login)
        });
        
        const json = await resp.json();
        console.log(json)
      }catch(err){
        console.log(err)
      }

    }

    const toggleKeepAlive = () => {
      if(keepAlive){
        setKeepAlive(false)
      }else{
        setKeepAlive(true)
      }
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
        <Button text="Entrar" onPress={ handleSubmit }/>
      </View>

      <View style={{ marginBottom: 34 }}>
        <Checkbox onPress={toggleKeepAlive} text="Manter Conectado"/>
      </View>

      <View style={{ marginBottom: 16 }}>
        <Text style={{ color: BLACK }} >Ainda não possui cadastro?</Text>
      </View>

      <View>
        <Text style={{ color: LINKS_COLOR, fontWeight: '700' }} >Cadastre-se</Text>
      </View>
      
      <StatusBar style="auto" />
    </View>
  )
}



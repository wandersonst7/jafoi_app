import { useState } from "react"
import { StatusBar } from 'expo-status-bar';
import { View, Text, Image } from "react-native";
import { global_styles, BLACK, LINKS_COLOR } from "../styles";

// components
import Input from "../components/Input"
import Button from "../components/Button";
import RequestMessage from "../components/RequestMessage";

export default function Register(){

  // Utils
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Register
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {

      const register = {
        name,
        phone, 
        password,
      }

      try{
        const resp = await fetch('http://localhost:4000/register', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(register)
        });
        
        const json = await resp.json();

        if(resp.status !== 201){
          setError(json.error)
        }

        console.log(json)
      }catch(err){
        setError("Ocorreu um erro ao realizar o login.")
      }

    }

  return (
    <View style={global_styles.container}>

      <Image style={{ marginBottom: 64 }} source={require('../assets/img/logo.png')} />

      <Text style={{...global_styles.title, marginBottom: 34}}>Cadastre-se</Text>

      <View style={{ marginBottom: 16, width: '100%'}}>
        <Input
          autoFocus={true} 
          onChange={setName} 
          value={name} 
          placeholder="Seu nome"/>
      </View>

      <View style={{ marginBottom: 16, width: '100%'}}>
        <Input
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
        <Button text="Cadastre-se" onPress={ handleSubmit }/>
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
        <Text style={{ color: LINKS_COLOR, fontWeight: '700' }}>Fazer Login</Text>
      </View>
      
      <StatusBar style="auto" />
    </View>
  )
}



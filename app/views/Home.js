import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

export default function Home() {

  // Context
  const { user, token, logout, setAuthError } = useAuth();

  // Navigation
  const navigation = useNavigation();

  // Get data (test)
  useFocusEffect(
    useCallback(() => {

      (async () => {

        try{
  
          const resp = await fetch('http://10.0.0.183:4000/private', {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${ token }`
            }
          })

          if(resp.status === 401){
            await logout()
            setAuthError("A sessão expirou.")
            navigation.navigate("Login");
            return;
          }
    
          const json = await resp.json();
  
          console.log(json)
  
        }catch(err){
          console.log(err)
        }
  
      })()

    }, [logout, token])
  )

  const Produto = () => {
    navigation.navigate("Produto");
  }

  return (
    <View style={styles.container}>
      <Text>Página Home</Text>
      <Pressable onPress={async () => await logout()}>
        <Text style={{ color: '#00ff00', fontWeight: '700' }}>Logout</Text>
      </Pressable>
      <Pressable onPress={() => Produto()}>
        <Text style={{ color: '#00ff00', fontWeight: '700' }}>Página de produtos</Text>
      </Pressable>
      <StatusBar style="auto" />
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

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';

// Styles
import { global_styles, ORANGE,  } from '../styles';

// Components
import Input from '../components/Input';
import Categories from '../components/Categories';

// Icons
import Feather from '@expo/vector-icons/Feather';


export default function Home() {

  // States
  const [search, setSearch] = useState();

  // Context
  const { user, token, logout, setAuthError } = useAuth();

  // Navigation
  const navigation = useNavigation();

  // Get data (test)
  // useFocusEffect(
  //   useCallback(() => {

  //     (async () => {

  //       try{
  
  //         const resp = await fetch('http://10.0.0.183:4000/private', {
  //           method: "GET",
  //           headers: {
  //             "Authorization": `Bearer ${ token }`
  //           }
  //         })

  //         if(resp.status === 401){
  //           await logout()
  //           setAuthError("A sessão expirou.")
  //           navigation.navigate("Login");
  //           return;
  //         }
    
  //         const json = await resp.json();
  
  //         console.log(json)
  
  //       }catch(err){
  //         console.log(err)
  //       }
  
  //     })()

  //   }, [logout, token])
  // )

  const filterCategory = () => {
    console.log("Filtrando")
  }

  return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollview} showsVerticalScrollIndicator={false}>

        <View style={{ marginBottom: 44, width: '100%'}}>
          <Input
            search={true}
            autoFocus={false} 
            onChange={setSearch} 
            value={search} 
            placeholder="Faça uma busca"/>
        </View>

        <View style={styles.container_topics}>
          <Text style={global_styles.topics_orange}>Categorias</Text>
          <Feather name="arrow-right" size={24} color="#EB7330" />
        </View>

        <ScrollView showsHorizontalScrollIndicator={false} style={{ marginBottom: 44 }} horizontal={true}>
          <Categories name="Roupas" active={true} onPress={filterCategory}/>
          <Categories name="Carro" onPress={filterCategory}/>
          <Categories name="Mesa" onPress={filterCategory}/>
          <Categories name="Banho" onPress={filterCategory}/>
          <Categories name="Futebol" onPress={filterCategory}/>
          <Categories name="Eletronicos" onPress={filterCategory}/>
        </ScrollView>

        <View style={styles.container_topics}>
          <Text style={global_styles.topics_orange}>Ultimos Anúncios</Text>
          <Feather name="arrow-down" size={24} color="#EB7330"/>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 44 }}>
          <Categories name="Roupas" active={true} onPress={filterCategory}/>
          <Categories name="Carro" onPress={filterCategory}/>
          <Categories name="Mesa" onPress={filterCategory}/>
          <Categories name="Banho" onPress={filterCategory}/>
          <Categories name="Futebol" onPress={filterCategory}/>
          <Categories name="Eletronicos" onPress={filterCategory}/>
          <Categories name="Roupas" active={true} onPress={filterCategory}/>
          <Categories name="Carro" onPress={filterCategory}/>
          <Categories name="Mesa" onPress={filterCategory}/>
          <Categories name="Banho" onPress={filterCategory}/>
          <Categories name="Futebol" onPress={filterCategory}/>
          <Categories name="Eletronicos" onPress={filterCategory}/>
          <Categories name="Roupas" active={true} onPress={filterCategory}/>
          <Categories name="Carro" onPress={filterCategory}/>
          <Categories name="Mesa" onPress={filterCategory}/>
          <Categories name="Banho" onPress={filterCategory}/>
          <Categories name="Futebol" onPress={filterCategory}/>
          <Categories name="Eletronicos" onPress={filterCategory}/>
        </ScrollView>
        

        </ScrollView>
        <StatusBar style="auto" />
      </SafeAreaView>
     
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container_topics: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 24, 
    width: '100%'
  },
  scrollview: {
    backgroundColor: '#fff',
    paddingVertical: 24,
    paddingHorizontal: 44,
  },
});

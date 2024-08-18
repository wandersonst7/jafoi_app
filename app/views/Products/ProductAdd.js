import { StyleSheet, Image, Text, View, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { global_styles } from '../../styles';
import { useState, useCallback, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { createProduct } from '../../requests/ProductsRequest';
import { getCategories } from '../../requests/CategoriesRequest';
import * as ImagePicker from 'expo-image-picker';

// Components
import Loading from '../../components/Loading';
import RequestMessage from '../../components/RequestMessage';
import ButtonComponent from '../../components/ButtonComponent';
import Input from '../../components/Input';
import SelectCategory from '../../components/SelectCategory';
import ButtonUpload from '../../components/ButtonUpload';

export default function ProductAdd() {

  // Context
  const { user, token, logout, setAuthError} = useAuth();

  // Ref
  const scrollViewRef = useRef(null);

  // States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState(null);

  // States Product
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState(1);
  const [contact, setContact] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [username, setUsername] = useState("");
  const [category, setCategory] = useState(null);
  const [image, setImage] = useState("");

  // Navigation
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {

      (async () => {

        try{

            setLoading(true)

            const respCategories = await getCategories(token)
            
            if(respCategories.status === 401){
              await logout()
              setAuthError("A sessão expirou.")
              navigation.navigate("Login");
              return;
            }
      
            const jsonCategories = await respCategories.json();
            
            if(jsonCategories.length > 0){
              setCategories(jsonCategories)
            }else{
              setCategories(null)
            }
      
        }catch(err){

        }finally{
          setLoading(false)
        }
  
      })()

      setError("")
      setUsername(user.name)

      return () => setCategory(null); 

    }, [
      logout, 
      token,
      user
    ])
  )

  const saveProduct = async () => {

    if(!title ||
      !price || 
      !description ||
      !location || 
      !contact || 
      !whatsapp ||
      !username ||
      !category ||
      !image ){
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
      }
      setError("É necessário preencher todos os campos.");
      return;
    }

    // Verificar o tamanho da imagem
    // const MAX_IMAGE_SIZE = 150 * 1024;


    // if (image.fileSize > MAX_IMAGE_SIZE) {
    //   if (scrollViewRef.current) {
    //       scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
    //   }
    //   setError("A imagem deve ter no máximo 150KB.");
    //   return;
    // }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('location', location);
    formData.append('contact', contact);
    formData.append('status', status);
    formData.append('whatsapp', whatsapp);
    formData.append('username', username);
    formData.append('categoryId', category._id);
    formData.append('image', {
      name: image.fileName,
      uri: image.uri,
      type: image.mimeType
    });

    try {
      setLoading(true)

      const resp = await createProduct(token, formData);

      if(resp.status === 401){
        await logout()
        setAuthError("A sessão expirou.")
        navigation.navigate("Login");
        return;
      }

      if(resp.status !== 201){
        const json = await resp.json();
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
        }
        setError(json.error)
        return;
      }

      setTitle("")
      setPrice("")
      setDescription("")
      setLocation("")
      setStatus(1)
      setContact("")
      setWhatsapp("")
      setUsername("")
      setCategory(null)
      setImage("")

      navigation.navigate("ProductList", {success: "Produto cadastrado com sucesso."})
    } catch (error) {
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
        }
        setError("Ocorreu um erro.")
    }finally{
      setLoading(false)
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  // Exibindo Loading
  if(loading){
      return <Loading />
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView ref={scrollViewRef} 
      style={styles.scrollview} 
      showsVerticalScrollIndicator={false}>

        <Text style={{...global_styles.title, textAlign: 'center', marginBottom: 24}}>Anunciar Produto</Text>

        { error && (
          <View style={{ marginBottom: 24, width: '100%'}}>
            <RequestMessage status="error" message={error} />
          </View>
        )}

        <View style={{ marginBottom: 24, width: '100%'}}>
            <Input
            autoFocus={true} 
            onChange={setTitle} 
            value={title} 
            placeholder="Titulo"/>
        </View>
        
        <View style={{ marginBottom: 24, width: '100%'}}>
            <Input
            onChange={setDescription} 
            value={description} 
            placeholder="Descrição" 
            multiline={true}
            numberOfLines={5} />
        </View>

        <View style={{ marginBottom: 24, width: '100%'}}>
            <Input
            onChange={setPrice} 
            value={price} 
            placeholder="Preço" 
            type="numeric"/>
        </View>

        <View style={{ marginBottom: 24, width: '100%'}}>
            <Input
            onChange={setLocation} 
            value={location} 
            placeholder="Localização (Cidade/Estado)" />
        </View>

        <View style={{ marginBottom: 24, width: '100%'}}>
          <Input
            maskInput={true}
            type="numeric"
            mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]} 
            onChange={setWhatsapp} 
            value={whatsapp} 
            placeholder="Whatsapp" />
        </View>

        <View style={{ marginBottom: 24, width: '100%'}}>
            <Input
            onChange={setContact} 
            value={contact} 
            placeholder="Outro Contato" />
        </View>

        <View style={{ marginBottom: 24, width: '100%'}}>
          <SelectCategory data={categories} defaultValue={category} setData={setCategory}/>
        </View>

        <View style={{ marginBottom: 24, width: '100%'}}>
            <ButtonUpload text="Imagem" onPress={pickImage} />
        </View>

        {image && 
          <View style={{ marginBottom: 24, width: '100%'}}>
            <Image source={{ uri: image.uri }} style={styles.image}/>
          </View>
        }

        <View style={{ marginBottom: 64, width: '100%'}}>
            <ButtonComponent text="Salvar" onPress={ saveProduct }/>
        </View>
      </ScrollView>
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
    flex: 1,
    backgroundColor: '#fff',
    padding: 44,
  },
  image: {
    width: '100%',
    borderRadius: 16,
    height: 200,
    overflow: 'hidden',
    backgroundColor: 'transparent'
  },
});

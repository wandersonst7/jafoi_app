import { StyleSheet, Image, Text, View, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation, useFocusEffect, useRoute } from '@react-navigation/native';
import { BLACK, global_styles } from '../../styles';
import { useState, useCallback, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getProduct, updateProduct } from '../../requests/ProductsRequest';
import { getCategories } from '../../requests/CategoriesRequest';
import { uploads } from '../../services/api';

// Components
import Loading from '../../components/Loading';
import RequestMessage from '../../components/RequestMessage';
import ButtonComponent from '../../components/ButtonComponent';
import Input from '../../components/Input';
import SelectCategory from '../../components/SelectCategory';

export default function ProductEdit() {

  // Context
  const { user, token, logout, setAuthError} = useAuth();

  // Ref
  const scrollViewRef = useRef(null);

  // States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState(null);
  const [product, setProduct] = useState(null)

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
  const route = useRoute()

  useFocusEffect(
    useCallback(() => {

      (async () => {

        try{

            setLoading(true)

            let jsonProduct;

            if(route.params.id){

              const respProduct = await getProduct(token, route.params.id);
              jsonProduct = await respProduct.json();
    
              if(jsonProduct._id){
                setProduct(jsonProduct)
              }

              setTitle(jsonProduct.title);
              setPrice(jsonProduct.price.toString());
              setDescription(jsonProduct.description);
              setLocation(jsonProduct.location);
              setStatus(jsonProduct.status);
              setContact(jsonProduct.contact);
              setWhatsapp(jsonProduct.whatsapp);
              setImage(jsonProduct.image);

            }

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
              setCategory(jsonCategories.find(category => category._id === jsonProduct.categoryId));
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

    }, [
      logout, 
      token,
      user,
      route.params.id
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

    if(!product._id){
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
      }
      setError("Ocorreu um erro.");
      return;
    }

    const data = {
      title: title,
      price: price,
      description: description,
      location: location,
      contact: contact,
      status: status,
      whatsapp: whatsapp,
      username: username,
      categoryId: category._id
    }

    try {
      setLoading(true)

      const resp = await updateProduct(token, product._id, data);

      if(resp.status === 401){
        await logout()
        setAuthError("A sessão expirou.")
        navigation.navigate("Login");
        return;
      }

      if(resp.status !== 200){
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

      navigation.navigate("ProductUserList", {success: "Produto atualizado com sucesso."})
    } catch (error) {
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
        }
        setError("Ocorreu um erro.")
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
      <ScrollView ref={scrollViewRef} 
      style={styles.scrollview} 
      showsVerticalScrollIndicator={false}>

        <Text style={{...global_styles.title, textAlign: 'center', marginBottom: 24}}>Editar Produto</Text>

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

        {image && image.uri ? (
          <View style={{ marginBottom: 24, width: '100%'}}>
            <Image source={{ uri: image.uri }} style={styles.image}/>
          </View>
        ): (
          <View style={{ marginBottom: 24, width: '100%'}}>
            <Image source={{ uri: `${uploads}/${image}`}} style={styles.image}/>
            <Text style={{ color: BLACK, textAlign: 'center' }} >Não é possível alterar a imagem.</Text>
          </View>
        )}

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

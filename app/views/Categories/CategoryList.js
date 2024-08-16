import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useState, useCallback } from 'react';
import { getCategories } from '../../requests/CategoriesRequest';

// Components
import Loading from '../../components/Loading';

export default function CategoryList() {

    // States
    const [loading, setLoading] = useState();

    // Navigation
    const navigation = useNavigation();

    // Exibindo Loading
    if(loading){
        return <Loading />
    }

  return (
    <View style={styles.container}>
      <Text>Categorias</Text>
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

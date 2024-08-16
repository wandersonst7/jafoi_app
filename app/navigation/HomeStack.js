import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';

// Pages
import Login from '../views/Login';
import Register from '../views/Register';
import Home from '../views/Home';

// Auth Pages
import ProductList from '../views/Products/ProductList'
import ProductDetails from '../views/Products/ProductDetails';

const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {

  const { user, token } = useAuth();

  return (
    <HomeStack.Navigator screenOptions={{
      headerShown: false,
      header: () => null,
      contentStyle: { backgroundColor: 'white' },
    }}>

      {user && token ? (
        <>
          <HomeStack.Screen options={{headerShown: false}} name="Home" component={Home} />
          <HomeStack.Screen options={{headerShown: false}} name="ProductList" component={ProductList} />
          <HomeStack.Screen options={{headerShown: false}} name="ProductDetails" component={ProductDetails} />
        </>
      ): (
        <> 
          <HomeStack.Screen options={{headerShown: false}} name="Login" component={Login} />
          <HomeStack.Screen options={{headerShown: false}} name="Register" component={Register} />
        </>
      )}

    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
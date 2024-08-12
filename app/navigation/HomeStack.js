import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../views/Login';
import Register from '../views/Register';
import Home from '../views/Home';
import { useAuth } from '../context/AuthContext';

const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {

  const { user } = useAuth();

  return (
    
    <HomeStack.Navigator screenOptions={{
      headerShown: false,
      header: () => null,
      contentStyle: { backgroundColor: 'white' },
    }}>

      {user ? (
        <HomeStack.Screen options={{headerShown: false}} name="Home" component={Home} />
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
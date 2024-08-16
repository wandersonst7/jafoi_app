import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Icons
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';

// Context
import { useAuth } from '../context/AuthContext';

// Routes
import HomeStackNavigator from './HomeStack';

// Pages Auth
import AddProduct from '../views/Products/AddProduct'
import UserPage from '../views/UserPage'

const Tab = createBottomTabNavigator();

const TabNavigation = () => {

  const { user, token } = useAuth();

  if(user && token){
    return (
        <Tab.Navigator initialRouteName="Inicio" screenOptions={({ route }) => ({
          // title: '',
          headerTitleAlign: 'center',
          headerTintColor: '#333333',
          // headerShadowVisible: false, 
          tabBarStyle: { 
            backgroundColor: '#EB7330',
            height: 65,
          },
        })}>
          <Tab.Screen name="Inicio"
          component={ HomeStackNavigator }
          options={({ route }) => ({
            tabBarIcon: () => {
              return <Ionicons name="home" size={28} color="#ffffff" />;
            },
            tabBarLabel: () => null,
          })}
          />
          <Tab.Screen name="Anunciar" 
          component={AddProduct} 
          options={({ route }) => ({
            tabBarIcon: () => {
              return <AntDesign name="plussquareo" size={34} color="#ffffff" />
            },
            tabBarLabel: () => null,
          })
          }
          />
          <Tab.Screen name="Conta"
          component={UserPage} 
          options={({ route }) => ({
            tabBarIcon: () => {
              return <Feather name="user" size={28} color="#ffffff" />;
            },
            tabBarLabel: () => null,
          })
          }
          />
        </Tab.Navigator>
    )
  }

    return <HomeStackNavigator />;

};

export default TabNavigation;
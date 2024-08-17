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
import ProductAdd from '../views/Products/ProductAdd'
import UserPage from '../views/UserPage'

const Tab = createBottomTabNavigator();

const TabNavigation = () => {

  const { user, token } = useAuth();

  if(user && token){
    return (
        <Tab.Navigator initialRouteName="Inicio" screenOptions={({ route }) => ({
          title: '',
          headerTitleAlign: 'center',
          headerTintColor: '#333333',
          headerShadowVisible: false, 
          headerStyle: {
            height: 44
          },
          tabBarStyle: {
            backgroundColor: '#ffffff',
            height: 65,
            paddingVertical: 5,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            marginBottom: 5,
          },
        })}>
          <Tab.Screen name="Inicio"
          component={ HomeStackNavigator }
          options={({ route }) => ({
            tabBarIcon: ({ color }) => {
              return <Ionicons name="home" size={28} color={color} />;
            },
            tabBarLabel: "Home",
            tabBarActiveTintColor: '#EB7330',
            tabBarInactiveTintColor: '#777777',
          })}
          />
          <Tab.Screen name="Anunciar" 
          component={ProductAdd} 
          options={({ route }) => ({
            tabBarIcon: ({ color }) => {
              return <AntDesign name="plussquareo" size={28} color={color} />
            },
            tabBarLabel: "Anúncio",
            tabBarActiveTintColor: '#EB7330',
            tabBarInactiveTintColor: '#777777',
          })
          }
          />
          <Tab.Screen name="Conta"
          component={UserPage} 
          options={({ route }) => ({
            tabBarIcon: ({color}) => {
              return <Feather name="user" size={28} color={color} />;
            },
            tabBarLabel: "Conta",
            tabBarActiveTintColor: '#EB7330',
            tabBarInactiveTintColor: '#777777'
          })
          }
          />
        </Tab.Navigator>
    )
  }

    return <HomeStackNavigator />;

};

export default TabNavigation;
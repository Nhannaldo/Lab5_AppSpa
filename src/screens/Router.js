import 'react-native-gesture-handler'
import React,{useEffect} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useMyContextController } from '../context'
import { createStackNavigator } from "@react-navigation/stack";
import { Login } from '../screens/Login';
import { Home } from '../screens/Home';
import { Services } from '../screens/Services';
import { ServiceDetail } from '../screens/ServiceDetail';
import Transaction from '../screens/Transaction';
import  Customer  from '../screens/Customer';
import {Account} from '../screens/Account';
import { Guest } from '../screens/Guest';
import { Book } from '../screens/Book';
import Order from '../screens/Order';
import { AccountGuest } from '../screens/AccountGuest';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { UpdateService } from '../screens/UpdateService';
const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();
export default Router = ({ navigation})=>{
    const [controller, dispatch] = useMyContextController();
    const {userLogin} = controller;
    console.log(userLogin)
    const commonStackOptions = {
      headerRight: () => (
        <View style={{ marginRight: 20 }}>
          <MaterialCommunityIcons name="account-circle" size={30} />
        </View>
      ),
    };
    // bottom tab Admin
    const HomeStack = (route) => {
      return (
        <Tab.Navigator
        initialRouteName="Home"
        activeColor="#e91e63"
        barStyle={{ backgroundColor: 'white',height: "9%",borderWidth: 0.2, borderColor: "gray"}}
      >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="home" color={color} size={26} />
        ),
        
      }}
    />
    <Tab.Screen
      name="Transaction"
      component={Transaction}
      options={{
        tabBarLabel: 'Transaction',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="stack-exchange" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Customer"
      component={Customer}
      options={{
        tabBarLabel: 'Customer',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="account-supervisor-outline" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Account"
      component={Account}
      options={{
        tabBarLabel: 'Account',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="account" color={color} size={26} />
        ),
      }}
      //initialParams={{ email: route.params?.email }}
    />
  </Tab.Navigator>
      )
    };
    // bottom tab Guest
    const GuestStack =()=>{

      return (
        <Tab.Navigator
        initialRouteName="Guest"
        activeColor="#e91e63"
        barStyle={{ backgroundColor: 'white',height: "9%",borderWidth: 0.2, borderColor: "gray"}}
      >
      <Tab.Screen
        name="Guest"
        component={Guest}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="home" color={color} size={26} />
        ),
        
      }}
    />
    <Tab.Screen
      name="Booking"
      component={Book}
      options={{
        tabBarLabel: 'Booking',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="calendar-multiple-check" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Order"
      component={Order}
      options={{
        tabBarLabel: 'Order',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="order-bool-descending-variant" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="AccountGuest"
      component={AccountGuest}
      options={{
        tabBarLabel: 'Account',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="account" color={color} size={26} />
        ),
      }}
      //initialParams={{ email: route.params?.email }}
    />
  </Tab.Navigator>
      )
    }
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} />

            <Stack.Screen 
            name='Admin' 
            component={HomeStack} 
            options={{
              ...commonStackOptions,
              headerTitle: userLogin?userLogin.username: "Home" ,
              
            }}
            
            />

            <Stack.Screen name="Services" component={Services} />
            <Stack.Screen 
            name="ServiceDetail" 
            component={ServiceDetail}
            options={{
              headerRight: () => ( // Pass navigation as a prop to headerRight
          <View style={{ marginRight: 20 }}>
            <MaterialCommunityIcons
              name="dots-vertical"
              size={24}
              style={{ color: 'black', marginRight: 10 }}
              
              
            />
          </View>
        ),
            }}
             />
            <Stack.Screen name='Account' component={Account}/>
            <Stack.Screen name='UpdateService' component={UpdateService}/>
            <Stack.Screen 
            name='CustomerGuest' 
            component={GuestStack} 
            options={{
              ...commonStackOptions,
              headerTitle: userLogin?userLogin.username: "Home" ,
              
            }}
            
            />
        </Stack.Navigator>
    )
}
const styles = StyleSheet.create({
    container:{
        flex: 1
    }
})
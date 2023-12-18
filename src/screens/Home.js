import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { useEffect, useState } from "react";
import {View,Text, StyleSheet, Image, TouchableHighlight, ScrollView, FlatList} from 'react-native'
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import ListService from '../components/ListService';
import firestore from '@react-native-firebase/firestore';
import { useMyContextController } from '../context'
const Tab = createMaterialBottomTabNavigator();

export const Home = ({navigation})=> {
  const [services, setServices] = useState([]);
  //const [username, setUsername] = useState("");
  const [controller, dispatch] = useMyContextController();
  const {userLogin} = controller;
  // const refreshData = async () => {
  //   try {
  //     const servicesCollection = await firestore().collection("SERVICES").get();
  //     const servicesData = servicesCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  //     setServices(servicesData);
  //   } catch (error) {
  //     console.error("Error fetching services:", error);
  //   }
  // };

  // useEffect(() => {
  //   // Initial data fetch
  //   refreshData();
  // }, []);
  useEffect(() => {
    // Set up a listener for real-time updates
    const unsubscribe = firestore().collection("SERVICES").onSnapshot((querySnapshot) => {
      const servicesData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setServices(servicesData);
    });
  
    // Cleanup the listener when the component is unmounted
    return () => unsubscribe();
  }, []);
  // const handleServicePress = (serviceName, price, username, serviceId, refreshData) => {
  //   navigation.navigate('ServiceDetail', { serviceName, price, username, serviceId, refreshData});
  // };
  const handleServicePress = (serviceName, price, username, serviceId, creator, time, finalupdate) => {
    navigation.navigate('ServiceDetail', { serviceName, price, username, serviceId, creator, time, finalupdate});
  };
  return (
    <View style={styles.container}>
        
        <View styles={styles.content}>
            <Image style={styles.img} source={require('../../assets/spa.jpg')}/>
            <Text style={styles.txt}>Danh sách dịch vụ</Text>
            <TouchableHighlight
              style={styles.roundedButton}
              underlayColor="#DDDDDD"
              onPress={() => {
                // Xử lý sự kiện khi nút được nhấn
              }}
            >
              <MaterialCommunityIcons name="plus" size={20} color="white" onPress={()=>navigation.navigate('Services')} />
            </TouchableHighlight>
        </View>
        
        <View>
        <FlatList
            data={services}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
            <ListService name={item.name} price={item.price} onPress={() => handleServicePress(item.name, item.price, userLogin.username, item.id,item.creator,item.time,item.finalupdate)} />
        )}
      />
        </View>
        

    </View>
  );
}

const styles =StyleSheet.create({

    container:{
        flex: 1,
        backgroundColor: "white"
    },
    img:{
      width: "60%",
      height: 150,
      alignSelf: 'center'
    },
    txt:{
      fontWeight: 'bold',
      fontSize: 18,
      color: "black",
      paddingLeft: 20,
    },
    roundedButton: {
      width: 30,
      height: 30,
      borderRadius: 30, // Nửa chiều rộng của button để tạo hình tròn
      backgroundColor: 'red', // Màu nền của button
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5, // Độ nâng của button khi được nhấn
      marginLeft: 330
    },
    
}
)
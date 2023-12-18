import React,{useEffect, useState} from "react";
import { Text, View, StyleSheet, TouchableHighlight } from "react-native";
import { TextInput } from "react-native-paper";
import { useMyContextController } from '../context';
import firestore from '@react-native-firebase/firestore';
export const Services = ({ route, navigation })=>{
    const [serviceName, setServiceName] = useState('');
    const [price, setPrice] = useState();
    const [controller] = useMyContextController();
    const { userLogin } = controller;
    const addServiceToFirestore = async (serviceName, price) => {
        try {
          const servicesCollection = firestore().collection('SERVICES');
          const currentTime = new Date();
          const numericPrice = parseFloat(price);
          await servicesCollection.add({
            name: serviceName,
            price: numericPrice,
            creator: userLogin.username, // Add the creator (username of the logged-in user)
            time: currentTime,
            finalupdate: currentTime,
          });
          alert("Thêm mới thành công!")
            
            // Navigate back to Home.js
            navigation.goBack();
        } catch (error) {
          console.error('Error adding service to Firestore: ', error);
          alert("Thêm mới không thành công!")
        }
      };
    const handleClick = () => {
        addServiceToFirestore(serviceName,price)
    };
    return (
        <View style={styles.container}>
                    <Text style={styles.text}>Service name*</Text>
                    <TextInput
                        style={styles.item}
                        placeholder="Input a service name"
                        autoCapitalize='none' 
                        underlineColorAndroid="transparent"
                        onChangeText={(text) => setServiceName(text)}
                        value={serviceName}
                    >
                    </TextInput>
                    <Text style={styles.text}>Price*</Text>
                    <TextInput
                        style={styles.item}
                        placeholder="0"
                        autoCapitalize='none' 
                        underlineColorAndroid="transparent"
                        onChangeText={(text) => setPrice(text)}
                        value={price}
                    >
                    </TextInput>
                
                <TouchableHighlight
                    style={styles.btn}
                    
                >
                    <Text style={styles.txt} onPress={handleClick}>Add</Text>
                </TouchableHighlight>
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        marginLeft: 20,
        marginTop: 20
      },
    item:{
        width: "95%",
        marginBottom: 17,
        height: 50
    },
    btn:{
        width: "95%",
        backgroundColor: "red",
        borderRadius: 10,
        paddingVertical: 10,
        justifyContent: "center",
        marginTop:15
    },
    txt:{
        textAlign: "center",
        alignItems: "center",
        fontWeight: "bold",
        fontSize: 15,
        color: "white"
    },
    text:{
        fontWeight: "bold",
        color: "black",
        textAlign: "left",
      },
});
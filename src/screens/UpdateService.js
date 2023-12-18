import React,{useEffect, useState} from "react";
import { Text, View, StyleSheet, TouchableHighlight } from "react-native";
import { TextInput } from "react-native-paper";
import firestore from '@react-native-firebase/firestore';
export const UpdateService = ({ route, navigation })=>{
    const{serviceName, price, serviceId} = route.params;
    const [updatedServiceName, setUpdatedServiceName] = useState(serviceName);
    const [updatedPrice, setUpdatedPrice] = useState(price);
    const UpdateServiceToFirestore = async (updatedServiceName, updatedPrice) => {
        try {
          const servicesCollection = firestore().collection('SERVICES');
          const serviceDoc = servicesCollection.doc(serviceId);
            const currentTime = new Date();
          await serviceDoc.update({
            name: updatedServiceName,
            price: updatedPrice,
            finalupdate: currentTime
          });
    
          alert("Update thành công!");
          // Invoke the refreshData callback passed from Home.js

          navigation.replace("Tab");
        } catch (error) {
          console.error('Error updating service in Firestore: ', error);
          alert("Update không thành công!");
        }
      };
    const handleClick = () => {
        UpdateServiceToFirestore(updatedServiceName,updatedPrice)
    };
    return (
        <View style={styles.container}>
                    <Text style={styles.text}>Service name*</Text>
                    <TextInput
                        style={styles.item}
                        autoCapitalize='none' 
                        underlineColorAndroid="transparent"
                        onChangeText={(text)=>setUpdatedServiceName(text)}
                        value={updatedServiceName}
                    >
                    </TextInput>
                    <Text style={styles.text}>Price*</Text>
                    <TextInput
                        style={styles.item}
                        autoCapitalize='none' 
                        underlineColorAndroid="transparent"
                        onChangeText={(text) => setUpdatedPrice(text)}
                        value={updatedPrice}
                    >
                    </TextInput>
                
                <TouchableHighlight
                    style={styles.btn}
                    
                >
                    <Text style={styles.txt} onPress={handleClick}>Update</Text>
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
        backgroundColor: "#FF4500",
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
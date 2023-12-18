import React,{useEffect, useState} from "react";
import { Text, View, StyleSheet, TouchableHighlight, Alert } from "react-native";
import firestore from '@react-native-firebase/firestore';
export const ServiceDetail = ({route, navigation})=>{
    const {item, username} = route.params;
    const handleUpdate = () => {
      // Add your logic for updating the service here
      navigation.navigate("UpdateService",{item});
    };
    const handleDelete = () => {
      // Show a confirmation dialog before deleting
      Alert.alert(
        "Xác nhận xóa",
        `Bạn có chắc muốn xóa dịch vụ "${item.name}"?`,
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Delete",
            onPress: async () => {
              try {
                // Delete the service document from Firestore
                await firestore().collection("SERVICES").doc(item.id).delete();
                console.log("Service deleted successfully");
                // Navigate back to the home screen or any other desired screen
                navigation.navigate("Admin");
              } catch (error) {
                console.error("Error deleting service:", error);
              }
            },
          },
        ],
        { cancelable: false }
      );
    };
    return (
        <View style={styles.container}>
          <View>
            <Text style={styles.text}>Service name: {item.name}</Text>
                    <Text style={styles.text}>Price: {item.price.toLocaleString("vi-VN")}đ</Text>
                    <Text style={styles.text}>Creator: {item.creator}</Text>
                    <Text style={styles.text}>Time:{item.time.toDate().toLocaleString()}</Text>
                    <Text style={styles.text}>Final update:{item.finalupdate.toDate().toLocaleString()}</Text>
          </View>
          <View style={styles.buttonContainer}>
              <TouchableHighlight
                  style={[styles.button, styles.updateButton]}
                  onPress={handleUpdate}
              >
                <Text style={styles.buttonText}>Update</Text>
              </TouchableHighlight>
              <TouchableHighlight
                  style={[styles.button, styles.deleteButton]}
                  onPress={handleDelete}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableHighlight>
          </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: "white"
      },
    text:{
        fontWeight: "bold",
        color: "black",
        marginLeft: 15,
        marginTop: 15
      },
      buttonContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 20,
      },
      button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: "center",
        margin: 20
      },
      updateButton: {
        backgroundColor: "#FF4500",
      },
      deleteButton: {
        backgroundColor: "red",
      },
      buttonText: {
        color: "white",
        fontWeight: "bold",
      },
});
import React from "react";
import {View, StyleSheet,Text,TouchableOpacity} from 'react-native'

function ListService({name, price, onPress}) {
    return ( 
        <TouchableOpacity style={styles.btn} onPress={onPress}>
            <Text style={styles.txtName}>{name}</Text>
            <Text style={styles.txtPrice}>{price.toLocaleString("vi-VN")}đ</Text>
        </TouchableOpacity>
     );
}
const styles = StyleSheet.create({
    btn:{
        height:50,
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems: 'center',
        marginTop:13,
        borderRadius:10,
        borderWidth:1,
        borderColor:'#ccc',
        marginLeft:20,
        marginRight:20
    },
    txtPrice:{
        fontSize:14,
        color:'black',
        marginRight:10
    },
    txtName:{
        fontSize:14,
        color:'black',
        marginLeft:10,
        fontWeight: 'bold',
    }
})

export default ListService;
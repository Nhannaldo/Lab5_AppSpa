import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useMyContextController } from '../context';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [controller, dispatch] = useMyContextController();
  const { documentId } = controller;

  useEffect(() => {
    
        const ordersCollection = firestore().collection('Booking').doc(documentId)
                    .onSnapshot((snapshot)=>{
                        if(snapshot.exists){
                            const ordersData = snapshot.data();
                            setOrders(ordersData);
                        }
                        else{
                            console.log('No such document!');
                        }
                        
                    });
                return () => ordersCollection();
  }, [documentId]);
  const OrderArray = Object.keys(orders).map(key => ({ orderId: key, ...orders[key] }));
  
  const handleCancelOrder = (orderId) => {
    try {
        const orderRef = firestore().collection('Booking').doc(documentId);
        orderRef.update({
            [orderId]: firestore.FieldValue.delete(),
          });
      Alert.alert('Hủy đơn thành công', 'Đơn đặt lịch đã được hủy thành công.');
    } catch (error) {
      console.error('Error canceling order:', error);
      Alert.alert('Lỗi hủy đơn', 'Có lỗi xảy ra khi hủy đơn đặt lịch. Vui lòng thử lại.');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.orderItem}>
      <View style={styles.orderDetails}>
        <Text>{`Dịch vụ: ${item.ServiceName}`}</Text>
        <Text>{`Ngày đặt: ${item.SetDate}`}</Text>
        <Text>{`Giờ: ${item.SetTime}`}</Text>
        <Text>{`Địa chỉ Spa: ${item.AddressSpa}`}</Text>
        
      </View>
      <TouchableOpacity style={styles.cancelButton} onPress={() => handleCancelOrder(item.orderId)}>
        <Text style={styles.cancelButtonText}>Hủy đơn</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Đơn đặt lịch</Text>
      <FlatList
        data={OrderArray}
        keyExtractor={(item) => item.orderId}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'grey',
    paddingVertical: 10,
    paddingHorizontal:10,
    borderRadius:5,
    marginBottom:10
  },
  orderDetails: {
    flex: 1,
  },
  cancelButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center', // căn chỉnh nội dung theo chiều dọc
    justifyContent: 'center', // căn chỉnh nội dung theo chiều ngang
    alignSelf: 'center', // đặt button về bên trái
  },
  cancelButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default Order;

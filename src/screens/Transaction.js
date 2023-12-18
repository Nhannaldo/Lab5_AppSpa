import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useMyContextController } from '../context';
const Transaction = () => {
  const [orders, setOrders] = useState([]);
  const [controller, dispatch] = useMyContextController();
  const { documentId } = controller;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersCollection = await firestore().collection('Booking').get();
        const ordersData = ordersCollection.docs.map(doc => {
          const data = doc.data();
          const services = Object.keys(data).map(serviceId => ({
            serviceId,
            ...data[serviceId]
          }));
          return {
            id: doc.id,
            services
          };
        });
        setOrders(ordersData);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
  
    fetchOrders();
  }, [documentId]);
  
  const handleCancelOrder = async (orderId) => {
    // try {
    //   const orderRef = firestore().collection('Booking').doc(documentId);
  
    //   // Tạo một đối tượng để biểu diễn trường bạn muốn xóa
    //   const fieldToDelete = {};
    //   fieldToDelete[orderId] = firestore.FieldValue.delete();
  
    //   // Cập nhật tài liệu bằng đối tượng này
    //   await orderRef.update(fieldToDelete);
  
    //   Alert.alert('Hủy đơn thành công', 'Đơn đặt lịch đã được hủy thành công.');
    // } catch (error) {
    //   console.error('Lỗi khi hủy đơn:', error);
    //   Alert.alert('Lỗi hủy đơn', 'Có lỗi xảy ra khi hủy đơn đặt lịch. Vui lòng thử lại.');
    // }
  };

  const renderItem = ({ item }) => (
    <>
      {item.services.map(service => (
        <View key={service.serviceId} style={styles.serviceItem}>
          <View style={styles.orderDetails}>
            <Text>{`Dịch vụ: ${service.ServiceName}`}</Text>
            <Text>{`Ngày hẹn: ${service.SetDate}`}</Text>
            <Text>{`Giờ: ${service.SetTime}`}</Text>
            <Text>{`Địa chỉ Spa: ${service.AddressSpa}`}</Text>
            <Text style={{fontWeight:'bold'}}>Khách hàng đặt:<Text style={{fontWeight:'bold', color:'black', fontSize:15}}> {service.Customer}</Text></Text>
          </View>
          <TouchableOpacity style={styles.cancelButton} onPress={() => handleCancelOrder(service.serviceId)}>
            <Text style={styles.cancelButtonText}>Hủy lịch</Text>
          </TouchableOpacity>
        </View>
      ))}
    </>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Quản lý đặt lịch</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
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
  serviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'grey',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 10,
  }
});

export default Transaction;

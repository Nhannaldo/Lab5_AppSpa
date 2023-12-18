import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const Customer = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = await firestore().collection('USER').get();
        const usersData = usersCollection.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.userItem}>
      {/* Hiển thị ảnh */}
      <Image
        source={require('../../assets/avatar.png')}  // Thay thế 'URL_HINH_ANH' bằng URL hình ảnh thực tế hoặc sử dụng item.avatar nếu có trường avatar trong dữ liệu người dùng
        style={styles.avatar}
      />
      {/* Hiển thị thông tin người dùng */}
      <View style={styles.userDetails}>
  <Text>
    <Text style={styles.boldText}>Email:</Text> {item.Email}
  </Text>
  <Text>
    <Text style={styles.boldText}>Role:</Text> {item.Role}
  </Text>
  <Text>
    <Text style={styles.boldText}>SDT:</Text> {item.SDT}
  </Text>
  <Text>
    <Text style={styles.boldText}>Username:</Text> {item.username}
  </Text>
</View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Danh sách khách hàng</Text>
      <FlatList
        data={users}
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
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',  // Canh giữa theo chiều dọc
    borderWidth: 1,
    borderColor: 'grey',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 25,  // Hình tròn
    marginRight: 10,
  },
  userDetails: {
    flex: 1,
  },
  boldText: {
    fontWeight: 'bold',
    color:'black'
  },
});

export default Customer;

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ScrollView } from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import DatePicker from 'react-native-date-picker'
import { format } from 'date-fns';
import { useMyContextController } from '../context'
export const Book = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [openTimePicker, setOpenTimePicker] = useState(false);
  const [SpaAddress, setSpaAddress] = useState('TDMU, Thủ Dầu Một, Bình Dương');
  const [selectedServicePrice, setSelectedServicePrice] = useState(0);
  const [selectedServiceName, setSelectedServiceName] = useState('');

  const [controller, dispatch] = useMyContextController();
  const { userLogin,  documentId } = controller;
  // console.log('Service Name:', selectedServiceName);
  // console.log('Service Price:', selectedServicePrice);
  // console.log('Selected Service:', selectedService);
  // console.log('Selected Date:', format(selectedDate, 'dd/MM/yyyy'));
  // console.log('Selected Time:', format(selectedTime, 'HH:mm:ss'));
  useEffect(() => {
    // Fetch services from Firestore
    const fetchServices = async () => {
      try {
        const servicesRef = firestore().collection('SERVICES');
        const snapshot = await servicesRef.get();

        const servicesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setServices(servicesData);
        if (servicesData.length > 0) {
          setSelectedService(servicesData[0].id); // Set the default selected service
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);
  // lấy tên và giá
  useEffect(() => {
    const selectedServiceObject = services.find(service => service.id === selectedService);
    if (selectedServiceObject) {
      setSelectedServiceName(selectedServiceObject.name);
      setSelectedServicePrice(selectedServiceObject.price);
    }
  }, [selectedService, services]);
  const handleBookAppointment = async () => {
    try {
      const newDocumentId = documentId;
      const bookingRef = firestore().collection("Booking").doc(newDocumentId);
      // Kiểm tra xem tài liệu có tồn tại hay không
      const bookingSnapshot = await bookingRef.get();
  
      // Nếu tài liệu tồn tại, cập nhật thông tin
      if (bookingSnapshot.exists) {
        await bookingRef.update({
          [selectedService]: {
            ServiceName: selectedServiceName,
            ServicePrice: selectedServicePrice,
            SetDate: format(selectedDate, 'dd/MM/yyyy'),
            SetTime: format(selectedTime, 'HH:mm:ss'),
            Customer: userLogin.username,
            AddressSpa: SpaAddress,
          }
        });
      } else {
        // Nếu tài liệu không tồn tại, thêm tài liệu mới với ID là newDocumentId
        await bookingRef.set({
          [selectedService]: {
            ServiceName: selectedServiceName,
            ServicePrice: selectedServicePrice,
            SetDate: format(selectedDate, 'dd/MM/yyyy'),
            SetTime: format(selectedTime, 'HH:mm:ss'),
            Customer: userLogin.username,
            AddressSpa: SpaAddress,
          }
        });
      }
  
      Alert.alert('Đặt lịch thành công', 'Đặt lịch của bạn đã được thực hiện thành công.');
    } catch (error) {
      console.error('Lỗi khi thêm đặt lịch:', error);
      Alert.alert('Lỗi đặt lịch', 'Có lỗi xảy ra khi xử lý đặt lịch của bạn. Vui lòng thử lại.');
    }
  };
  

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Đặt lịch Spa</Text>

      {/* Service Picker */}
      <Text>Chọn dịch vụ:</Text>
      <Picker
        style={{ borderWidth: 1, borderColor: 'grey' }}
        selectedValue={selectedService}
        onValueChange={(itemValue) => setSelectedService(itemValue)}
      >
        {services.map((service) => (
          <Picker.Item key={service.id} label={service.name} value={service.id} />
        ))}
      </Picker>

      {/* Date Input */}
      <Text style={{marginBottom:10}}>Chọn ngày: <Text style={{fontWeight:'bold', color:'black'}}>{format(selectedDate, 'dd/MM/yyyy')}</Text></Text>
      <Button title="Bấm chọn ngày" onPress={() => setOpenDatePicker(true)} />
      <DatePicker
        modal
        mode='date'
        open={openDatePicker}
        date={selectedDate}
        onConfirm={(date) => {
          setOpenDatePicker(false);
          setSelectedDate(date);
        }}
        onCancel={() => setOpenDatePicker(false)}
      />

      {/* Time Input */}
      <Text style={{marginBottom:10, marginTop:10}}>Chọn giờ: <Text style={{fontWeight:'bold', color:'black'}}>{format(selectedTime, 'HH:mm:ss')}</Text></Text>
      <Button title="Bấm chọn giờ" onPress={() => setOpenTimePicker(true)} />
      <DatePicker
        modal
        mode='time'
        open={openTimePicker}
        date={selectedTime}
        onConfirm={(time) => {
          setOpenTimePicker(false);
          setSelectedTime(time);
        }}
        onCancel={() => setOpenTimePicker(false)}
      />
      
      {/* Customer Name Input */}
      <Text style={{marginBottom:10, marginTop:10}}>Khách hàng:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={userLogin.username}
      />

      {/* Customer Address Input */}
      <Text style={{marginBottom:10}}>Địa chỉ Spa:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your address"
        value={SpaAddress}
      />

      {/* Book Appointment Button */}
      <Button title="Đặt lịch" onPress={handleBookAppointment} color="#800080" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    height: 40,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});
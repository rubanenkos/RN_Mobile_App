import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';
import styles from '../styles';

const RequestScreen = () => {
  const [checkinDate, setCheckinDate] = useState('');
  const [bookingId, setBookingId] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleRequest = async () => {
    if (!checkinDate) {
      Alert.alert('Ошибка', 'Введите дату заезда');
      return;
    }

    const data = {
      firstname: 'Иван',
      lastname: 'Иванов',
      totalprice: 1,
      depositpaid: true,
      bookingdates: {
        checkin: checkinDate,
        checkout: checkinDate,
      },
      additionalneeds: 'Breakfast',
    };

    try {
      const response = await axios.post('https://restful-booker.herokuapp.com/booking', data, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
    setBookingId(response.data.bookingid);
    setIsSubmitted(true);
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
      } else if (error.request) {
        console.error('Error request:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
      console.error('Error config:', error.config);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Отправить запрос</Text>
      <TextInput
        style={styles.input}
        placeholder="Введите дату заезда (YYYY-MM-DD)"
        value={checkinDate}
        onChangeText={setCheckinDate}
      />
      <Button title="Отправить запрос" onPress={handleRequest} />
      {isSubmitted && bookingId && (
        <Text style={styles.responseText}>Спасибо! Ваша заявка принята №{bookingId}</Text>
      )}
    </View>
  );
};

export default RequestScreen;

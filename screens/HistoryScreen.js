import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, ActivityIndicator } from 'react-native';
import styles from '../styles';

const HistoryScreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://restful-booker.herokuapp.com/booking?checkin=2025-01-01&checkout=2025-05-01')
      .then(response => response.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const renderItem = ({ item, index }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{data.length - index}. bookingid: {item.bookingid}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList data={data} renderItem={renderItem} keyExtractor={item => item.bookingid.toString()} />
      )}
    </View>
  );
};

export default HistoryScreen;

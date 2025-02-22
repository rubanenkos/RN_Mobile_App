import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, ActivityIndicator } from 'react-native';
import styles from '../styles';

const HistoryScreen = ({ refresh, isActive }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!isActive) return;
      
      console.log('Fetching data for History tab');
      setLoading(true);
      try {
        const response = await fetch('https://restful-booker.herokuapp.com/booking?checkin=2024-01-01&checkout=2025-12-31');
        const json = await response.json();
        console.log('Data fetched successfully');
        setData(json);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [refresh, isActive]);

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
        <FlatList 
          data={data} 
          renderItem={renderItem} 
          keyExtractor={item => item.bookingid.toString()}
        />
      )}
    </View>
  );
};

export default HistoryScreen;
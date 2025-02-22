import React from 'react';
import { View, Image } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import styles from '../styles';
import UserCard from '../components/UserCard';

const HomeScreen = () => (
  <View style={styles.container}>
    <UserCard />
  </View>
);

export default HomeScreen;

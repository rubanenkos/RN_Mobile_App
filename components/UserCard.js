import React from 'react';
import { Image } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import styles from '../styles';

const userData = {
  name: 'Matt Damon',
  birthYear: 1970,
};

const UserCard = () => (
  <Card style={styles.card}>
    <Card.Content>
      <Image source={require('../assets/mat_photo.png')} style={styles.profileImage} />
      <Title>ФИО: {userData.name}</Title>
      <Paragraph>Год рождения: {userData.birthYear}</Paragraph>
    </Card.Content>
  </Card>
);

export default UserCard;

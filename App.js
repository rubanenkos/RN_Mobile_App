import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Image, TextInput, Button, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Card, Title, Paragraph } from 'react-native-paper';
import axios from 'axios';

// Данные пользователя
const userData = {
  name: 'Matt Damon',
  birthYear: 1970,
};

// Главный экран с карточкой пользователя
const HomeScreen = () => (
  <View style={styles.container}>
    <Card style={styles.card}>
      <Card.Content>
        {/* Фото пользователя */}
        <Image source={require('./assets/mat_photo.png')} style={styles.profileImage} />
        <Title>ФИО: {userData.name}</Title>
        <Paragraph>Год рождения: {userData.birthYear}</Paragraph>
      </Card.Content>
    </Card>
  </View>
);

// Экран "Отправить запрос"
const RequestScreen = () => {
  const [checkinDate, setCheckinDate] = useState('');
  const [bookingId, setBookingId] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleRequest = async () => {
    const checkoutDate = checkinDate; // Пока что checkout совпадает с checkin

    const data = {
      firstname: 'Иван',
      lastname: 'Иванов',
      totalprice: 1,
      depositpaid: true,
      bookingdates: {
        checkin: checkinDate, // Дата из поля
        checkout: checkoutDate, // Дата выезда
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
      console.error('Error sending request:', error);
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

// Экран "История запросов"
const HistoryScreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Функция для получения данных с API
    fetch('https://restful-booker.herokuapp.com/booking?checkin=2025-01-01&checkout=2025-05-01')
      .then(response => response.json())
      .then(json => {
        setData(json);  // Сохраняем данные в состоянии
        setLoading(false); // Завершаем загрузку
      })
      .catch(error => {
        console.error(error);
        setLoading(false); // Завершаем загрузку в случае ошибки
      });
  }, []);

  // Функция для рендеринга каждого элемента списка
  const renderItem = ({ item, index }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{data.length - index}. bookingid: {item.bookingid}</Text>
    </View>
  );

  // Если данные еще загружаются, показываем индикатор загрузки
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.bookingid.toString()}
      />
    </View>
  );
};

// Карта экранов
const renderScene = SceneMap({
  home: HomeScreen,
  request: RequestScreen,
  history: HistoryScreen,
});

export default function App() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'home', title: 'Главная' },
    { key: 'request', title: 'Отправить запрос' },
    { key: 'history', title: 'История запросов' },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: Dimensions.get('window').width }}
      renderTabBar={props => (
        <TabBar
          {...props}
          indicatorStyle={{ backgroundColor: 'blue' }} // Индикатор активности
          style={styles.tabBar} // Фон для табов
          labelStyle={styles.label} // Стиль текста
          tabStyle={styles.tabStyle} // Отступ снизу для текста
          activeColor="#000" // Цвет текста для активных вкладок
          inactiveColor="#000" // Цвет текста для неактивных вкладок
        />
      )}
    />
  );
}

// Стили
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  card: {
    width: '90%',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 4, // Тень для Android
    shadowColor: '#000', // Тень для iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  profileImage: {
    width: 100, // Ширина картинки
    height: 100, // Высота картинки
    borderRadius: 50, // Округленные углы
    marginBottom: 10, // Отступ снизу
    alignSelf: 'center', // Центрируем изображение
  },
  tabBar: {
    backgroundColor: 'white', // Цвет фона для табов
    paddingTop: 20, // Добавляем отступ сверху, чтобы табы не перекрывались статусной строкой
  },
  label: {
    fontSize: 16,  // Размер шрифта для текста в табах
    color: '#000', // Цвет текста (черный)
  },
  tabStyle: {
    paddingBottom: 10, // Отступ снизу для текста
  },
  item: {
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemText: {
    fontSize: 18,
    color: '#333',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 20,
  },
  responseText: {
    marginTop: 20,
    fontSize: 18,
    color: '#28a745',
  },
});

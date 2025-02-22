import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import HomeScreen from './screens/HomeScreen';
import RequestScreen from './screens/RequestScreen';
import HistoryScreen from './screens/HistoryScreen';
import styles from './styles';

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
          indicatorStyle={{ backgroundColor: 'blue' }}
          style={styles.tabBar}
          labelStyle={styles.label}
          tabStyle={styles.tabStyle}
          activeColor="#000"
          inactiveColor="#000"
        />
      )}
    />
  );
}

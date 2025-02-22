import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import RequestScreen from './screens/RequestScreen';
import HistoryScreen from './screens/HistoryScreen';
import styles from './styles';

export default function App() {
  const [index, setIndex] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isHistoryActive, setIsHistoryActive] = useState(false);
  const [routes] = useState([
    { key: 'home', title: 'Главная' },
    { key: 'request', title: 'Отправить запрос' },
    { key: 'history', title: 'История запросов' },
  ]);

  const HistoryWrapper = () => {
    return <HistoryScreen refresh={refreshKey} isActive={isHistoryActive} />;
  };

  const renderScene = SceneMap({
    home: HomeScreen,
    request: RequestScreen,
    history: HistoryWrapper
  });

  const handleTabPress = (route, jumpTo) => {
    console.log('Tab pressed:', route.title);
    jumpTo(route.key);
    
    if (route.key === 'history') {
      setIsHistoryActive(true);
      setRefreshKey(prev => prev + 1);
    } else {
      setIsHistoryActive(false);
    }
  };

  return (
    <NavigationContainer>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get('window').width }}
        renderTabBar={props => (
          <TabBar
            {...props}
            onTabPress={({ route }) => handleTabPress(route, props.jumpTo)}
            indicatorStyle={{ backgroundColor: 'blue' }}
            style={styles.tabBar}
            labelStyle={styles.label}
            tabStyle={styles.tabStyle}
            activeColor="#000"
            inactiveColor="#000"
          />
        )}
      />
    </NavigationContainer>
  );
}
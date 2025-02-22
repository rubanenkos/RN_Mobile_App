import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    alignSelf: 'center',
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
  input: {
    width: '80%',
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 20,
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
  
  responseText: {
    marginTop: 20,
    fontSize: 18,
    color: '#28a745',
  },
});

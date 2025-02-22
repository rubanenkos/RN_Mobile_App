// apiRequest.js
const axios = require('axios');

const data = {
  firstname: 'Иван',
  lastname: 'Иванов',
  totalprice: 1,
  depositpaid: true,
  bookingdates: {
    checkin: '2025-02-01', // Дата из поля
    checkout: '2025-02-02', // Дата выезда
  },
  additionalneeds: 'Breakfast',
};

const sendRequest = () => {
  axios.post('https://restful-booker.herokuapp.com/booking', data, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  })
  .then(response => {
    console.log('Response:', response.data);
  })
  .catch(error => {
    console.error('Error:', error.response ? error.response.data : error.message);
  });
};

sendRequest(); // Выполняем запрос сразу

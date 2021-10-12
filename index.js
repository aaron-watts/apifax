if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const path = require('path');

const axios = require('axios');
const { getWeather, getNews } = require('./api');
const pageTemplates = require('./pages');

const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/', (req, res) => {
  res.redirect('/index.html');
});

app.get('/pages', (req, res) => {
  res.send(pageTemplates);
});

app.get('/data', async (req, res) => {
  // create an api object
  const apiData = {};

  Promise.all([getNews(), getWeather()])
    .then(function (results) {
      apiData.news = results[0];
      apiData.weather = results[1];

      res.send(apiData);
    })
    .catch(() => {
      res.send({
        news: ['none found'],
        weather: ['none found']
      })
    });
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
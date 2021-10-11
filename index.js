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

/*
Performing multiple concurrent requests

function getUserAccount() {
  return axios.get('/user/12345');
}

function getUserPermissions() {
  return axios.get('/user/12345/permissions');
}

Promise.all([getUserAccount(), getUserPermissions()])
  .then(function (results) {
    const acct = results[0];
    const perm = results[1];
  });
*/

app.get('/data', async (req, res) => {
    // create an api object
    const apiData = {};
    
    apiData.weather = await getWeather();
    apiData.news = await getNews();
  
    res.send(apiData);

    // axios.get(newsURL)
    //     .then(response => {
    //         apiData.news = response.data.articles;
    //         res.send(apiData);
    //     })
    //     .catch(err => res.send({ done: 'ERROR' }));

    
})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const path = require('path');

const axios = require('axios');
const api = require('./utils/api_utils');
const db = require('./utils/db_utils');
const pageTemplates = require('./pages');

const PORT = 3000;

// init database
db.setupDatabase();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/', (req, res) => {
  res.redirect('/index.html');
});

app.get('/pages', (req, res) => {
  res.send(pageTemplates);
});

// We now need to include a data in here if it hasn't been done yet
app.get('/data', db.checkLog, async (req, res) => {
  res.send(req.apiData);
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
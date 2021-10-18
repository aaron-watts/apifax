if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const path = require('path');

const db = require('./utils/db_utils');

const { pageTemplates } = require('./pages');

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

app.get('/data', db.checkLog, db.collectData, async (req, res) => {
  res.send(req.apiData);
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
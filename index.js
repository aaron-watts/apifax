if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const path = require('path');

const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

const axios = require('axios');
const api = require('./api');
const pageTemplates = require('./pages');

const PORT = 3000;
const dbFile = './apidata.db';

const dbPromise = open({
  filename: dbFile,
  driver: sqlite3.Database
});
const setupDatabase = async () => {
  const db = await dbPromise;
  await db.migrate();

  const log = await db.all('SELECT * FROM log;');
  console.log(log);
  if (!log.length) {
    console.log("No previous log found..Writing base value of 0 to TABLE:'log'");
    await db.run('INSERT INTO log (lastCall) VALUES (?);', 0);
  }
}
setupDatabase();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// helper to insert data in to db
const formatInsertMany = (arr, table) => {
  const tables = ['news', 'weather'];
  const keys = Object.keys(arr[0])
  const values = [];
        arr.forEach(i => {
          for (let key of keys) {
            values.push(i[key]);
          }
        })
        const placeholders = arr.map(i => `(${keys.map(key => '?').join(' , ')})`).join(',');

        return [`INSERT INTO ${tables[table]} (${keys.map(key => key).join(' ,')}) VALUES ${placeholders};`, values];
        // await db.run(`INSERT INTO weather (city, temp, description) VALUES ${placeholders};`, values);
};

const getAll = async (table) => {
  const db = await dbPromise;
  return await db.all(`SELECT * FROM ${table};`)
};

// a middleware to check if api requests need to be made
const checkLog = async (req, res, next) => {
  const db = await dbPromise;
  const log = await db.all('SELECT * FROM log;');
  const now = new Date().getTime();

  // if last data collection was over an hour ago, then do a new one
  if (now - log[0].lastCall * 1000 > 1000 * 60 * 60) {
  // if (now - log[0].lastCall * 1000 > 1000) { // one second (debug)
    // Check if tables in database are populated
    Promise.all([getAll('news'), getAll('weather')])
      .then((results) => {
        if (!results[0].length) {
          Promise.all([api.getNews(), api.getWeather()])
            .then(async function (results) {
              // this should only be used in event of empty tables!
              results.forEach(async(i, index) => {
                const query = formatInsertMany(i, index);
                await db.run(query[0], query[1]);
              })
            })
            .catch((err) => {
              console.log(err.message);
            });
        } else {
          // update tables
        }
      })
      .catch(err => {
        console.log(err.message);
      })

    // make the api requests
    // Promise.all([getNews(), getWeather()])
    //   .then(async function (results) {



    //     // this should only be used in event of empty tables!
    //     // results.forEach(async(i, index) => {
    //     //   const query = formatInsertMany(i, index);
    //     //   await db.run(query[0], query[1]);
    //     // })

    //   })
    //   .catch((err) => {
    //     console.log(err.message);
    //   });

    // update log
    const sql = `UPDATE log
                SET lastCall = ?
                WHERE id = ? ;`;
    const see = await db.run(sql, [now / 1000, 1], () => {
      console.log(this.changes);
    });
  }

  return next();
}

app.get('/', (req, res) => {
  res.redirect('/index.html');
});

app.get('/pages', (req, res) => {
  res.send(pageTemplates);
});

// We now need to include a data in here if it hasn't been done yet
app.get('/data', checkLog, async (req, res) => {
  // res.send('DENIED!');

  // // create an api object
  // const apiData = {};

  Promise.all([getAll('news'), getAll('weather')])
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
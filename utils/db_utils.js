/*
DATABASE UTILITIES

Module Exports:
    setupDatabase/fn            Handles sql migration and sets a base 
                                value of zero in log table
    collectData/fn (middleware) Collects all data from database
    checkLog/fn (middleware)    Checks log timestamp and calls api request
                                if +1 hour has passed 

Helpers:
    dbPromise/Promise           Returns connection to SQLite database
    updateLog/fn                Takes unix time as param, updates the log record
                                in SQL database
    formatInsertMany/fn         Takes apiData and table name as parameters
                                and returns SQL syntax for insertmany query
    formatUpdate/fn             Takes apidata, table name and index/id as params
                                Returns an update query per row
    getAll/fn                   Takes table name as param and returns select
                                all query result
*/

const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

const api = require('./api_utils');

const dbFile = './apidata.db';
const tables = [
    'news',
    'weather'
];

const dbPromise = open({
    filename: dbFile,
    driver: sqlite3.Database
});

module.exports.setupDatabase = async () => {
    const db = await dbPromise;
    await db.migrate();

    // Check for an existing log, add a base value of ZERO if none found
    // ZERO allows first api data collection to execute, log is then updated
    // to current time
    const log = await db.all('SELECT * FROM log;');
    if (!log.length) {
        console.log("No previous log found..Writing base value of 0 to TABLE:'log'");
        await db.run('INSERT INTO log (lastCall) VALUES (?);', 0);
    }
}

const updateLog = async (timestamp) => {
    const db = await dbPromise;
    const sql = `UPDATE log SET lastCall = ? WHERE id = ? ;`;
    await db.run(sql, [timestamp, 1]);
}

// helper to insert data in to db
const formatInsertMany = (arr, table) => {
    const keys = Object.keys(arr[0]);
    const values = [];

    arr.forEach(i => {
        for (let key of keys) {
            values.push(i[key]);
        }
    })

    const placeholders = arr.map(i => `(${keys.map(key => '?').join(' , ')})`).join(',');

    return [`INSERT INTO ${tables[table]} (${keys.map(key => key).join(' ,')}) 
            VALUES ${placeholders};`, values];
};

const formatUpdate = (data, table, index) => {
    const keys = Object.keys(data);
    const values = [];

    let sql = `UPDATE ${tables[table]} SET `;

    keys.forEach(i => {
        sql += `${i} = (?),`;
        values.push(data[i]);
    });

    sql = `${sql.slice(0, sql.length - 1)} WHERE id = ${index}`;

    return [sql, values];
}

const getAll = async (table) => {
    const db = await dbPromise;
    return await db.all(`SELECT * FROM ${table};`)
};

module.exports.collectData = async (req, res, next) => {
    await Promise.all(tables.map(table => getAll(table)))
        .then(results => {
            req.apiData = {
                news: results[0],
                weather: results[1]
            };
        })
        .catch(err => {
            console.log(err.message);
        });

    return next();
}

module.exports.checkLog = async (req, res, next) => {
    const now = new Date().getTime();

    const db = await dbPromise;
    const log = await db.all('SELECT * FROM log;');

    // if last data collection was over an hour ago, then do a new one
    if (now - (log[0].lastCall * 1000) > (1000 * 60 * 60)) {
        //1634302448.529

        const data = await getAll('news');

        // IF DATA DOES NOT EXISTS
        if (!data.length) {

            // contact api's for data
            await Promise.all([api.getNews(), api.getWeather()])
                .then(async (results) => {
                    let apiData = {};

                    // save apidata to database
                    results.forEach(async (result, i) => {
                        const query = formatInsertMany(result, i);
                        await db.run(query[0], query[1]);
                    });

                }).catch(err => {
                    // send service down message in place of data
                    // if service down dislay test screen => funny!! :D:D:D
                    console.log(err.message);
                });

        } else {

            // update data
            await Promise.all([api.getNews(), api.getWeather()])
                .then(async results => {
                    // for each api result
                    results.forEach((dataset, i) => {
                        // for each row
                        dataset.forEach(async (row, j) => {

                            const query = formatUpdate(row, i, j + 1);
                            await db.run(query[0], query[1]);

                        });
                    });
                });

        }

        // update log
        await updateLog(now / 1000);
    }

    return next();
}
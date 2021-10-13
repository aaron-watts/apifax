-- Up

CREATE TABLE log (
    id INTEGER PRIMARY KEY,
    lastCall INTEGER
);

-- Down

DROP TABLE log;
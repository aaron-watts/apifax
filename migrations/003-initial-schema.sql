-- Up

CREATE TABLE weather (
    id INTEGER PRIMARY KEY,
    city TEXT,
    temp INTEGER,
    description TEXT
);

-- Down

DROP TABLE weather;
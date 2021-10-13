-- Up

CREATE TABLE news (
    id INTEGER PRIMARY KEY,
    title TEXT,
    description TEXT
);

-- Down

DROP TABLE news;
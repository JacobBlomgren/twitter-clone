CREATE TABLE account (
  username VARCHAR(15) UNIQUE NOT NULL,
  id SERIAL PRIMARY KEY,
  hash CHAR(60) NOT NULL,
  salt_rounds INTEGER NOT NULL
);

CREATE INDEX username_index ON account (username);

CREATE TABLE tweet (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES account (id),
  content VARCHAR(140) NOT NULL
);
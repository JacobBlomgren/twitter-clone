CREATE TABLE account (
  username VARCHAR(15) UNIQUE NOT NULL,
  user_id SERIAL PRIMARY KEY,
  hash CHAR(60) NOT NULL,
  salt_rounds INTEGER NOT NULL
);

CREATE TABLE tweet (
  tweet_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES account,
  content VARCHAR(140) NOT NULL
);

CREATE TABLE account (
  username VARCHAR(15) UNIQUE NOT NULL,
  id SERIAL PRIMARY KEY,
  hash CHAR(60) NOT NULL,
  salt_rounds INTEGER NOT NULL,
  created_at DATE DEFAULT CURRENT_DATE
);

CREATE INDEX username_index ON account (username);


CREATE TABLE follows (
  follower INTEGER REFERENCES account (id),
  followee INTEGER REFERENCES account (id),
  PRIMARY KEY (follower, followee)
);

CREATE TABLE tweet (
  id SERIAL PRIMARY KEY,
  user_id INTEGER  NOT NULL REFERENCES account (id),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE hashtag_used (
  tweet_id INTEGER REFERENCES tweet (id),
  hashtag TEXT,
  PRIMARY KEY (tweet_id, hashtag)
);

CREATE INDEX hashtag_index ON hashtag_used (hashtag);

CREATE TABLE mentions (
  tweet_id INTEGER REFERENCES tweet (id),
  username VARCHAR(15),
  PRIMARY KEY (tweet_id, username)
);

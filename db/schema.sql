CREATE TABLE account (
  username VARCHAR(15) UNIQUE NOT NULL CONSTRAINT lowercase CHECK (lower(username) = username),
  user_id SERIAL PRIMARY KEY,
  hash CHAR(60) NOT NULL,
  salt_rounds INTEGER NOT NULL,
  created_at DATE DEFAULT CURRENT_DATE
);

CREATE INDEX username_index ON account (username);


CREATE TABLE follows (
  follower INTEGER REFERENCES account (user_id) ON DELETE CASCADE,
  followee INTEGER REFERENCES account (user_id) ON DELETE CASCADE,
  PRIMARY KEY (follower, followee)
);

CREATE TABLE tweet (
  tweet_id SERIAL PRIMARY KEY,
  user_id INTEGER  NOT NULL REFERENCES account ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE hashtag_used (
  tweet_id INTEGER REFERENCES tweet ON DELETE CASCADE,
  hashtag TEXT,
  PRIMARY KEY (tweet_id, hashtag)
);

CREATE INDEX hashtag_index ON hashtag_used (hashtag);

CREATE TABLE mentions (
  tweet_id INTEGER REFERENCES tweet ON DELETE CASCADE,
  user_id INTEGER REFERENCES account,
  username VARCHAR(15) NOT NULL CONSTRAINT lowercase CHECK (lower(username) = username),
  PRIMARY KEY (tweet_id, user_id)
);

CREATE TABLE reply_to (
  reply_tweet_id INTEGER REFERENCES tweet (tweet_id) ON DELETE CASCADE,
  original_tweet_id INTEGER REFERENCES tweet (tweet_id) ON DELETE SET NULL,
  original_user_id INTEGER REFERENCES account (user_id) ON DELETE SET NULL,
  PRIMARY KEY (reply_tweet_id, original_tweet_id)
);

CREATE INDEX reply_to_index ON reply_to (original_tweet_id);

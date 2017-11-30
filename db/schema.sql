CREATE TABLE account (
  username VARCHAR(15) UNIQUE NOT NULL CONSTRAINT lowercase CHECK (lower(username) = username),
  user_id BIGSERIAL PRIMARY KEY,
  hash CHAR(60) NOT NULL,
  salt_rounds INTEGER NOT NULL,
  created_at DATE DEFAULT CURRENT_DATE,
  name TEXT,
  description TEXT,
  profile_picture_url TEXT
);

CREATE INDEX username_index ON account (username);

CREATE TABLE follows (
  follower BIGINT REFERENCES account (user_id) ON DELETE CASCADE,
  followee BIGINT REFERENCES account (user_id) ON DELETE CASCADE,
  PRIMARY KEY (follower, followee)
);

CREATE TABLE tweet (
  tweet_id BIGSERIAL PRIMARY KEY,
  user_id BIGINT  NOT NULL REFERENCES account ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX tweet_index ON tweet (user_id);

CREATE TABLE hashtag_used (
  tweet_id BIGINT REFERENCES tweet ON DELETE CASCADE,
  hashtag TEXT,
  PRIMARY KEY (tweet_id, hashtag)
);

CREATE INDEX hashtag_index ON hashtag_used (hashtag);

CREATE TABLE mentions (
  tweet_id BIGINT REFERENCES tweet ON DELETE CASCADE,
  user_id BIGINT REFERENCES account ON DELETE CASCADE,
  username VARCHAR(15) NOT NULL CONSTRAINT lowercase CHECK (lower(username) = username),
  PRIMARY KEY (tweet_id, user_id)
);

CREATE TABLE reply_to (
  reply_tweet_id BIGINT REFERENCES tweet (tweet_id) ON DELETE CASCADE,
  -- Save some extra data so that even if the tweet is removed, we still have the user_id.
  -- If the user in turn is removed, we still know that the tweet was a reply.
  original_tweet_id BIGINT REFERENCES tweet (tweet_id) ON DELETE SET NULL,
  original_user_id BIGINT REFERENCES account (user_id) ON DELETE SET NULL,
  PRIMARY KEY (reply_tweet_id)
);

CREATE INDEX reply_to_index ON reply_to (original_tweet_id);

CREATE TABLE retweet (
  tweet_id BIGINT REFERENCES tweet (tweet_id) ON DELETE CASCADE,
  user_id BIGINT REFERENCES account (user_id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (tweet_id, user_id)
);

CREATE INDEX retweet_index ON retweet (user_id);

CREATE TABLE likes (
  tweet_id BIGINT REFERENCES tweet (tweet_id) ON DELETE CASCADE,
  user_id BIGINT REFERENCES account (user_id) ON DELETE CASCADE,
  PRIMARY KEY (tweet_id, user_id)
);

CREATE INDEX likes_index ON likes (user_id);


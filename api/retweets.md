# POST api/retweets

Retweets a tweet.

## Paramaters

_tweet_id_ the id of the tweet to like.

## Response

_200_ if successful.

_400_ if `tweet_id` was malformed.

_500_ if something went wrong.

# DELETE api/retweets

Deletes a retweet of a tweet

## Paramaters

_tweet_id_ the id of the tweet.

## Response

_200_ if successful.

_400_ if `tweet_id` was malformed.

_404_ if the tweet was not retweeted.

_500_ if something went wrong.

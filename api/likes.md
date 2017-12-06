# POST api/likes

Likes a tweet

## Paramaters

_tweet_id_ the id of the tweet to like.

## Response

_200_ if successful.

_400_ if `tweet_id` is malformed.

_500_ if something went wrong.

# DELETE api/likes

Deletes a like of a tweet

## Paramaters

_tweet_id_ the id of the tweet.

## Response

_200_ if successful.

_400_ if `tweet_id` is malformed.

_404_ if the tweet was not liked.

_500_ if something went wrong.

# POST api/tweets

Posts a tweet in the logged in users name.

## Paramaters

_content: string_ — the content of the tweet (required).

_reply_to: ?string_ the tweet id that the tweet potentially is a reply to.
Non-existent ids will simply be ignored.

## Response

_200_ if successful.

_400_ if the tweet is too long, or if other paramaters are malformed.

_401_ if no user is logged in.

_500_ if an error occurred.

# GET api/tweets

Gets detailed information for a tweet by its id. Detailed means its child and
parent tweets if it is part of a conversation.

## Paramaters

_tweet_id_ the id of the tweet.

## Response

_200_ if successful. The response body is:

```
{
  id,
  username,
  name,
  user_id,
  content,
  created_at,
  like_count,
  reply_count,
  retweet_count,
  liked,
  retweeted,
  reply_to: {
    original_tweet_id,
    original_username,
    original_user_id
  }
  parents, [tweet],
  children: [tweet],
}
```

`reply_to` is possibly null. `parents` and `children` are arrays of the same
format as the main tweet.

_400_ if `tweet_id` is malformed.

_404_ if a tweet with that id does not exist.

_500_ if an error occured.

# DELETE api/tweets

Deletes a tweet.

## Paramaters

_tweet_id: string_ — the id of the tweet to be deleted.

## Response

_200_ if successful.

_400_ if `tweet_id` is malformed.

_401_ if no user is logged in.

_404_ if the tweet either does not exist or its not the user's tweet and
consequently cannot be deleted.

_500_ if an error occurred.

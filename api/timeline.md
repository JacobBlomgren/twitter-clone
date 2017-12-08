# GET api/timeline

The timeline of recent tweets by users that the logged in user follows. It is
very similar to the real Twitter's timeline in that it will filter out tweets
that are replies to non-followed users. The timeline is limited to the 800 most
recent tweets.

## Response

_200_ if successful. The response body will be an array with tweets of the same
format as specified in [tweets](tweets.md).

_401_ if no user is logged in.

_500_ if an error occured.

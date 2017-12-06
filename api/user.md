# GET api/user

Gets the profile info and tweets of a user.

## Paramaters

_id_ the id of the user.
_username_ the username of the user.

The user can be retrieved with either one of the paramaters, only one of the two
is needed. If both are sent the behavior is unspecified.

## Response

_200_ if successful. The response body is:

```
{
  id,
  name,
  username,
  description,
  created_at,
  follower_count,
  following_count,
  follows,
  profile_picture_url,
  tweets: [tweet]
}
```

`tweets` is an array of tweets of the same format as in [tweets](tweets.md).

_400_ if the paramaters are malformed.

_404_ if a user with that id or username does not exist.

_500_ if an error occured.

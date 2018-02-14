# GET api/following

Gets a list of all accounts that the logged in user follows. Login required.

## Response

_200_ if successful. The response body is an array of the following format:
`{ id, username, name, profile_picture_url, follows }`

_401_ if no user is logged in.

_500_ if an error occurred.

# POST api/following

Follows a user. Login required.

## Paramaters

_user_id: string_ — the id of the user to follow

## Response

_200_ if successful.

_400_ if malformed paramaters are sent.

_401_ if no user is logged in.

_500_ if an error occurred, including if no user with id _user_id_ was found.

# DELETE api/following

Unfollows a user. Login required.

## Paramaters

_user_id: string_ — the id of the user to unfollow

## Response

_200_ if successful.

_400_ if malformed paramaters are sent.

_401_ if no user is logged in.

_404_ if the user was not followed.

_500_ if an error occurred.

#POST api/following
Follows a user. Login required.

##Paramaters
_user_id_ the id of the user to follow

##Response
_200_ if successful.

_400_ if malformed paramaters are sent.

_401_ if no user is logged in.

_500_ if an error occurred, including if no user with id _user_id_ was found.

#DELETE api/following
Unfollows a user. Login required.

##Paramaters
_user_id_ the id of the user to unfollow

##Response
_200_ if successful.

_400_ if malformed paramaters are sent.

_401_ if no user is logged in.

_404_ if the user was not followed.

_500_ if an error occurred.




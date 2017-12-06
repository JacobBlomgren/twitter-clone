# POST api/auth/login

Logs in a user.

## Paramaters

_username_ the username (required). A string of [3, 15] characters that can
only contain alphanumerical values.

_password_ the password (required). A string of at least 8 characters.

## Response

_200_ if successful.

_400_ if malformed paramaters are sent.

_401_ if the password is wrong, no user with that username exists, or another
user is already logged in.

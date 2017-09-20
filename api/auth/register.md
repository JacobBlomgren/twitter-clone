#POST api/auth/register
Registers (and logs in) a new user. 

##Paramaters
_username_ the username (required). A string of [3, 15] characters that can only contain alphanumerical values. Case is ignored.

_password_ the password (required). A string of at least 8 characters.

##Response
_201_ if successful.

_400_ if malformed paramaters are sent.

_401_ if another user is already logged in.

_500_ if an already registered username is sent (case insensitive).

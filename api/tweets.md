#POST api/tweets
Posts a tweet in the logged in users name.

##Paramaters
_content_ the content of the tweet (required).

_reply_to_ the tweet id that the tweet potentially is a reply to. Non-existent ids will simply be ignored.

##Response
_200_ if successful.

_400_ if the tweet is too long, or if other paramaters are malformed.

_401_ if no user is logged in.

_500_ if an error occurred.

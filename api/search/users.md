# GET api/search/users

Searches for users with a `username` or `name` matching the specified query
term.

## Paramaters

_q: string_ — the query term to search for.

## Response

_200_ if successful. The response body is:

```
[
  {
    id,
    name,
    username,
    description,
    follows,
    profile_picture_url,
  }
]
```

_400_ if the paramaters are malformed.

_500_ if an error occured.

# PUT api/settings

Updates the name and/or description of the logged in user.

## Paramaters

_name: ?string_ — the new name for the user.
_description: ?string_ — the new description for the user's profile.

Note that at least one of the paramaters must be present.

## Response

_201_ if successful.

_400_ if the body contained neither `name` nor `description`.

_500_ if something went wrong.

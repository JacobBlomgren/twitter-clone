import * as R from 'ramda';

import updateOperations from '../../../elasticsearch/sync/updateOperations';

it('should format updates to bulk update api format', () => {
  const updates = updateOperations([
    { userID: '1', name: 'Jacob', method: 'update' },
    { userID: '2', name: 'Sara', method: 'index' },
  ]);

  const user1 = { update: { _index: 'twitter', _type: 'user', _id: '1' } };
  expect(updates).toContainEqual(user1);
  const idx1 = R.findIndex(R.equals(user1), updates);
  // expect it to be immediately followed by the update value.
  expect(updates[idx1 + 1]).toEqual({ doc: { name: 'Jacob' } });

  const user2 = { index: { _index: 'twitter', _type: 'user', _id: '2' } };
  expect(updates).toContainEqual(user2);
  const idx2 = R.findIndex(R.equals(user2), updates);
  expect(updates[idx2 + 1]).toEqual({ doc: { name: 'Sara' } });
});

it('should handle an empty list', () => {
  expect(updateOperations([])).toEqual([]);
});

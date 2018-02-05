import mergedGrouped from '../../../elasticsearch/sync/mergedGrouped';

it('should group updates in users and tweets', () => {
  const grouped = mergedGrouped([
    { userID: '1', name: 'Jacob', method: 'update' },
    // haven't decided on the tweets yet, probably an array of hashtags.
    { tweetID: '1', method: 'update' },
    { userID: '2', name: 'Sara ', method: 'update' },
  ]);
  expect(grouped).toEqual({
    users: [
      { userID: '1', name: 'Jacob', method: 'update' },
      { userID: '2', name: 'Sara ', method: 'update' },
    ],
    tweets: [{ tweetID: '1', method: 'update' }],
  });
});

it('should handle an empty list', () => {
  expect(mergedGrouped([])).toEqual({ users: [], tweets: [] });
});

it('should group them together correctly', () => {
  const { users } = mergedGrouped([
    { userID: '1', name: 'Jacob', method: 'update' },
    { userID: '2', name: 'Second User', method: 'update' },
    // index should be given preference
    { userID: '1', name: 'Jake', username: 'jacob', method: 'index' },
    { userID: '2', name: 'New name', method: 'update' },
  ]);
  expect(users).toEqual([
    { userID: '1', name: 'Jacob', username: 'jacob', method: 'index' },
    { userID: '2', name: 'Second User', method: 'update' },
  ]);
});

it('should handle delete and create operations within the same batch', () => {
  const { users } = mergedGrouped([
    { userID: '1', method: 'delete' },
    { userID: '1', username: 'jacob', method: 'index' },
  ]);
  expect(users).toEqual([]);
});

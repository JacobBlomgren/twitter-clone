import uniqueGrouped from '../../../elasticsearch/sync/mergedGrouped';

it('should group updates in users and tweets', () => {
  const grouped = uniqueGrouped([
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
  expect(uniqueGrouped([])).toEqual({});
});

it('should group them together correctly', () => {
  const { users } = uniqueGrouped([
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

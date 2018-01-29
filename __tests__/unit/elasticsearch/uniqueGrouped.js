import uniqueGrouped from '../../../elasticsearch/sync/uniqueGrouped';

it('should group updates in users and tweets', () => {
  const grouped = uniqueGrouped([
    { userID: '1', name: 'Jacob' },
    // haven't decided on the tweets yet, probably an array of hashtags.
    { tweetID: '1' },
    { userID: '2', name: 'Sara ' },
  ]);
  expect(grouped).toEqual({
    users: [{ userID: '1', name: 'Jacob' }, { userID: '2', name: 'Sara ' }],
    tweets: [{ tweetID: '1' }],
  });
});

it('should handle an empty list', () => {
  expect(uniqueGrouped([])).toEqual({});
});

it('should remove duplicates and prefer the first occurence', () => {
  const { users } = uniqueGrouped([
    { userID: '1', name: 'Jacob' },
    { userID: '2', name: 'Second User' },
    { userID: '1', name: 'Jake' },
    { userID: '2', name: 'New name' },
  ]);
  expect(users).toEqual([
    { userID: '1', name: 'Jacob' },
    { userID: '2', name: 'Second User' },
  ]);
});

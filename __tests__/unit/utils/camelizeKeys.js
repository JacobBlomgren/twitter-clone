import camelizeKeys from '../../../src/shared/utils/camelizeKeys';

it('should camelize keys', () => {
  const obj = camelizeKeys({ a_random_key: true, another_one: '' });
  expect(obj).toHaveProperty('aRandomKey');
  expect(obj).toHaveProperty('anotherOne');
});

it("should transform id to ID except when the key is only 'id'", () => {
  const obj = camelizeKeys({ tweet_id: '1', original_tweet_id: '13', id: [] });
  expect(obj).toHaveProperty('tweetID');
  expect(obj).toHaveProperty('originalTweetID');
  expect(obj).toHaveProperty('id');
});

it('should deeply camelize keys', () => {
  const obj = camelizeKeys({
    level_one: {
      level_two: {
        level_three: '1',
        level_three_id: '2',
        id: '111',
        array: [{ a_b: true }],
        array_of_array: [[{ a_b: true }, { b_c: { c_d: true } }]],
      },
    },
  });
  expect(obj).toHaveProperty('levelOne');
  expect(obj.levelOne).toHaveProperty('levelTwo');
  const deep = obj.levelOne.levelTwo;
  expect(deep).toHaveProperty('levelThree');
  expect(deep).toHaveProperty('levelThreeID');
  expect(deep).toHaveProperty('id');
  expect(deep.array).toEqual([{ aB: true }]);
  expect(deep.arrayOfArray).toEqual([[{ aB: true }, { bC: { cD: true } }]]);
});

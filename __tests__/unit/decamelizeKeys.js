import decamelizeKeys from '../../src/shared/utils/decamelizeKeys';

it('should decamelize keys', () => {
  const obj = decamelizeKeys({ aRandomKey: true, another_one: '' });
  expect(obj).toHaveProperty('a_random_key');
  expect(obj).toHaveProperty('another_one');
});

it('should deeply camelize keys', () => {
  const obj = decamelizeKeys({
    levelOne: {
      levelTwo: {
        levelThree: '1',
        levelThreeID: '2',
        id: '111',
        array: [{ aB: true }],
        arrayOfArray: [[{ aB: true }, { bC: { cD: true } }]],
      },
    },
  });
  expect(obj).toHaveProperty('level_one');
  expect(obj.level_one).toHaveProperty('level_two');
  const deep = obj.level_one.level_two;
  expect(deep).toHaveProperty('level_three');
  expect(deep).toHaveProperty('level_three_id');
  expect(deep).toHaveProperty('id');
  expect(deep.array).toEqual([{ a_b: true }]);
  expect(deep.array_of_array).toEqual([
    [{ a_b: true }, { b_c: { c_d: true } }],
  ]);
});

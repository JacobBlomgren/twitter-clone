import findMentions from '../../src/shared/tweet/findMentions';

it('should match a username', () => {
  expect(findMentions('@jacob')).toEqual(['jacob']);
});

it('should match several usernames with text in between', () => {
  expect(findMentions('@jacob @sara good to see you @another23')).toEqual([
    'jacob',
    'sara',
    'another23',
  ]);
});

it('should not match the part of mentions after 15 characters', () => {
  expect(findMentions('@longerThanFifteen')).toEqual(['longerThanFifte']);
});

it('should not match usernames with unallowed characters', () => {
  expect(findMentions('@mañana')).toEqual(['ma']);
  expect(findMentions('@aaá')).toEqual(['aa']);
});

it('should not match a single @', () => {
  expect(findMentions('@')).toEqual([]);
  expect(findMentions('@   ')).toEqual([]);
});

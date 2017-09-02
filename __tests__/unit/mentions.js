import findMentions from '../../src/server/tweet/findMentions';

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

it('should remove duplicate mentions', () => {
  expect(findMentions('@jacob @jacob @jacob')).toEqual(['jacob']);
});

it('should not match the part of mentions after 15 characters', () => {
  expect(findMentions('@longerThanFifteen')).toEqual(['longerthanfifte']);
});

it('should not match usernames with unallowed characters', () => {
  expect(findMentions('@hastamañana')).toEqual(['hastama']);
  expect(findMentions('@aaaá')).toEqual(['aaa']);
});

it('should not match a single @', () => {
  expect(findMentions('@')).toEqual([]);
  expect(findMentions('@   ')).toEqual([]);
});

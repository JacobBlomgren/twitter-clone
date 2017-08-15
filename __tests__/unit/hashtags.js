import findHashtags from '../../src/shared/tweet/findHashtags';

it('should match a hashtag', () => {
  expect(findHashtags('#hashtag')).toEqual(['hashtag']);
});

it('should match several hashtags with text in between', () => {
  expect(findHashtags('#hashtag text #another #HASHTAG#oneMore')).toEqual([
    'hashtag',
    'another',
    'HASHTAG',
    'oneMore',
  ]);
});

it('should remove duplicate hashtags', () => {
  expect(findHashtags('#hashtag #hashtag #hashtag')).toEqual(['hashtag']);
});

it('should match hashtags with non-english characters', () => {
  expect(findHashtags('#igår')).toEqual(['igår']);
  expect(findHashtags('#mañana')).toEqual(['mañana']);
  expect(findHashtags('#завтра')).toEqual(['завтра']);
});

it('should not match the part after punctuation', () => {
  expect(findHashtags('#hash.tag')).toEqual(['hash']);
  expect(findHashtags('#hash,tag')).toEqual(['hash']);
  expect(findHashtags('#hash¿tag')).toEqual(['hash']);
  expect(findHashtags('#hash[tag')).toEqual(['hash']);
  expect(findHashtags('#hash{}tag')).toEqual(['hash']);
});

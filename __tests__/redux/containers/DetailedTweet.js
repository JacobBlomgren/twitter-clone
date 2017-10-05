import R from 'ramda';

import mapStateToProps from '../../../src/shared/containers/DetailedTweet/mapStateToProps';

it('should find parents and children correctly', () => {
  const props = mapStateToProps(
    {
      entities: {
        tweets: {
          byID: {
            '0': {
              id: '0',
            },
            '1': {
              id: '1',
              replyTo: '0',
            },
            '2': {
              id: '2',
              replyTo: '1',
            },
            '3': {
              id: '3',
              replyTo: '2',
            },
            '4': {
              id: '4',
              replyTo: '2',
            },
            '5': {
              id: '5',
              replyTo: '4',
            },
            '6': {
              id: '6',
              replyTo: '5',
            },
            '7': {
              id: '7',
              replyTo: '6',
            },
            '8': {
              id: '8',
              replyTo: '0',
            },
          },
        },
        replies: {
          byID: {
            '0': ['1', '8'],
            '1': ['2'],
            '2': ['3', '4'],
            '4': ['5'],
            '5': ['6'],
            '6': ['7'],
          },
        },
      },
    },
    { id: '2' },
  );
  const { id, parents, children } = props;
  expect(id).toBe('2');
  expect(parents).toEqual(['0', '1']);
  expect(R.find(child => child.id === '3', children).children).toBeUndefined();
  const children4 = R.find(child => child.id === '4', children).children;
  expect(children4).toEqual([
    {
      id: '5',
      children: [
        // Anything below 6 is not included,
        // as the limit of 3 levels of children deep is reached.
        { id: '6' },
      ],
    },
  ]);
});

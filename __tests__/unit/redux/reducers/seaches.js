import 'isomorphic-fetch';
import searches from '../../../../src/shared/reducers/entities/searches';
import { SEARCH_USER_SUCCESS } from '../../../../src/shared/actions/search';

test('searches update', () => {
  const state = searches(undefined, {
    type: SEARCH_USER_SUCCESS,
    query: 'Jacob',
    users: [{ id: '1', name: 'Jacob' }, { id: '2', name: 'Jacob Blomgren' }],
  });
  // eslint-disable-next-line dot-notation
  expect(state['Jacob']).toEqual(['1', '2']);
});

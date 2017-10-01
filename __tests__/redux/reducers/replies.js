import deepFreeze from 'deep-freeze';

import replies from '../../../src/shared/reducers/entities/replies';
import { FETCH_PROFILE_SUCCESS } from '../../../src/shared/actions/profile';

test('default', () => {
  const state = replies(undefined, {});
  expect(state.byID).toEqual({});
  expect(state.allIDs).toEqual([]);
});

test('merging', () => {
  const initialState = {
    byID: {
      '1': ['3', '4'],
    },
    allIDs: ['1'],
  };
  deepFreeze(initialState);
  const { byID, allIDs } = replies(initialState, {
    type: FETCH_PROFILE_SUCCESS,
    replies: {
      '1': ['4', '5'],
      '2': ['6'],
    },
  });
  ['3', '4', '5'].forEach(expect(byID['1']).toContain);
  expect(byID['2']).toContain('6');
  ['1', '2'].forEach(expect(allIDs).toContain);
});

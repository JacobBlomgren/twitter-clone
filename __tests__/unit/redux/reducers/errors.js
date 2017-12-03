import errors from '../../../../src/shared/reducers/errors';
import { ADD_ERROR, REMOVE_ERROR } from '../../../../src/shared/actions/error';

test('default', () => {
  const state = errors(undefined, {});
  expect(state).toEqual([]);
});

test('ADD_ERROR', () => {
  const state1 = errors([], {
    type: ADD_ERROR,
    message: 'first',
    id: 1,
  });
  expect(state1).toEqual([
    {
      message: 'first',
      id: 1,
    },
  ]);
  const state2 = errors(state1, {
    type: ADD_ERROR,
    message: 'second',
    id: 2,
  });
  expect(state2).toEqual([
    {
      message: 'first',
      id: 1,
    },
    {
      message: 'second',
      id: 2,
    },
  ]);
});

test('REMOVE_ERROR', () => {
  const state1 = errors([], {
    type: ADD_ERROR,
    message: 'first',
    id: 1,
  });
  const state2 = errors(state1, {
    type: ADD_ERROR,
    message: 'second',
    id: 2,
  });
  const state3 = errors(state2, {
    type: ADD_ERROR,
    message: 'third',
    id: 3,
  });

  const stateFirstRemove = errors(state3, {
    type: REMOVE_ERROR,
    id: 2,
  });

  expect(stateFirstRemove).toEqual([
    {
      message: 'first',
      id: 1,
    },
    {
      message: 'third',
      id: 3,
    },
  ]);

  const stateRemoveNonexistent = errors(stateFirstRemove, {
    type: REMOVE_ERROR,
    id: 10000,
  });

  expect(stateRemoveNonexistent).toEqual([
    {
      message: 'first',
      id: 1,
    },
    {
      message: 'third',
      id: 3,
    },
  ]);
});

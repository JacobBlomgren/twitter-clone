import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import {
  ADD_ERROR,
  REMOVE_ERROR,
  addError,
  removeError,
} from '../../../src/shared/actions/error';

const mockStore = configureMockStore([thunkMiddleware]);

test('addError', async () => {
  const store = mockStore();
  const msg = 'Something went wrong';
  await store.dispatch(addError(msg));

  expect(store.getActions()[0].type).toBe(ADD_ERROR);

  await store.dispatch(addError(msg));
  expect(store.getActions()[0].id).not.toBe(store.getActions()[1].id);
});

test('removeError', async () => {
  const store = mockStore();
  await store.dispatch(removeError(1));

  expect(store.getActions()[0].type).toBe(REMOVE_ERROR);
});

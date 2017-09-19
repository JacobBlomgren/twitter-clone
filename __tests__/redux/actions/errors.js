import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import {
  ADD_ERROR,
  REMOVE_ERROR,
  showError,
} from '../../../src/client/actions/error';

const mockStore = configureMockStore([thunkMiddleware]);
jest.useFakeTimers();

test('showError', async () => {
  const store = mockStore();
  const msg = 'Something went wrong';
  await store.dispatch(showError(msg));

  expect(store.getActions()[0].type).toBe(ADD_ERROR);

  jest.runAllTimers();
  expect(store.getActions()[1].type).toBe(REMOVE_ERROR);
});

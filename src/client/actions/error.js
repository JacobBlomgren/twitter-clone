let incrementingID = 0;

export const ADD_ERROR = 'ADD_ERROR';
export function addError(message) {
  incrementingID += 1;
  return {
    type: ADD_ERROR,
    message,
    id: incrementingID,
  };
}

export const REMOVE_ERROR = 'REMOVE_ERROR';
export function removeError(id) {
  return {
    type: REMOVE_ERROR,
    id,
  };
}

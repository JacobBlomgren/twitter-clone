let incrementingID = 0;

export const ADD_ERROR = 'ADD_ERROR';
function addError(message, id) {
  return {
    type: ADD_ERROR,
    message,
    id,
  };
}

export const REMOVE_ERROR = 'REMOVE_ERROR';
function removeError(id) {
  return {
    type: REMOVE_ERROR,
    id,
  };
}

export function showError(msg) {
  return dispatch => {
    incrementingID += 1;
    dispatch(addError(msg, incrementingID));
    setTimeout(() => dispatch(removeError(incrementingID)), 5000);
  };
}

import axios from 'axios';
import { signoutUser } from './authActions';

import {
  CLIENT_FIND_STARTED,
  CLIENT_FIND_FINISHED,
  CLIENT_FIND_ERROR,
  CLIENT_FIND_RESET
} from './clientTypes';

export const clientError = error => {
  return {
    type: CLIENT_FIND_ERROR,
    payload: error
  };
};

export const findClients = queryString => dispatch => {
  if (queryString === '') {
    return dispatch({ type: CLIENT_FIND_RESET });
  }
  dispatch({ type: CLIENT_FIND_STARTED, payload: queryString });

  const authData = { authorization: localStorage.getItem('token') };
  axios
    .get('/api/history', { headers: authData, params: { queryString } })
    .then(response => {
      return dispatch({
        type: CLIENT_FIND_FINISHED,
        payload: response.data.result
      });
    })
    .catch(error => {
      if (error.response && error.response.status === 400) {
        return dispatch(clientError(error.response.data.result));
      }
      if (error.response && error.response.status === 401) {
        dispatch({ type: CLIENT_FIND_RESET });
        return dispatch(signoutUser());
      }
      return dispatch(clientError('Внутренняя ошибка сервера!'));
    });
};

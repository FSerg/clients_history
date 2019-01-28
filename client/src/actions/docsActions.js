import axios from 'axios';

import {
  DOCS_GET_STARTED,
  DOCS_GET_FINISHED,
  DOCS_GET_ERROR
} from './docsTypes';

export const docsError = error => {
  return {
    type: DOCS_GET_ERROR,
    payload: error
  };
};

export const getDocs = clientCode => dispatch => {
  dispatch({ type: DOCS_GET_STARTED });

  const authData = { authorization: localStorage.getItem('token') };
  axios
    .get('/api/docs', { headers: authData, params: { clientCode } })
    .then(response => {
      return dispatch({
        type: DOCS_GET_FINISHED,
        payload: response.data.result
      });
    })
    .catch(error => {
      if (error.response && error.response.status === 400) {
        return dispatch(docsError(error.response.data.result));
      }
      if (error.response && error.response.status === 401) {
        return dispatch(docsError('Ошибка авторизации пользователя'));
      }
      return dispatch(docsError('Внутренняя ошибка сервера!'));
    });
};

import axios from 'axios';

import {
  USERS_GET_STARTED,
  USERS_GET_FINISHED,
  USERS_ERROR,
  USERS_DELETED,
  USERS_UPDATE_FINISHED
} from './usersTypes';

export const usersError = error => {
  return {
    type: USERS_ERROR,
    payload: error
  };
};

export const getUsers = () => dispatch => {
  dispatch({ type: USERS_GET_STARTED });

  const authData = { authorization: localStorage.getItem('token') };
  axios
    .get('/api/users/all', { headers: authData })
    .then(response => {
      return dispatch({
        type: USERS_GET_FINISHED,
        payload: response.data.result
      });
    })
    .catch(error => {
      if (error.response && error.response.status === 400) {
        return dispatch(usersError(error.response.data.result));
      }
      if (error.response && error.response.status === 401) {
        return dispatch(usersError('Ошибка авторизации пользователя'));
      }
      return dispatch(usersError('Внутренняя ошибка сервера!'));
    });
};

export const delUser = userId => dispatch => {
  const authData = { authorization: localStorage.getItem('token') };
  axios
    .delete('/api/users', { headers: authData, params: { userId } })
    .then(() => {
      return dispatch({
        type: USERS_DELETED,
        payload: userId
      });
    })
    .catch(error => {
      if (error.response && error.response.status === 400) {
        return dispatch(usersError(error.response.data.result));
      }
      if (error.response && error.response.status === 401) {
        return dispatch(usersError('Ошибка авторизации пользователя'));
      }
      return dispatch(usersError('Внутренняя ошибка сервера!'));
    });
};

export const updateUser = userData => dispatch => {
  const authData = { authorization: localStorage.getItem('token') };
  axios
    .post('/api/users', userData, { headers: authData })
    .then(() => {
      return dispatch({
        type: USERS_UPDATE_FINISHED,
        payload: userData._id
      });
    })
    .catch(error => {
      if (error.response && error.response.status === 400) {
        return dispatch(usersError(error.response.data.result));
      }
      if (error.response && error.response.status === 401) {
        return dispatch(usersError('Ошибка авторизации пользователя'));
      }
      return dispatch(usersError('Внутренняя ошибка сервера!'));
    });
};

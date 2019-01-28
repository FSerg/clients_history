import axios from 'axios';
import {
  AUTH_SUCCESS,
  UNAUTH_USER,
  AUTH_ERROR,
  AUTH_STARTED,
  AUTH_LOGINWAIT
} from './authTypes';
import history from '../history';

export const signoutUser = () => {
  localStorage.removeItem('token');
  history.push('/login');
  return { type: UNAUTH_USER };
};

export const authError = error => {
  return {
    type: AUTH_ERROR,
    payload: error
  };
};

export const signupSubmit = userData => dispatch => {
  dispatch({ type: AUTH_STARTED });
  axios
    .post('/api/users/signup', userData)
    .then(response => {
      dispatch({ type: AUTH_LOGINWAIT });

      history.push('/login');
    })
    .catch(error => {
      if (error.response && error.response.status === 400) {
        dispatch(authError(error.response.data.result));
      } else {
        dispatch(authError('Внутренняя ошибка сервера'));
      }
    });
};

export const loginSubmit = userData => dispatch => {
  dispatch({ type: AUTH_STARTED });
  axios
    .post('/api/users/login', userData)
    .then(response => {
      dispatch({ type: AUTH_SUCCESS, payload: response.data.result.user });
      localStorage.setItem('token', response.data.result.token);
      history.push('/history');
    })
    .catch(error => {
      if (error.response && error.response.status === 400) {
        dispatch(authError(error.response.data.result));
      } else {
        dispatch(authError('Внутренняя ошибка сервера'));
      }
    });
};

export const getCurrentUser = () => dispatch => {
  dispatch({ type: AUTH_STARTED });
  const authData = { authorization: localStorage.getItem('token') };
  axios
    .get('/api/users/current', { headers: authData })
    .then(response => {
      dispatch({ type: AUTH_SUCCESS, payload: response.data.result });
    })
    .catch(error => {
      if (error.response && error.response.status === 401) {
        dispatch(authError('Ошибка авторизации'));
      } else {
        dispatch(authError('Внутренняя ошибка сервера'));
      }
    });
};

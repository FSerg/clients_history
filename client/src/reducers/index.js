import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import authReducer from './authReducer';
import clientReducer from './clientReducer';
import docsReducer from './docsReducer';
import modalReducer from './modalReducer';

export default combineReducers({
  auth: authReducer,
  usersStore: usersReducer,
  clientStore: clientReducer,
  docsStore: docsReducer,
  modal: modalReducer
});

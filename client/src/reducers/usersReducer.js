import {
  USERS_GET_STARTED,
  USERS_GET_FINISHED,
  USERS_ERROR,
  USERS_DELETED,
  USERS_UPDATE_FINISHED
} from '../actions/usersTypes';

export default (state = { users: [] }, action) => {
  switch (action.type) {
  case USERS_GET_STARTED:
    return { users: [], isLoading: true, error: '' };
  case USERS_GET_FINISHED:
    return { users: action.payload, isLoading: false, error: '' };
  case USERS_ERROR:
    return {
      ...state,
      isLoading: false,
      error: action.payload
    };
  case USERS_UPDATE_FINISHED:
    return {
      ...state,
      error: '',
      users: state.users.map(
        user =>
          user._id === action.payload ? { ...user, isUpdating: false } : user
      )
    };
  case USERS_DELETED:
    return {
      ...state,
      users: state.users.filter(user => user._id !== action.payload)
    };
  default:
    return state;
  }
};

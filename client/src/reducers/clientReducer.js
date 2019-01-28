import {
  CLIENT_FIND_STARTED,
  CLIENT_FIND_FINISHED,
  CLIENT_FIND_ERROR,
  CLIENT_FIND_RESET
} from '../actions/clientTypes';

export default (state = { finded_clients: [], search_string: '' }, action) => {
  switch (action.type) {
  case CLIENT_FIND_STARTED:
    return {
      ...state,
      finded_clients: [],
      search_string: action.payload,
      isLoading: true,
      error: ''
    };
  case CLIENT_FIND_FINISHED:
    return { ...state, finded_clients: action.payload, isLoading: false };
  case CLIENT_FIND_RESET:
    return {
      ...state,
      finded_clients: [],
      search_string: '',
      isLoading: false,
      error: ''
    };
  case CLIENT_FIND_ERROR:
    return {
      ...state,
      finded_clients: [],
      isLoading: false,
      error: action.payload
    };
  default:
    return state;
  }
};

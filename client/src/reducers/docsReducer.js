import {
  DOCS_GET_STARTED,
  DOCS_GET_FINISHED,
  DOCS_GET_ERROR
} from '../actions/docsTypes';

export default (state = { docs: [] }, action) => {
  switch (action.type) {
  case DOCS_GET_STARTED:
    return { docs: [], isLoading: true, error: '' };
  case DOCS_GET_FINISHED:
    return { docs: action.payload, isLoading: false, error: '' };
  case DOCS_GET_ERROR:
    return {
      docs: [],
      isLoading: false,
      error: action.payload
    };
  default:
    return state;
  }
};

/* eslint-disable default-param-last */
import { API_URL } from '../../config';

export const getAllCategories = ({ category }) => category;

// actions
const reducerName = 'categories';
const createActionName = name => `app/${reducerName}/${name}`;

const LOAD_CATEGORIES = createActionName('LOAD_CATEGORIES');

// action creators
export const loadCategories = payload => ({ payload, type: LOAD_CATEGORIES });

// thunk
export const fetchCategories = () => {
  return async dispatch => {
    try {
      let res = await fetch(`${API_URL}/category`);
      res = await res.json();
      dispatch(loadCategories(res));
    } catch (e) {
      console.log(e.message);
    }
  };
};

// reducer

const categoryReducer = (state = [], action) => {
  switch (action.type) {
    case LOAD_CATEGORIES:
      return [...action.payload];
    default:
      return state;
  }
};

export default categoryReducer;

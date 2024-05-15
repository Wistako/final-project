/* eslint-disable default-param-last */
import { API_URL } from '../../config';

export const getAllSizes = ({ size }) => size;

// actions
const reducerName = 'sizes';
const createActionName = name => `app/${reducerName}/${name}`;

const LOAD_SIZES = createActionName('LOAD_SIZES');

// action creators
export const loadSizes = payload => ({ payload, type: LOAD_SIZES });

// thunk
export const fetchSizes = () => {
  return async dispatch => {
    try {
      let res = await fetch(`${API_URL}/size`);
      res = await res.json();
      dispatch(loadSizes(res));
    } catch (e) {
      console.log(e.message);
    }
  };
};

// reducer

const sizesReducer = (state = [], action) => {
  switch (action.type) {
    case LOAD_SIZES:
      return [...action.payload];
    default:
      return state;
  }
};

export default sizesReducer;

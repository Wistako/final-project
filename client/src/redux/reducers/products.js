/* eslint-disable default-param-last */
import { API_URL } from '../../config';

// selectors
export const getProducts = ({ products }) => products.data;
export const getProductById = ({ products }, productId) => {
  if (products.data.length < 1) return null;
  return products.data.find(product => product.id === productId);
};

export const getRequest = ({ products }) => products.request;

// action name creator
const reducerName = 'products';
const createActionName = name => `app/${reducerName}/${name}`;
const LOAD_PRODUCTS = createActionName('LOAD_PRODUCTS');

const REQUEST_START = createActionName('REQUEST_START');
const REQUEST_SUCCESS = createActionName('REQUEST_SUCCESS');
const REQUEST_ERROR = createActionName('REQUEST_ERROR');

// actions
const loadProducts = payload => ({ payload, type: LOAD_PRODUCTS });
const requestStart = payload => ({ payload, type: REQUEST_START });
const requestSuccess = payload => ({ payload, type: REQUEST_SUCCESS });
const requestError = payload => ({ payload, type: REQUEST_ERROR });

// API
export const fetchProducts = () => {
  return dispatch => {
    dispatch(requestStart());
    try {
      fetch(`${API_URL}/products`)
        .then(res => res.json())
        .then(data => dispatch(loadProducts(data)));
      dispatch(requestSuccess());
    } catch (error) {
      dispatch(requestError(error));
    }
  };
};

// initial state
const initialState = {
  data: [],
  request: {
    pending: false,
    error: null,
    success: false,
  },
};

// reducer

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return { ...state, data: action.payload };

    case REQUEST_START:
      return { ...state, request: { pending: true, error: null, success: false } };

    case REQUEST_SUCCESS:
      return { ...state, request: { pending: false, error: null, success: true } };

    case REQUEST_ERROR:
      return { ...state, request: { pending: false, error: action.error, success: false } };

    default:
      return state;
  }
};

export default productsReducer;

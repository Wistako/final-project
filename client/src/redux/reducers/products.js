/* eslint-disable default-param-last */
import { API_URL } from '../../config';

// selectors
export const getProducts = ({ products }) => products.data;
export const getProductById = ({ products }, productId) => {
  if (products.data.length < 1) return null;
  return products.data.find(product => product.id === productId);
};
// action name creator
const reducerName = 'products';
const createActionName = name => `app/${reducerName}/${name}`;
const LOAD_PRODUCTS = createActionName('LOAD_PRODUCTS');
const UPDATE_PRODUCT = createActionName('UPDATE_PRODUCT');
const ADD_PRODUCT = createActionName('ADD_PRODUCT');
const DELETE_PRODUCT = createActionName('DELETE_PRODUCT');

// actions
const loadProducts = payload => ({ payload, type: LOAD_PRODUCTS });

export const addProduct = payload => ({ payload, type: ADD_PRODUCT });
export const updateProduct = payload => ({ payload, type: UPDATE_PRODUCT });
export const deleteProduct = payload => ({ payload, type: DELETE_PRODUCT });

// API
export const fetchProducts = () => {
  return dispatch => {
    fetch(`${API_URL}/products`)
      .then(res => res.json())
      .then(data => dispatch(loadProducts(data)));
  };
};

export const addProductRequest = product => {
  return dispatch => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: product,
    };

    fetch(`${API_URL}/products`, options)
      .then(res => res.json())
      .then(data => {
        dispatch(addProduct(data));
      });
  };
};

// initial state
const initialState = {
  data: [],
  requests: {},
};

// reducer

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return { ...state, data: action.payload };

    case ADD_PRODUCT:
      return { ...state, data: [...state.data, action.payload] };

    case UPDATE_PRODUCT:
      return {
        ...state,
        data: state.data.map(product =>
          product.id === action.payload.id ? action.payload : product
        ),
      };

    case DELETE_PRODUCT:
      return { ...state, data: state.data.filter(product => product.id !== action.payload) };

    default:
      return state;
  }
};

export default productsReducer;

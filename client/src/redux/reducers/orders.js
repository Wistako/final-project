/* eslint-disable default-param-last */

import { API_URL } from '../../config';

// selectors
export const getOrders = ({ orders }) => orders;

// actions
const reducerName = 'orders';
const createActionName = name => `app/${reducerName}/${name}`;

const LOAD_ORDERS = createActionName('LOAD_ORDERS');
const UPDATE_STATUS = createActionName('UPDATE_STATUS');

export const loadOrders = payload => ({ type: LOAD_ORDERS, payload });
export const updateStatus = payload => ({ type: UPDATE_STATUS, payload });

// thunks

export const fetchOrders = role => {
  return async dispatch => {
    const url = `${API_URL}/orders${role === 'ADMIN' ? '' : '/user'}`;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (process.env.NODE_ENV === 'production') {
      options.credentials = 'include';
    }

    fetch(url, options)
      .then(res => res.json())
      .then(res => {
        dispatch(loadOrders(res));
      });
  };
};

export const changeStatus = (id, status) => {
  return async dispatch => {
    const url = `${API_URL}/orders/${id}`;

    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    };

    if (process.env.NODE_ENV === 'production') {
      options.credentials = 'include';
    }

    fetch(url, options)
      .then(res => res.json())
      .then(res => {
        dispatch(updateStatus(res.order));
      });
  };
};

// reducer
const ordersReducer = (statePart = null, action) => {
  switch (action.type) {
    case LOAD_ORDERS: {
      return action.payload;
    }
    case UPDATE_STATUS: {
      return statePart.map(order => (order.id === action.payload.id ? action.payload : order));
    }
    default:
      return statePart;
  }
};

export default ordersReducer;

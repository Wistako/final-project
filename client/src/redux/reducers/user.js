/* eslint-disable default-param-last */

import { fetchOrders } from './orders';

// selectors
export const getUser = ({ user }) => user;

// actions
const reducerName = 'user';
const createActionName = name => `app/${reducerName}/${name}`;

const LOG_IN = createActionName('LOG_IN');
const LOG_OUT = createActionName('LOG_OUT');

const logIn = payload => ({ type: LOG_IN, payload });
export const logOut = () => ({ type: LOG_OUT });

export const logInReq = userData => {
  return async dispatch => {
    dispatch(logIn(userData));
    dispatch(fetchOrders(userData.role));
  };
};

// reducer
const userReducer = (statePart = null, action) => {
  switch (action.type) {
    case LOG_IN: {
      return action.payload;
    }
    case LOG_OUT: {
      return null;
    }
    default:
      return statePart;
  }
};

export default userReducer;

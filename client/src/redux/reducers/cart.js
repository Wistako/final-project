/* eslint-disable default-param-last */
import shortid from 'shortid';

// selectors
export const getCart = ({ cart }) => cart;
export const prepareCartToOrder = ({ cart }) => {
  const products = cart.map(cartItem => ({
    productId: cartItem.product.id,
    quantity: cartItem.quantity,
    sizeId: cartItem.size.sizeId,
    description: cartItem.description,
  }));
  return products;
};

// actions
const reducerName = 'cart';
const createActionName = name => `app/${reducerName}/${name}`;

const ADD_TO_CART = createActionName('ADD_TO_CART');
const REMOVE_FROM_CART = createActionName('REMOVE_FROM_CART');
const CLEAR_CART = createActionName('CLEAR_CART');
const CHANGE_QUANTITY = createActionName('CHANGE_QUANTITY');
const CHANGE_DESCRIPTION = createActionName('CHANGE_DESCRIPTION');

export const addToCart = payload => ({ type: ADD_TO_CART, payload });
export const removeFromCart = payload => ({ type: REMOVE_FROM_CART, payload });
export const clearCart = () => ({ type: CLEAR_CART });
export const changeDescription = payload => ({ type: CHANGE_DESCRIPTION, payload });
export const changeQuantity = payload => ({ type: CHANGE_QUANTITY, payload });

const persistedState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

// reducer
// reducer
const cartReducer = (statePart = persistedState, action) => {
  let newState;
  switch (action.type) {
    case ADD_TO_CART: {
      if (
        statePart.find(
          item =>
            item.product.id === action.payload.product.id &&
            item.size.sizeId === action.payload.size.sizeId
        )
      ) {
        newState = statePart.map(item => {
          if (
            item.product.id === action.payload.product.id &&
            item.size.sizeId === action.payload.size.sizeId
          ) {
            console.log(action.payload.quantity);
            return { ...item, quantity: item.quantity + action.payload.quantity };
          }
          return item;
        });
      } else {
        newState = [...statePart, { ...action.payload, id: shortid() }];
      }
      break;
    }
    case REMOVE_FROM_CART:
      newState = statePart.filter(item => item.id !== action.payload.id);
      break;
    case CLEAR_CART:
      newState = [];
      break;
    case CHANGE_QUANTITY: {
      newState = statePart.map(item => {
        if (item.id === action.payload.id) {
          return { ...item, quantity: action.payload.quantity };
        }
        return item;
      });

      break;
    }
    case CHANGE_DESCRIPTION: {
      newState = statePart.map(item => {
        if (item.id === action.payload.id) {
          return { ...item, description: action.payload.description };
        }
        return item;
      });
      break;
    }
    default:
      newState = statePart;
  }

  // Save the new state to localStorage
  localStorage.setItem('cart', JSON.stringify(newState));

  return newState;
};

export default cartReducer;

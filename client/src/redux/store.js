import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import userReducer from './reducers/user';
import productsReducer from './reducers/products';
import cartReducer from './reducers/cart';
import categoryReducer from './reducers/category';
import sizesReducer from './reducers/size';
import ordersReducer from './reducers/orders';

// import reducers

// combine reducers
const rootReducer = combineReducers({
  user: userReducer,
  products: productsReducer,
  cart: cartReducer,
  category: categoryReducer,
  size: sizesReducer,
  orders: ordersReducer,
});

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    // eslint-disable-next-line no-underscore-dangle
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  )
);

export default store;

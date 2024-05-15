import { Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Home from './components/pages/Home/Home';
import { API_URL } from './config';
import Login from './components/pages/Login/Login';
import { fetchProducts } from './redux/reducers/products';
import Product from './components/pages/Product/Product';
import Header from './components/layout/Header/Header';
import Container from './components/common/Container/Container';
import Register from './components/pages/Register/Register';
import EditProduct from './components/pages/EditProduct/EditProduct';
import { logInReq } from './redux/reducers/user';
import NewProduct from './components/pages/NewProduct/NewProduct';
import Logout from './components/pages/Logout/Logout';
import UpdateStock from './components/pages/UpdateStock/UpdateStock';
import { fetchCategories } from './redux/reducers/category';
import { fetchSizes } from './redux/reducers/size';
import Cart from './components/pages/Cart/Cart';
import Checkout from './components/pages/Checkout/Chceckout';
import AdminPanel from './components/pages/AdminPanel/AdminPanel';
import Orders from './components/pages/Orders/Orders';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Login user if token is still valid
    const options = {
      method: 'GET',
    };
    if (process.env.NODE_ENV === 'production') {
      options.credentials = 'include';
    }
    const login = async () => {
      const res = await fetch(`${API_URL}/auth/user`, options);
      if (res.status === 200) {
        const user = await res.json();
        dispatch(logInReq(user));
      }
    };
    dispatch(fetchProducts());
    dispatch(fetchCategories());
    dispatch(fetchSizes());
    login();
  }, [dispatch]);

  return (
    <>
      <Header />
      <Container>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/product/:id' element={<Product />} />
          <Route path='/search/:searchPhrase' element={<div>ABCJDASD</div>} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/cart/checkout' element={<Checkout />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/admin' element={<AdminPanel />} />
          <Route path='/admin/product/new' element={<NewProduct />} />
          <Route path='/admin/product/edit/:id' element={<EditProduct />} />
          <Route path='/admin/product/stock' element={<UpdateStock />} />

          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;

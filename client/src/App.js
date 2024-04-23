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
        dispatch(login(user));
      }
    };
    login();
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Container>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product/:id' element={<Product />} />
        <Route path='/product/new' element={<div>ABCJDASD</div>} />
        <Route path='/product/edit/:id' element={<div>ABCJDASD</div>} />
        <Route path='/product/delete/:id' element={<div>ABCJDASD</div>} />
        <Route path='/search/:searchPhrase' element={<div>ABCJDASD</div>} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/logout' element={<div>ABCJDASD</div>} />
        <Route path='/orders' element={<div>ABCJDASD</div>} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </Container>
  );
}

export default App;

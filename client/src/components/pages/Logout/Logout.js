import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../../config';
import { logOut } from '../../../redux/reducers/user';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const options = {
      method: 'DELETE',
    };

    if (process.env.NODE_ENV === 'production') {
      options.credentials = 'include';
    }

    fetch(`${API_URL}/auth/logout`, options).then(() => {
      dispatch(logOut());
      navigate('/');
    });
  });
};

export default Logout;

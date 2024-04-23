import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Container from '../../common/Container/Container';
import { logIn } from '../../../redux/reducers/user';
import { API_URL } from '../../../config';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [status, setStatus] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async data => {
    setStatus('loading');

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        crudentials: 'include',
      },
      body: JSON.stringify(data),
    };

    fetch(`${API_URL}/auth/login`, options)
      .then(res => {
        if (res.status === 201) {
          setStatus('success');
          res.json().then(({ user }) => dispatch(logIn(user)));
          setTimeout(() => {
            navigate('/');
          }, 2000);
        } else if (res.status === 401) {
          setStatus('clientError');
        } else {
          setStatus('serverError');
        }
      })
      .catch(err => setStatus('serverError'));
  };
  return (
    <Container>
      <h1>Login</h1>
      {status === 'success' && (
        <div>
          <p>Success! You are now logged in.</p>
        </div>
      )}
      {status === 'clientError' && (
        <div>
          <p>Invalid email or password</p>
        </div>
      )}
      {status === 'serverError' && (
        <div>
          <p>Server error. Please try again later.</p>
        </div>
      )}
      {status === 'loading' && (
        <div>
          <img src={`${process.env.PUBLIC_URL}/images/spinner.svg`} alt='loading' />
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor='email'>Email</label>
        <input
          id='email'
          type='email'
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
              message: 'Invalid email address',
            },
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}
        <label htmlFor='password'>Password</label>
        <input
          id='password'
          type='password'
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 5,
              message: 'Password must have at least 5 characters',
            },
          })}
        />
        <button type='submit'>Login</button>
      </form>
      <Link to='/'>Home</Link>
      <div />
      <Link to='/register'>Register</Link>
    </Container>
  );
};

export default Login;

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import styles from './Register.module.scss';
import { API_URL } from '../../../config';
import Container from '../../common/Container/Container';

const Register = () => {
  const [status, setStatus] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    setStatus('loading');
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    fetch(`${API_URL}/auth/register`, options)
      .then(res => {
        if (res.status === 201) {
          setStatus('success');
        } else if (res.status === 401) {
          setStatus('clientError');
        } else if (res.status === 409) {
          setStatus('loginError');
        } else {
          setStatus('serverError');
        }
      })
      .catch(err => setStatus('serverError'));
  };
  return (
    <Container className={styles.root}>
      <h1>Register</h1>
      {status === 'success' && (
        <div className={styles.success}>
          <p>Success! You are now logged in.</p>
          <Link to='/login'>Login</Link>
        </div>
      )}
      {status === 'clientError' && (
        <div className={styles.error}>
          <p>Invalid email or password</p>
        </div>
      )}
      {status === 'loginError' && (
        <div className={styles.error}>
          <p>Email already exists</p>
        </div>
      )}
      {status === 'serverError' && (
        <div className={styles.error}>
          <p>Server error. Please try again later.</p>
        </div>
      )}
      {status === 'loading' && (
        <div className={styles.loading}>
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
            maxLength: {
              value: 20,
              message: 'Password must have at most 20 characters',
            },
          })}
        />
        <label htmlFor='password2'>Repeat password</label>
        <input
          id='password2'
          type='password'
          {...register('passwordRepeat', {
            required: 'Password is required',
            minLength: {
              value: 5,
              message: 'Password must have at least 5 characters',
            },
            maxLength: {
              value: 20,
              message: 'Password must have at most 20 characters',
            },
          })}
        />
        <button type='submit'>Register</button>
      </form>
    </Container>
  );
};

export default Register;

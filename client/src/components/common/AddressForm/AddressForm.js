import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import styles from './AddressForm.module.scss';
import PrimaryButton from '../buttons/PrimaryButton/PrimaryButton';
import { API_URL } from '../../../config';
import { clearCart, prepareCartToOrder } from '../../../redux/reducers/cart';
import { fetchProducts } from '../../../redux/reducers/products';

const AddressForm = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZip] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const orderItems = useSelector(state => prepareCartToOrder(state));

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

  const onSubmit = address => {
    setStatus('loading');
    const url = `${API_URL}/orders`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...address, items: orderItems }),
    };

    if (process.env.NODE_ENV === 'production') {
      options.credentials = 'include';
    }

    fetch(url, options)
      .then(res => {
        if (res.status === 201) {
          setStatus('success');
          dispatch(fetchProducts());
          dispatch(clearCart());
        } else {
          setStatus('error');
        }
      })
      .catch(error => {
        setStatus('error');
      });
  };

  return (
    // eslint-disable-next-line react/no-unknown-property
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h2>Shipping address</h2>
      {status === 'error' && <div className={styles.fetcherr}>Something went wrong</div>}
      {status === 'loading' && (
        <div className={styles.loading}>
          <img src={`${process.env.PUBLIC_URL}/images/spinner.svg`} alt='loading' />
        </div>
      )}
      {status === 'success' && <div className={styles.success}>Order has been placed</div>}
      {status !== 'success' && status !== 'loading' && (
        <>
          <label>
            <p>Name</p>
            <input
              type='text'
              onChange={e => setName(e.target.value)}
              {...register('name', { value: name, required: true, maxLength: 255, minLength: 3 })}
            />
            {errors.name && <p className={styles.error}>Name is required</p>}
          </label>
          <label>
            <p>Lastname</p>
            <input
              type='text'
              onChange={e => setSurname(e.target.value)}
              {...register('surname', {
                value: surname,
                required: true,
                maxLength: 255,
                minLength: 3,
              })}
            />
            {errors.surname && <p className={styles.error}>Surname is required</p>}
          </label>
          <label>
            <p>Email</p>
            <input
              type='text'
              onChange={e => setEmail(e.target.value)}
              {...register('email', {
                value: email,
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              })}
            />
            {errors.email && <p className={styles.error}>Email is required</p>}
          </label>
          <label>
            <p>Address</p>
            <input
              type='text'
              onChange={e => setAddress(e.target.value)}
              {...register('address', {
                value: address,
                required: true,
                maxLength: 255,
                minLength: 3,
              })}
            />
            {errors.address && <p className={styles.error}>Address is required</p>}
          </label>
          <label>
            <p>City</p>
            <input
              type='text'
              onChange={e => setCity(e.target.value)}
              {...register('city', { value: city, required: true, maxLength: 255, minLength: 3 })}
            />
            {errors.city && <p className={styles.error}>City is required</p>}
          </label>
          <label>
            <p>ZIP</p>
            <input
              type='text'
              onChange={e => setZip(e.target.value)}
              {...register('zipCode', {
                value: zipCode,
                required: true,
                minLength: 6,
                maxLength: 6,
              })}
            />
            {errors.zipCode && (
              <p className={styles.error}>ZIP is required, 6 characters (e.g. 00-000)</p>
            )}
          </label>
          <label>
            <p>Phone</p>
            <input
              type='text'
              onChange={e => setPhone(e.target.value)}
              {...register('phone', { value: phone, required: true, minLength: 9, maxLength: 9 })}
            />
            {errors.phone && <p className={styles.error}>Phone is required, 9 characters</p>}
          </label>
          <PrimaryButton type='submit'>Order</PrimaryButton>
        </>
      )}
    </form>
  );
};

export default AddressForm;

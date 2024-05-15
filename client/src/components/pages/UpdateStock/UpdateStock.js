import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './UpdateStock.module.scss';
import { getAllSizes } from '../../../redux/reducers/size';
import { getProducts, updateProduct } from '../../../redux/reducers/products';
import PrimaryButton from '../../common/buttons/PrimaryButton/PrimaryButton';
import { API_URL } from '../../../config';

const UpdateStock = () => {
  const dispatch = useDispatch();
  const sizes = useSelector(state => getAllSizes(state));
  const products = useSelector(state => getProducts(state));
  const [product, setProduct] = useState('');
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [status, setStatus] = useState('');

  const handleSubmit = () => {
    setStatus('loading');

    const url = `${API_URL}/products/stock`;
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId: product,
        sizeId: size,
        stock: quantity,
      }),
    };

    if (process.env.NODE_ENV === 'production') {
      options.credentials = 'include';
    }

    fetch(url, options)
      .then(res => {
        if (res.status !== 200) throw new Error('Error updating stock');
        return res.json();
      })
      .then(data => {
        setStatus('success');
        dispatch(updateProduct(data.product));
      })
      .catch(e => setStatus('error'));
  };

  return (
    <div className={styles.form}>
      <h1>Update stock</h1>
      {status === 'loading' && (
        <div className={styles.loading}>
          <img src={`${process.env.PUBLIC_URL}/images/spinner.svg`} alt='loading' />
        </div>
      )}
      {status === 'success' && <div className={styles.success}>Stock updated successfully</div>}
      {status === 'error' && (
        <div className={styles.error}>Something goes wrong, check fields...</div>
      )}
      <div className={styles.content}>
        <label htmlFor='product'>Product</label>
        <select id='product' onChange={e => setProduct(e.target.value)}>
          <option value=''>Select a product</option>
          {products.map(product => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
        <label htmlFor='size'>Size</label>
        <select id='size' onChange={e => setSize(e.target.value)}>
          <option value=''>Select a size</option>
          {sizes.map(size => (
            <option key={size.id} value={size.id}>
              {size.name}
            </option>
          ))}
        </select>
        <label htmlFor='quantity'>Quantity</label>
        <input
          type='number'
          id='quantity'
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
        />
        <PrimaryButton onClick={handleSubmit}>Update</PrimaryButton>
      </div>
    </div>
  );
};

export default UpdateStock;

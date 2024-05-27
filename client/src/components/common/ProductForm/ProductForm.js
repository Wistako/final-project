import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styles from './ProductForm.module.scss';
import { API_URL } from '../../../config';
import { addProduct, deleteProduct, updateProduct } from '../../../redux/reducers/products';
import PrimaryButton from '../buttons/PrimaryButton/PrimaryButton';
import SecondaryButton from '../buttons/SecondaryButton/SecondaryButton';
import { getUser } from '../../../redux/reducers/user';
import { getAllCategories } from '../../../redux/reducers/category';

const ProductForm = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(state => getUser(state));
  const cateogries = useSelector(state => getAllCategories(state));
  const [newName, setName] = useState(product ? product.name : '');
  const [newPrice, setPrice] = useState(product ? product.price : '');
  const [newCategory, setCategory] = useState(product ? product.category : '');
  const [newDescription, setDescription] = useState(product ? product.description : '');
  const [status, setStatus] = useState('');
  const [newImage, setImage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const priceChange = e => {
    const { value } = e.target;
    if (value.match(/^\d{1,}(\.\d{0,2})?$/) || value === '') {
      setPrice(value);
    }
  };

  const onSubmit = () => {
    setStatus('loading');

    const fd = new FormData();
    fd.append('name', newName);
    fd.append('price', newPrice);
    fd.append('categoryId', newCategory);
    fd.append('description', newDescription);
    if (!product) fd.append('image', newImage);

    const id = product ? product.id : null;
    const options = {
      body: fd,
    };

    if (process.env.NODE_ENV === 'production') {
      options.credentials = 'include';
    }
    const url = `${API_URL}/products${id ? `/${id}` : ''}`;

    if (id) {
      options.method = 'PUT';
    } else {
      options.method = 'POST';
    }

    fetch(url, options)
      .then(res => {
        if (res.status === 201 || res.status === 200) {
          setStatus('success');
          if (product) {
            navigate(`/product/${product.id}`);
          }
          setName('');
          setPrice('');
          setCategory('');
          setImage('');
        } else if (res.status === 400) {
          setStatus('clientError');
        } else {
          setStatus('serverError');
        }
        return res.json();
      })
      .then(res => {
        setCategory('');
        setDescription('');
        setName('');
        setPrice('');
        setImage('');

        if (status === 'success')
          product ? dispatch(updateProduct(res.product)) : dispatch(addProduct(res));
      })
      .catch(() => {
        setStatus('serverError');
      });
  };

  const hanldeDelete = () => {
    setStatus('loading');

    const options = {
      method: 'DELETE',
    };

    if (process.env.NODE_ENV === 'production') {
      options.credentials = 'include';
    }

    try {
      fetch(`${API_URL}/products/${product.id}`, options).then(res => {
        if (res.status === 200) {
          dispatch(deleteProduct(product.id));
          setStatus('');
          navigate('/');
        }
      });
    } catch (err) {
      setStatus('serverError');
    }
  };

  if (!user || user.role !== 'ADMIN') {
    return (
      <div className={styles.error}>
        <p>Only admin can add or edit products</p>
      </div>
    );
  }

  if (status === 'loading')
    return (
      <div className={styles.form}>
        <div className={styles.loading}>
          <img src={`${process.env.PUBLIC_URL}/images/spinner.svg`} alt='loading' />
        </div>
      </div>
    );

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      {status === 'success' && (
        <div className={styles.success}>
          <p>Success</p>
        </div>
      )}
      {status === 'clientError' && (
        <div className={styles.error}>
          <p>Invalid data, check the fields. </p>
        </div>
      )}
      {status === 'serverError' && (
        <div className={styles.error}>
          <p>
            Oh, something got wrong, <br /> please try again later.
          </p>
        </div>
      )}
      <h2>{product ? 'Edit product' : 'New product'}</h2>
      <label>
        Name
        <input
          {...register('name', {
            required: { value: true, message: 'Name is required' },
            minLength: { value: 3, message: 'Minimum character count 3' },
            maxLength: { value: 30, message: 'Maximum character count 30 ' },
          })}
          type='text'
          value={newName}
          onChange={e => setName(e.target.value)}
        />
        {errors.name && <p className={styles.msgError}>{errors.name.message}</p>}
      </label>
      <label>
        Price
        <input
          {...register('price', {
            required: true,
            valueAsNumber: {
              value: true,
              message: 'Price is required and must be a number',
            },
          })}
          type='text'
          value={newPrice}
          onChange={priceChange}
        />
      </label>
      <label>
        Category
        <select
          {...register('category', { required: true })}
          value={newCategory}
          onChange={e => setCategory(e.target.value)}
        >
          <option value=''>Select category</option>
          {cateogries &&
            cateogries.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
        </select>
      </label>
      <label>
        Description
        <textarea value={newDescription} onChange={e => setDescription(e.target.value)} />
      </label>
      {!product && (
        <label>
          Image
          <input type='file' onChange={e => setImage(e.target.files[0])} />
        </label>
      )}
      <div className={styles.btns}>
        {product && <SecondaryButton onClick={() => hanldeDelete}>Delete</SecondaryButton>}
        <PrimaryButton type='submit'>{product ? 'Edit' : 'Add'}</PrimaryButton>
      </div>
    </form>
  );
};

export default ProductForm;

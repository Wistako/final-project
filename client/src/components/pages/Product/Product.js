import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styles from './Product.module.scss';
import { getProductById, fetchProducts, getStockBySize } from '../../../redux/reducers/products';
import { API_URL, IMGS_URL } from '../../../config';
import AmountWidget from '../../common/AmountWidget/AmountWidget';
import { getUser } from '../../../redux/reducers/user';
import PrimaryButton from '../../common/buttons/PrimaryButton/PrimaryButton';
import { addToCart } from '../../../redux/reducers/cart';
import Modal from '../../common/Modal/Modal';

const Product = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();
  const product = useSelector(state => getProductById(state, id));
  const user = useSelector(state => getUser(state));
  const [currentSize, setCurrentSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState('idle');
  const [activeImage, setActiveImage] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [file, setFile] = useState(null);
  const stock = useSelector(state => getStockBySize(state, id, currentSize));

  useEffect(() => {
    if (product && product.sizes.length > 0) {
      setCurrentSize(product.sizes[0].id);
    }

    if (!product) {
      setStatus('loading');
      setTimeout(() => {
        if (!product) setStatus('error');
      }, 10000);
    }
    return () => {
      setCurrentSize(null);
      setQuantity(1);
      setStatus('idle');
    };
  }, [product]);

  useEffect(() => {
    setTimeout(() => {
      setStatus('idle');
    }, 4000);
  }, [status]);

  useEffect(() => {
    setQuantity(1);
  }, [currentSize]);

  const changeQuantity = value => {
    let parsedValue = parseInt(value, 10);
    if (parsedValue < 1 || parsedValue > stock) return;
    parsedValue = parseInt(value, 10);
    setQuantity(parsedValue);
    if (value === '') setQuantity(0);
  };

  const handleAddToCart = () => {
    if (!currentSize) return;
    dispatch(addToCart({ product, quantity, size: sizes.find(s => s.id === currentSize) }));
    setStatus('added');
  };

  const handleAddPhoto = async e => {
    e.preventDefault();
    setStatus('loading');

    const fd = new FormData();
    fd.append('image', file);

    const options = {
      method: 'POST',
      body: fd,
    };

    if (process.env.NODE_ENV === 'production') {
      options.credentials = 'include';
    }
    const url = `${API_URL}/images/${id}`;

    await fetch(url, options);
    setModalOpen(false);
    dispatch(fetchProducts());
  };

  const handleDeletePhoto = async () => {
    setStatus('loading');
    if (images.length === 1) return;
    const options = {
      method: 'DELETE',
    };

    if (process.env.NODE_ENV === 'production') {
      options.credentials = 'include';
    }
    const url = `${API_URL}/images/${images[activeImage].id}`;

    await fetch(url, options);
    setActiveImage(0);
    dispatch(fetchProducts());
  };

  if (status === 'error')
    return (
      <div className={styles.info}>
        <p>Product not found or an error occurred</p>
        <Link to='/'>Go back</Link>
      </div>
    );

  if (status === 'loading')
    return (
      <div className={styles.info}>
        <img src={`${process.env.PUBLIC_URL}/images/spinner.svg`} alt='loading' />
      </div>
    );

  if (!product) return null;

  const { name, images, price, sizes, description } = product;
  return (
    <section className={styles.root}>
      {user && user.role === 'ADMIN' && (
        <div className={styles.adminPanel}>
          <PrimaryButton onClick={() => navigate(`/product/edit/${id}`)}>
            Edit product
          </PrimaryButton>
          <PrimaryButton onClick={() => setModalOpen(true)}>Add photo</PrimaryButton>
        </div>
      )}
      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <form className={styles.form} onSubmit={handleAddPhoto}>
            <label>
              <input type='file' onChange={e => setFile(e.target.files[0])} />
            </label>
            <PrimaryButton type='submit' className={styles.btns}>
              Upload
            </PrimaryButton>
          </form>
        </Modal>
      )}
      <div className={styles.flexRow}>
        <div className={styles.images}>
          {user && user.role === 'ADMIN' && (
            <button type='button' className={styles.delete} onClick={handleDeletePhoto}>
              X
            </button>
          )}
          <img className={styles.image} src={IMGS_URL + images[activeImage].name} alt={name} />
          <div className={styles.thumbs}>
            {images.map((img, index) => (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
              <img
                key={img.id}
                className={`${styles.thumb} ${activeImage === index ? styles.active : ''}`}
                src={IMGS_URL + img.name}
                alt={name}
                onClick={() => setActiveImage(index)}
              />
            ))}
          </div>
        </div>
        <div className={styles.content}>
          <h3>{name}</h3>
          <h2>${price.toString().replace('.', ',')} USD</h2>
          <p>{description}</p>
          <div className={styles.sizesBox}>
            <span>Select size: </span>
            {sizes.map(size => {
              if (size.stock === 0) return null;
              return (
                <button
                  key={size.id}
                  className={`${styles.size} ${currentSize === size.id ? styles.active : ''}`}
                  onClick={() => setCurrentSize(size.id)}
                  type='button'
                >
                  <p>{size.size.name}</p>
                  {user && user.role === 'ADMIN' && <p>{size.stock}</p>}
                </button>
              );
            })}
          </div>
          <div className={styles.amountWidget}>
            <AmountWidget
              value={quantity}
              onChange={value => changeQuantity(value)}
              disabled={!currentSize}
            />
            <span>${(price * quantity).toString().replace('.', ',')} </span>
          </div>
          <div className={styles.buttons}>
            <PrimaryButton
              onClick={handleAddToCart}
              className={status === 'idle' ? '' : styles.added}
            >
              {status === 'idle' ? 'Add to cart' : 'Added'}
            </PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;

// <>
//   <button className={styles.btn} type='button'>
//     Update stock
//   </button>
//   <button
//     className={styles.btn}
//     type='button'
//     onClick={() => navigate(`/product/edit/${id}`)}
//   >
//     Edit product
//   </button>
// </>

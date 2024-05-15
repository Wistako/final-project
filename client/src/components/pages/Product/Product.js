import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styles from './Product.module.scss';
import { getProductById } from '../../../redux/reducers/products';
import { IMGS_URL } from '../../../config';
import AmountWidget from '../../common/AmountWidget/AmountWidget';
import { getUser } from '../../../redux/reducers/user';
import PrimaryButton from '../../common/buttons/PrimaryButton/PrimaryButton';
import { addToCart } from '../../../redux/reducers/cart';

const Product = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();
  const product = useSelector(state => getProductById(state, id));
  const user = useSelector(state => getUser(state));
  const [currentSize, setCurrentSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    return () => {
      setCurrentSize(null);
      setQuantity(1);
      setStatus('idle');
    };
  }, [id]);

  const changeQuantity = value => {
    const parsedValue = parseInt(value, 10);
    if (parsedValue < 1 || parsedValue > 20) return;
    setQuantity(value);
  };
  const handleAddToCart = () => {
    if (!currentSize) return;
    dispatch(addToCart({ product, quantity, size: sizes.find(s => s.id === currentSize) }));
    setStatus('added');
  };

  if (!product)
    return (
      <div className={styles.info}>
        <p>Product not found or an error occurred</p>
        <Link to='/'>Go back</Link>
      </div>
    );

  const { name, image, price, sizes, description } = product;
  return (
    <section className={styles.root}>
      {user && user.role === 'ADMIN' && (
        <div className={styles.adminPanel}>
          <PrimaryButton onClick={() => navigate(`/product/edit/${id}`)}>
            Edit product
          </PrimaryButton>
        </div>
      )}
      <div className={styles.flexRow}>
        <img className={styles.image} src={IMGS_URL + image} alt={name} />
        <div className={styles.content}>
          <h3>{name}</h3>
          <h2>${price.toString().replace('.', ',')} USD</h2>
          <p>{description}</p>
          <div className={styles.sizesBox}>
            <span>Select size: </span>
            {sizes.map(size => {
              if (size.stock === 0) return null;
              return (
                <>
                  <button
                    key={size.id}
                    className={`${styles.size} ${currentSize === size.id ? styles.active : ''}`}
                    onClick={() => setCurrentSize(size.id)}
                    type='button'
                  >
                    <p>{size.size.name}</p>
                  </button>
                  {user && user.role === 'ADMIN' && <p>{size.stock}</p>}
                </>
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
            <PrimaryButton onClick={handleAddToCart}>
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

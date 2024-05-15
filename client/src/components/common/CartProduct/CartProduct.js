import { useDispatch } from 'react-redux';
import styles from './CartProduct.module.scss';
import { IMGS_URL } from '../../../config';
import AmountWidget from '../AmountWidget/AmountWidget';
import PrimaryButton from '../buttons/PrimaryButton/PrimaryButton';
import { changeDescription, changeQuantity, removeFromCart } from '../../../redux/reducers/cart';

const CartProduct = ({ product, quantity, size, id, description }) => {
  const dispatch = useDispatch();
  const price = product.price * quantity;

  const handleChange = value => {
    if ((value < 1 || value > 20) && value !== '') return;
    dispatch(changeQuantity({ id, quantity: parseInt(value, 10) }));
  };

  return (
    <div key={id} className={styles.wrapper}>
      <div className={styles.item}>
        <img src={`${IMGS_URL}${product.image}`} alt={product.name} />
        <p>{product.name}</p>
        <p>{size.size.name}</p>
        <p>${isNaN(price) ? '0' : price}</p>
      </div>
      <div className={styles.item}>
        <textarea
          id='description'
          value={description}
          onChange={e => dispatch(changeDescription({ id, description: e.target.value }))}
        />
        <div>
          <AmountWidget onChange={handleChange} value={quantity} />
          <PrimaryButton className={styles.remove} onClick={() => dispatch(removeFromCart({ id }))}>
            <img src='/images/trash.svg' alt='Remove from cart' />
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;

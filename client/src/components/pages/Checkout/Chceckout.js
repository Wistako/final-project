import { useSelector } from 'react-redux';
import styles from './Chceckout.module.scss';
import { getCart } from '../../../redux/reducers/cart';
import { DELIVERY_PRICE } from '../../../config';
import AddressForm from '../../common/AddressForm/AddressForm';

const Checkout = () => {
  const cart = useSelector(state => getCart(state));

  const totalPrice = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  return (
    <div className={styles.root}>
      <section>
        <div className={styles.form}>
          <AddressForm />
        </div>
        {cart.length > 0 && (
          <div className={styles.summary}>
            <h2>Summary</h2>
            <p>Total price: ${isNaN(totalPrice) ? '0' : totalPrice}</p>
            <p>Shipping: ${DELIVERY_PRICE}</p>
            <p>Total: ${isNaN(totalPrice) ? '0' : totalPrice + DELIVERY_PRICE}</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Checkout;

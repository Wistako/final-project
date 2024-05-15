import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './Cart.module.scss';
import { getCart } from '../../../redux/reducers/cart';

import PrimaryButton from '../../common/buttons/PrimaryButton/PrimaryButton';

import CartProduct from '../../common/CartProduct/CartProduct';

const Cart = () => {
  const navigate = useNavigate();

  const cart = useSelector(state => getCart(state));

  const totalPrice = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }, [cart]);

  const handleCheckout = () => {
    let isCorrect = true;
    cart.forEach(item => {
      if (
        !item.size ||
        isNaN(item.quantity) ||
        item.quantity % 1 !== 0 ||
        item.quantity < 1 ||
        item.quantity > 20
      ) {
        isCorrect = false;
      }
    });
    if (!isCorrect) return;
    navigate('/cart/checkout');
  };

  return (
    <div className={styles.root}>
      <h1 className={styles.title}>Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className={styles.cart}>
          {cart.map(item => (
            <CartProduct key={item.id} {...item} />
          ))}

          <div className={styles.summary}>
            <h2>Summary</h2>
            <p>Total price: ${isNaN(totalPrice) ? '0' : totalPrice}</p>
            <PrimaryButton onClick={handleCheckout}>Checkout</PrimaryButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

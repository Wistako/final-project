import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Orders.module.scss';
import { getUser } from '../../../redux/reducers/user';
import { fetchOrders, getOrders } from '../../../redux/reducers/orders';
import Order from '../../common/Order/Order';

const Orders = () => {
  const dispatch = useDispatch();

  const user = useSelector(state => getUser(state));
  const orders = useSelector(state => getOrders(state));

  useEffect(() => {
    dispatch(fetchOrders(user.role));
  }, []);

  if (!user) return <Navigate to='/' />;

  return (
    <div className={styles.root}>
      <h2 className={styles.title}>Orders</h2>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            <Order order={order} role={user.role} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;

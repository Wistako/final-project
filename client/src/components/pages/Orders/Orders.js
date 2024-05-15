import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './Orders.module.scss';
import { getUser } from '../../../redux/reducers/user';
import { getOrders } from '../../../redux/reducers/orders';
import Order from '../../common/Order/Order';

const Orders = () => {
  const user = useSelector(state => getUser(state));
  const orders = useSelector(state => getOrders(state));

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

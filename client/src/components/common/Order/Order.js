import { useDispatch } from 'react-redux';
import { useState } from 'react';
import styles from './Order.module.scss';
import { changeStatus } from '../../../redux/reducers/orders';

const Order = ({ order, role }) => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState(order.status);

  const updateStatus = () => {
    const { id } = order;
    dispatch(changeStatus(id, status));
  };

  return (
    <div className={styles.order}>
      <h3 className={styles.title}>
        Zamówienie: {order.id} - Status:
        <span>
          {order.status}
          {role === 'ADMIN' && (
            <span>
              <select value={status} onChange={e => setStatus(e.target.value)}>
                <option value='PENDING'>PENDING</option>
                <option value='PROCESSING'>PROCESSING</option>
                <option value='DELIVERED'>DELIVERED</option>
                <option value='SHIPPED'>SHIPPED</option>
              </select>
              <button type='button' onClick={updateStatus}>
                Update
              </button>
            </span>
          )}
        </span>
      </h3>
      <div className={styles.info}>
        <p>Email: {order.email}</p>
        <p>Address: {order.address}</p>
        <p>City: {order.city}</p>
        <p>Zip code: {order.zipCsode}</p>
        <p>Phone: {order.phone}</p>
      </div>
      <p>Items:</p>
      <ul className={styles.products}>
        {order &&
          order.items.map(item => (
            <li key={item.id} className={styles.product}>
              <p>
                {item.product.name} {item.size.name}
              </p>
              <p>Price: ${item.product.price}</p>
              <p>Quantity: {item.quantity}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Order;

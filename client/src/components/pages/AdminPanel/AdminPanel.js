import { useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import styles from './AdminPanel.module.scss';
import { getUser } from '../../../redux/reducers/user';

const AdminPanel = () => {
  const user = useSelector(state => getUser(state));

  if (!user || user.role !== 'ADMIN') return <Navigate to='/' />;

  return (
    <div className={styles.root}>
      <h2>Admin Panel</h2>
      <div className={styles.links}>
        <Link to='/admin/product/new'>New Product</Link>
        <Link to='/admin/product/stock'>Update Stock</Link>
        <Link to='/orders'>Orders</Link>
      </div>
    </div>
  );
};

export default AdminPanel;

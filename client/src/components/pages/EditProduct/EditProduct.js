import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './EditProduct.module.scss';
import ProductForm from '../../common/ProductForm/ProductForm';
import { getProductById } from '../../../redux/reducers/products';

const EditProduct = () => {
  const { id } = useParams();
  const product = useSelector(state => getProductById(state, id));

  return <div className={styles.root}>{product && <ProductForm product={product} />}</div>;
};

export default EditProduct;

import { useSelector } from 'react-redux';
import styles from './CategoryBar.module.scss';
import { getProducts } from '../../../redux/reducers/products';
import ProductCard from '../../common/ProductCard/ProductCard';
import sortArrayByProperty from '../../../utils/sortArrayByProperty';

const CategoryBar = () => {
  const products = useSelector(state => getProducts(state));
  const categories = sortArrayByProperty(products, 'categoryId');
  return (
    <div>
      {categories.map(prod => (
        <div key={prod[0].category.id}>
          <h2 className={styles.title}>{prod[0].category.name}</h2>
          <ul className={styles.prodList}>
            {prod.map(product => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default CategoryBar;

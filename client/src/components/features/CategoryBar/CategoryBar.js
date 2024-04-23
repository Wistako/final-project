import { useSelector } from 'react-redux';
import { getProducts } from '../../../redux/reducers/products';
import ProductCard from '../../common/ProductCard/ProductCard';
import sortArrayByProperty from '../../../utils/sortArrayByProperty';

const CategoryBar = () => {
  const products = useSelector(state => getProducts(state));
  const categories = sortArrayByProperty(products, 'category');
  return (
    <div>
      {categories.map(prod => (
        <div key={prod[0].category}>
          <h2>{prod[0].category}</h2>
          <ul>
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

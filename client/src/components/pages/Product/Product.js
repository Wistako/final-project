import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductById, getRequest } from '../../../redux/reducers/products';
import { IMGS_URL } from '../../../config';

const Product = () => {
  const { id } = useParams();
  const product = useSelector(state => getProductById(state, id));
  const request = useSelector(state => getRequest(state));

  if (request.pending) {
    return (
      <div>
        <img src={`${process.env.PUBLIC_URL}/images/spinner.svg`} alt='loading' />
      </div>
    );
  }
  if (!product)
    return (
      <div>
        <p>Product not found or an error occurred</p>
      </div>
    );

  const { name, category, image, price, sizes } = product;
  return (
    <section>
      <h2>{name}</h2>
      <h3>{category}</h3>
      <img src={IMGS_URL + image} alt={name} />
      <p>{price}</p>
      <div>
        {sizes.map(size => (
          <div key={size.size}>
            <p>{size.size}</p>
            <p>{size.stock}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Product;

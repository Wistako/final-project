import { IMGS_URL } from '../../../config';

const ProductCard = ({ product }) => {
  const { name, price, image } = product;
  return (
    <div>
      <img src={IMGS_URL + image} alt={name} />
      <div>
        <h3>{name}</h3>
        <p>
          Price: <strong>${price}</strong>
        </p>
      </div>
    </div>
  );
};

export default ProductCard;

import { useNavigate } from 'react-router-dom';
import { IMGS_URL } from '../../../config';
import styles from './ProductCard.module.scss';
import PrimaryButton from '../buttons/PrimaryButton/PrimaryButton';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { id, name, price, images } = product;

  return (
    <div className={styles.wrapper}>
      <img className={styles.image} src={IMGS_URL + images[0].name} alt={name} />
      <div className={styles.description}>
        <div>
          <h3 className={styles.title}>{name}</h3>
          <p>
            Price: <strong>${price}</strong>
          </p>
        </div>
        <div className={styles.buttons}>
          {/* <button className={styles.button} type='button' onClick={addToCart}>
            Add to cart
          </button> */}
          <PrimaryButton onClick={() => navigate(`/product/${id}`)}> View details</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

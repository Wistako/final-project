/* eslint-disable react/button-has-type */
import styles from './SecondaryButton.module.scss';

const SecondaryButton = ({ children, onClick, type = 'button' }) => (
  <button className={styles.root} onClick={onClick} type={type}>
    {children}
  </button>
);

export default SecondaryButton;

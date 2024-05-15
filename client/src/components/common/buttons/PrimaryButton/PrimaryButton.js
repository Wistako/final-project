/* eslint-disable react/button-has-type */
import styles from './PrimaryButton.module.scss';

const PrimaryButton = ({ children, onClick, type = 'button', className }) => (
  <button className={`${styles.root} ${className || ''}`} onClick={onClick} type={type}>
    {children}
  </button>
);

export default PrimaryButton;

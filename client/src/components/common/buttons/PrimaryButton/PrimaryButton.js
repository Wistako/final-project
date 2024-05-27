/* eslint-disable react/button-has-type */
import styles from './PrimaryButton.module.scss';

const PrimaryButton = ({ children, onClick, type = 'button', className }) => (
  <>
    {type === 'submit' && (
      <button className={`${styles.root} ${className || ''}`} type={type}>
        {children}
      </button>
    )}
    {type !== 'submit' && (
      <button className={`${styles.root} ${className || ''}`} onClick={onClick} type={type}>
        {children}
      </button>
    )}
  </>
);
export default PrimaryButton;

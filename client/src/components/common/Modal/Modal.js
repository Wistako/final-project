import styles from './Modal.module.scss';
import PrimaryButton from '../buttons/PrimaryButton/PrimaryButton';

const Modal = ({ children, onClose }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        {children}
        <PrimaryButton onClick={onClose} className={styles.close}>
          X
        </PrimaryButton>
      </div>
    </div>
  );
};

export default Modal;

import styles from './Modal.module.scss';
import PrimaryButton from '../buttons/PrimaryButton/PrimaryButton';

const Modal = ({ children, setModal }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        {children}
        <PrimaryButton onClick={() => setModal(false)}>Close</PrimaryButton>
      </div>
    </div>
  );
};

export default Modal;

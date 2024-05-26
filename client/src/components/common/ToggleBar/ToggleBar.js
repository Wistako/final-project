/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import styles from './ToggleBar.module.scss';

const ToggleBar = ({ children }) => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <div className={styles.toggleWrapper}>
      <div
        className={`${styles.toggleContainer} ${isToggled ? styles.toggled : ''}`}
        onClick={handleToggle}
      >
        <div className={styles.toggleCircle} />
      </div>
      <div className={`${styles.navigation} ${isToggled ? styles.show : styles.hide}`}>
        {children}
      </div>
    </div>
  );
};

export default ToggleBar;

import styles from './AmountWidget.module.scss';

const AmountWidget = ({ value, onChange, vertical, disabled }) => {
  return (
    <div
      className={`${styles.widget} ${vertical ? styles.vertical : ''} ${disabled ? styles.disabled : ''}`}
    >
      <button
        type='button'
        onClick={() => (value - 1 > 0 ? onChange(value - 1) : null)}
        disabled={disabled}
      >
        -
      </button>
      <input type='number' value={value} onChange={e => onChange(e.target.value)} />
      <button type='button' onClick={() => onChange(value + 1)} disabled={disabled}>
        +
      </button>
    </div>
  );
};

export default AmountWidget;

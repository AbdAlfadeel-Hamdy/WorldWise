import styles from './Button.module.css';

type ButtonProps = {
  children: React.ReactNode;
  type: 'primary' | 'back' | 'position';
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
};

const Button: React.FC<ButtonProps> = ({ children, type, onClick }) => {
  return (
    <button className={`${styles.btn} ${styles[type]}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;

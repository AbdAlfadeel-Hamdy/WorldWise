import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks';
import styles from './User.module.css';

const User = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const handleClick = () => {
    logout();
    navigate('/');
  };

  return (
    <div className={styles.user}>
      <img src={user.avatar} alt={user.name} />
      <span>Welcome, {user.name}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
};

export default User;

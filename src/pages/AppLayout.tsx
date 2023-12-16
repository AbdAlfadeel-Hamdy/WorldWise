import { Map, Sidebar, User } from '../components/';
import styles from './AppLayout.module.css';

const AppLayout = () => {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      <User />
    </div>
  );
};

export default AppLayout;

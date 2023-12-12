import CityItem from './CityItem';
import Spinner from './Spinner';
import Message from './Message';
import { CityType } from '../types';
import styles from './CityList.module.css';

type CityListProps = {
  cities: CityType[];
  isLoading: boolean;
};

const CityList: React.FC<CityListProps> = ({ cities, isLoading }) => {
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message='Add your first city by clicking on a city on the map' />
    );
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
};

export default CityList;

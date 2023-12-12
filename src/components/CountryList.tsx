import { CityType, Country } from '../types';
import CountryItem from './CountryItem';
import styles from './CountryList.module.css';

type CountryListProps = {
  cities: CityType[];
};

const CountryList: React.FC<CountryListProps> = ({ cities }) => {
  const filterObj = {} as { [key: string]: number };
  const countries: Country[] = cities.filter((city) => {
    filterObj[city.country] = filterObj[city.country]
      ? filterObj[city.country] + 1
      : 1;
    return filterObj[city.country] > 1
      ? null
      : { country: city.country, emoji: city.emoji };
  });
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem key={country.country} country={country} />
      ))}
    </ul>
  );
};

export default CountryList;

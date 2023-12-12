import axios from 'axios';

const customFetch = axios.create({
  baseURL: 'https://codingheroes.io/api-react-course-projects',
});

export default customFetch;

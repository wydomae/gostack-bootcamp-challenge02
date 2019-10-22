import axios from 'axios';
import { HOSTNAME } from 'react-native-dotenv';

const api = axios.create({
  baseURL: `http://${HOSTNAME}:3333`,
});

export default api;

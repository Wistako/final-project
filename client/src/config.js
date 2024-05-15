export const API_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8000/api';
export const IMGS_URL =
  process.env.NODE_ENV === 'production' ? '/api/images' : 'http://localhost:8000/api/images/';

export const DELIVERY_PRICE = 10;

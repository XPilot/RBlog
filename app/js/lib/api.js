import fetch from 'isomorphic-fetch';
import { API_URL } from '../constants/constants';

export function fetchPosts() {
  return fetch(API_URL);
}

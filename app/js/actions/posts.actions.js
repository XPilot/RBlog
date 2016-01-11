import { POSTS } from '../constants/constants';

export function get(url) {
  return {
    type: POSTS.GET,
  }
}

export default {
  get,
}

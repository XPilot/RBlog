import fetch from 'isomorphic-fetch'

import { POSTS } from '../constants/constants';

export default function postsReducer(state = [], action) {
  switch (action.type) {
  case POSTS.GET:
    return [1,2,3]
  default:
    return state;
  }
}

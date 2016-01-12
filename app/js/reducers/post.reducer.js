import fetch from 'isomorphic-fetch'

import { POSTS } from '../constants/constants';

const initialState = null;

export default function postsReducer(state = initialState, action) {
  switch (action.type) {

  case POSTS.GET_SINGLE: {
    return Object.assign({}, state, action.payload);
  }

  default:
    return state;
  }
}

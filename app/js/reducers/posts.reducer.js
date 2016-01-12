import fetch from 'isomorphic-fetch'

import { POSTS } from '../constants/constants';

const initialState = []

export default function postsReducer(state = initialState, action) {
  switch (action.type) {

  case POSTS.GET:
    return action.payload;
    
  default:
    return state;
  }
}

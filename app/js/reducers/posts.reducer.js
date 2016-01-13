import fetch from 'isomorphic-fetch'

import { POSTS } from '../constants/constants';

const initialState = [];

export default function postsReducer(state = initialState, action) {
  switch (action.type) {

  case POSTS.GET:
    return action.payload;

  case POSTS.EDIT: {
    let newState = state.slice();
    newState = newState.map((item) => {
      if (item.id === action.payload) {
        item.mode = 'edit';
      }
      return item;
    });
    return newState;
  }

  default:
    return state;
  }
}

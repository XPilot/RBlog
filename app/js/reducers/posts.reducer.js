import fetch from 'isomorphic-fetch'

import { POSTS } from '../constants/constants';

const initialState = [];

export default function postsReducer(state = initialState, action) {
  switch (action.type) {

  case POSTS.GET:
    return action.payload;

  case POSTS.ADD:
    let newState = state.slice();

    // remove any previous started add operations
    newState = newState.filter((item) => {
      return item.mode !== 'add';
    });

    // define this as the cancel trigger
    if(action.payload && !Object.keys(action.payload).length) {
      return newState;
    }
    
    newState.push(action.payload || {
      id: `GenericPostId_${Date.now()}`,
      mode: 'add',
      title: '',
      lead: '',
      body: '',
    });
    // add a nice clean empty post template

    return newState;

  case POSTS.EDIT: {
    let newState = state.slice();

    newState = newState.map((item) => {
      if (item.id === action.payload.id) {
        item.mode = !item.mode ? 'edit' : null;
        item = action.payload.postContents ? action.payload.postContents : item;
      }

      return item;
    });

    return newState;
  }

  default:
    return state;
  }
}

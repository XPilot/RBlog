import { combineReducers } from 'redux'
import postsReducer from './posts.reducer';
import postReducer from './post.reducer';

const rootReducer = combineReducers({
  "posts": postsReducer,
  "post": postReducer,
})

export default rootReducer;

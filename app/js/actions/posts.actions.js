import { POSTS } from '../constants/constants';
import { fetchPosts } from '../lib/api';
import { find } from 'lodash';

function get(posts) {
  return {
    type: POSTS.GET,
    payload: posts,
  };
}

function getSinglePost(post) {
  return {
    type: POSTS.GET_SINGLE,
    payload: post,
  }
}

function getAPIPosts() {
  return dispatch => {

    // two promisses happen here:
    // first one handles request
    // second one handles the data

    fetchPosts()
      .then(response => response.json())
      .then(
        data => {
          dispatch(get(data));
      });
  }
}

function fetchSinglePost(postId) {
  return (dispatch, getState) => {
    const {posts} = getState();

      if(!posts || !posts.length) {
        console.log('Page has no posts in store! Will get post from server, hopefully...')
        return null;
        // perform async operation to get data from server (TODO)
      }

      const foundPost = find(posts, {"id": postId});
      dispatch(getSinglePost(foundPost));
  }
}

export default {
  get,
  getAPIPosts,
  fetchSinglePost,
}

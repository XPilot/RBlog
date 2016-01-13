import { POSTS } from '../constants/constants';
import { fetchPosts, fetchPost, editPost, deletePost } from '../lib/api';
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

// async actions
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
        // perform async operation to get data from server (TODO)
        fetchPost(postId)
          .then(response => response.json())
          .then((data) => {
            dispatch(getSinglePost(data));
          });
      }

      const foundPost = find(posts, {"id": postId});
      dispatch(getSinglePost(foundPost));
  }
}

function editPostAction(postId) {
  return {
    type: POSTS.EDIT,
    payload: postId,
  }
}

function deletePostAction(postId) {
  return (dispatch) => {
    deletePost(postId)
      .then(response => response.json())
      .then((data) => {
        dispatch(get(data));
      })
  }
}

export default {
  getAPIPosts,
  fetchSinglePost,
  editPostAction,
  deletePostAction,
}

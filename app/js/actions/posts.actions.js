import { POSTS } from '../constants/constants';
import {
  fetchPosts,
  fetchPost,
  createPost,
  updatePost,
  deletePost
} from '../lib/api';
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

function addPostAction(postContent) {
  return {
    type: POSTS.ADD,
    payload: postContent,
  }
}

function editPostAction(postId, postContent) {
  console.log(postId, postContent);

  return {
    type: POSTS.EDIT,
    payload: {
      id: postId,
      postContents: postContent || null,
    },
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

function createPostAction(post) {
  return dispatch => {
    createPost(post)
      .then(response => response.json())
      .then((data) => {
        if(data === null) {
          // handle errors at a later time
        } else {
          dispatch(addPostAction(data));
        }
      });
  };
}

function updatePostAction(post) {
  return dispatch => {
    updatePost(post)
      .then(response => response.json())
      .then((data) => {
        if(data === null) {
          // handle errors at a later time
        } else {
          dispatch(editPostAction(data.id, data));
        }
      });
  };
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
  addPostAction,
  editPostAction,
  createPostAction,
  updatePostAction,
  deletePostAction,
}

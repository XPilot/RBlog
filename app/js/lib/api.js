import fetch from 'isomorphic-fetch';
import { API_URL } from '../constants/constants';

export function fetchPosts() {
  return fetch(API_URL);
}

export function fetchPost(postId) {
  return fetch(`${API_URL}post/${postId}`);
}

export function createPost(post) {
  return fetch(`${API_URL}post/`, {
    method: 'post',
    mode: 'cors',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(post),
  });
}

export function updatePost(post) {
  return fetch(`${API_URL}post/`, {
    method: 'put',
    mode: 'cors',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(post),
  });
}

export function deletePost(postId) {
  return fetch(`${API_URL}delete/${postId}`, {
    method: 'delete',
  });
}

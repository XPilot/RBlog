import fetch from 'isomorphic-fetch';
import { API_URL } from '../constants/constants';

export function fetchPosts() {
  return fetch(API_URL);
}

export function fetchPost(postId) {
  return fetch(`${API_URL}post/${postId}`);
}

export function editPost(postId) {
}

export function deletePost(postId) {
  return fetch(`${API_URL}delete/${postId}`, {
    method: 'delete',
  });
}

import fetch from 'isomorphic-fetch';
import { getToken } from './auth';

export const API_URL = 'http://localhost:3000/api';

export default async (endpoint, method = 'get', body, token = false) => {
  let headers = { 'content-type': 'application/json' };
  if (token) {
    headers = {
      ...headers,
      'Authorization': getToken()
    };
  }

  return fetch(`${API_URL}/${endpoint}`, {
    headers,
    method,
    body: JSON.stringify(body),
  })
  .then(response => response.json().then(json => ({ json, response })))
  .then(({ json, response }) => {
    if (!response.ok) {
      return Promise.reject(json);
    }

    return json;
  })
  .then(
    response => response,
    error => error
  );
}

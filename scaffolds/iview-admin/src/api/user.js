import request from './base';

export function login(params) {
  return request.post('/api/user/login', params);
}

export function getInfo(params) {
  return request.get('/api/user/info', { params });
}

export function logout() {
  return request.post('/api/user/logout');
}

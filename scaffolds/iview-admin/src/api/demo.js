import request from './base';

export function getDemoList(params) {
  return request.get('/api/demo/list', { params });
}
export function getDemo(params) {
  return request.get('/api/demo/info', { params });
}
export function addDemo(params) {
  return request.post('/api/demo/add', params);
}
export function updateDemo(params) {
  return request.post('/api/demo/update', params);
}
export function deleteDemo(params) {
  return request.delete('/api/demo/delete', { params });
}

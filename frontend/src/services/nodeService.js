import { fetchApi } from './api';

export const getNodes = async () => {
  return fetchApi('/api/nodes');
};

export const getNodeById = async (id) => {
  return fetchApi(`/api/nodes/${id}`);
};
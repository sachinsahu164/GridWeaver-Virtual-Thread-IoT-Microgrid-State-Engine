import { fetchApi } from './api';

export const getStatus = () => fetchApi('/api/simulation/status');
export const startSimulation = () => fetchApi('/api/simulation/start', { method: 'POST' });
export const triggerStorm = () => fetchApi('/api/simulation/storm', { method: 'POST' });
export const stopSimulation = () => fetchApi('/api/simulation/stop', { method: 'POST' });

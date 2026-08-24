import { fetchApi } from './api';

export const getBatteries = () => fetchApi('/api/batteries');
export const getBatteryById = (id) => fetchApi(`/api/batteries/${id}`);

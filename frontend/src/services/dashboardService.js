import { fetchApi } from './api';

export const getGridSummary = () => fetchApi('/api/grid/summary');
export const getEvents = () => fetchApi('/api/events');

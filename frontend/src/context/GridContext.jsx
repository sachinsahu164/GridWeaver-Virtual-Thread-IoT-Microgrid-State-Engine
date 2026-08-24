import { createContext, useContext, useEffect, useState } from 'react';
import * as nodeService from '../services/nodeService';

const GridContext = createContext(null);

export function GridProvider({ children }) {
  const [nodes, setNodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('OFFLINE');

  const refreshData = async () => {
    setLoading(true);
    setError(null);

    try {
      const nodesData = await nodeService.getNodes();

      if (Array.isArray(nodesData)) {
        setNodes(nodesData);
        setConnectionStatus('LIVE');
      } else {
        setNodes([]);
        setConnectionStatus('OFFLINE');
        setError('Invalid nodes response from backend');
      }
    } catch (err) {
      console.error('Failed to fetch solar nodes:', err);

      setNodes([]);
      setError(err.message || 'Failed to connect to backend');
      setConnectionStatus('OFFLINE');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <GridContext.Provider
      value={{
        nodes,
        loading,
        error,
        connectionStatus,
        refreshData,
      }}
    >
      {children}
    </GridContext.Provider>
  );
}

export function useGrid() {
  const context = useContext(GridContext);

  if (!context) {
    throw new Error('useGrid must be used inside GridProvider');
  }

  return context;
}
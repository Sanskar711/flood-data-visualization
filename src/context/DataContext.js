import React, { createContext, useState, useEffect } from 'react';
import { fetchData } from '../data/fetchdata';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({ df1: [], df2: [], states: {} });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchData();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <DataContext.Provider value={{ data, loading }}>
      {children}
    </DataContext.Provider>
  );
};

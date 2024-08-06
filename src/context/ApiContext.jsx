// src/context/ApiContext.jsx
import React, { createContext, useContext, useState } from 'react';

const ApiContext = createContext();

export const useApi = () => useContext(ApiContext);

export const ApiProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const fetchData = async (endpoint, options = {}) => {
    setLoading(true);
    const username = process.env.REACT_APP_API_USERNAME;
    const password = process.env.REACT_APP_API_PASSWORD;
    const baseUrl = process.env.REACT_APP_API_BASE_URL;

    const headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));
    headers.append('Content-Type', 'application/json');

    const response = await fetch(baseUrl + endpoint, {
      ...options,
      headers,
    });

    const data = await response.json();
    setLoading(false);
    return data;
  };

  return (
    <ApiContext.Provider value={{ fetchData, loading }}>
      {children}
    </ApiContext.Provider>
  );
};

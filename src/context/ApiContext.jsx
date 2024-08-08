import React, { createContext, useContext } from 'react';
import axios from 'axios';

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const deleteSong = async (id, token) => {
    try {
      await axios.delete(`https://sandbox.academiadevelopers.com/harmonyhub/songs/${id}/`, {
        headers: { Authorization: `Token ${token}` },
      });
    } catch (error) {
      console.error('Failed to delete song:', error);
      throw error;
    }
  };

  return (
    <ApiContext.Provider value={{ deleteSong }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => useContext(ApiContext);

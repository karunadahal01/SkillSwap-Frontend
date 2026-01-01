// src/context/SwapContext.jsx
import { createContext, useContext, useState } from "react";

const SwapContext = createContext({
  requestedSwaps: [],
  addSwap: (id) => {},
  removeSwap: (id) => {},
});

export const SwapProvider = ({ children }) => {
  const [requestedSwaps, setRequestedSwaps] = useState([]);

  const addSwap = (id) => setRequestedSwaps((prev) => [...prev, id]);
  const removeSwap = (id) => setRequestedSwaps((prev) => prev.filter((sid) => sid !== id));

  return (
    <SwapContext.Provider value={{ requestedSwaps, addSwap, removeSwap }}>
      {children}
    </SwapContext.Provider>
  );
};

export const useSwap = () => useContext(SwapContext);

import { useEffect, useState } from "react";

export const useSessionStorageState = (initialState, key) => {
  const [value, setValue] = useState(function () {
    const storedValue = sessionStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
};

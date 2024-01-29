import { useCallback } from "react";

const useLocalStorage = () => {
  const setToken = (key: string, value: string) => {
    localStorage.setItem(key, value);
  };

  const getToken = useCallback(() => {
    localStorage.getItem("FlixPicKsTokeN");
  }, []);

  const removeToken = (key: string) => localStorage.removeItem(key);

  return { getToken, setToken, removeToken };
};

export default useLocalStorage;

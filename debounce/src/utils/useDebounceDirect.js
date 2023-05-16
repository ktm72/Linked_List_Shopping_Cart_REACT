/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from "react";

const useDebounceDirect = (cb, delay) => {
  function debounce(cb, delay = 1000) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        cb(...args);
      }, delay);
    };
  }
  const optimised = useCallback(debounce(cb, delay), []);
  return optimised;
};

export default useDebounceDirect;

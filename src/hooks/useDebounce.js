import { useState, useEffect, useRef } from 'react';

const useDebounce = (value = '', delay = 0) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const timeoutRef = useRef(null);

  useEffect(() => {
    // Set debouncedValue to value passed in after the specified delay
    timeoutRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [value]);

  return debouncedValue;
};

export default useDebounce;

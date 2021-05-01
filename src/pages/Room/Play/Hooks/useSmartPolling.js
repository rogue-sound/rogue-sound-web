import { useRef, useState, useEffect } from 'react';

/**
 * Smart polling is used in the application as a substitute for events.
 * It is in charge of requesting the new song as soon the current one ends.
 */

export default () => {
  const timeout = useRef(null);
  const callback = useRef(null);
  const [remaining, setRemaining] = useState(null);

  useEffect(() => {
    if (callback.current) {
      if (timeout.current) clearTimeout(timeout.current);
      if (remaining) {
        timeout.current = setTimeout(() => {
          callback.current();
        }, remaining);
      }
    }
  }, [remaining]);

  useEffect(() => {
    return () => {
      timeout.current && clearTimeout(timeout.current);
    };
  }, []);

  const setCallback = fn => {
    callback.current = fn;
  };

  return [remaining, setRemaining, setCallback];
};

import { useRef, useState, useEffect } from 'react';

/**
 * Smart polling is used in the application as a substitute for events.
 * It is in charge of requesting the new song as soon the current one ends.
 */

export default () => {
  const smartPolling = useRef(null);
  const callback = useRef(null);
  const [remaining, setRemaining] = useState(null);

  useEffect(() => {
    if (callback) {
      if (smartPolling.current) clearTimeout(smartPolling.current);
      if (remaining) {
        smartPolling.current = setTimeout(() => {
          callback.current();
        }, remaining);
      }
    }
  }, [remaining]);

  useEffect(() => {
    return () => {
      smartPolling.current && clearTimeout(smartPolling.current);
    };
  }, []);

  const setCallback = fn => {
    callback.current = fn;
  };

  return [remaining, setRemaining, setCallback];
};

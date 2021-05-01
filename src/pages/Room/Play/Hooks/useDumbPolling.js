import { useRef, useState, useEffect } from 'react';
import { DUMB_POLLING_RATE } from '@utils/constants';

/**
 * Dumb polling is used in the application as a substitute for events.
 * It is in charge of keeping the user queue updated and trigger skipped songs.
 */

export default () => {
  const timeout = useRef(null);
  const callback = useRef(null);
  const [pollingState, setPollingState] = useState(false);

  useEffect(() => {
    if (callback.current) {
      if (timeout.current) clearTimeout(timeout.current);
      timeout.current = setTimeout(() => {
        callback.current();
        setPollingState(prev => !prev);
      }, DUMB_POLLING_RATE);
    }
  }, [pollingState]);

  useEffect(() => {
    return () => {
      timeout.current && clearTimeout(timeout.current);
    };
  }, []);

  const setCallback = fn => {
    callback.current = fn;
    setPollingState(prev => !prev);
  };

  return [setCallback];
};

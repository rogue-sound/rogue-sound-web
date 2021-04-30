import { useRef, useState, useEffect } from 'react';
import { DUMB_POLLING_RATE } from '@utils/constants';

/**
 * Dumb polling is used in the application as a substitute for events.
 * It is in charge of keeping the user queue updated and trigger skipped songs.
 */

export default fn => {
  const dumbPolling = useRef(null);
  const [pollingState, setPollingState] = useState(false);

  useEffect(() => {
    if (dumbPolling.current) clearTimeout(dumbPolling.current);
    dumbPolling.current = setTimeout(() => {
      fn();
      setPollingState(prev => !prev);
    }, DUMB_POLLING_RATE);
  }, [pollingState]);

  useEffect(() => {
    return () => {
      console.log('[UNMOUNT] Clearing dumb polling');
      if (dumbPolling.current) clearTimeout(dumbPolling.current);
    };
  }, []);

  return dumbPolling.current;
};

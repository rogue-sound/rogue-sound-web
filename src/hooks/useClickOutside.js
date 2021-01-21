import { useState, useEffect } from 'react';

/**
 * Hook for handling closing when clicking outside of an element
 * @param {React.node} element
 * @param {boolean} initialState
 */
const useClickOutside = (element, initialState) => {
  const [isActive, setIsActive] = useState(initialState);

  useEffect(() => {
    const onClick = e => {
      // If the active element exists and is clicked outside of
      if (element.current !== null && !element.current.contains(e.target)) {
        setIsActive(!isActive);
      }
    };

    // If the item is active (ie open) then listen for clicks outside
    if (isActive) {
      window.addEventListener('click', onClick);
    }

    return () => {
      window.removeEventListener('click', onClick);
    };
  }, [isActive, element]);

  return [isActive, setIsActive];
};

export default useClickOutside;

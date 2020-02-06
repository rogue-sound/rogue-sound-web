import React, { useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

const PopoverTrigger = ({ children, open, setPosition }) => {
  const reference = useRef(null);

  const updatePostion = useCallback(() => {
    reference &&
      reference.current &&
      setPosition(reference.current.getBoundingClientRect());
  }, [setPosition]);

  useEffect(() => {
    updatePostion();
  }, [updatePostion, children]);

  useEffect(() => {
    window.addEventListener('resize', updatePostion);
    return () => window.removeEventListener('resize', updatePostion);
  }, [updatePostion]);

  return React.cloneElement(children, {
    onClick: open,
    ref: reference,
  });
};

PopoverTrigger.displayName = 'Trigger';

PopoverTrigger.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  setPosition: PropTypes.func,
  open: PropTypes.func,
};

export default PopoverTrigger;

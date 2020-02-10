import React, { useState, useLayoutEffect, useCallback, useRef } from 'react';
/** Libraries */
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
/** Utils */
import { getPopoverPosition } from '@utils/popover';
/** Styled components */
import { PopoverWrapper, PopoverBody, PopoverArrow } from './Popover.styled';

const PopoverController = ({
  children,
  handleIsOpen,
  offCenter,
  place,
  showArrow,
  portalContainer = document.getElementById('portal-root'),
}) => {
  const [isOpen, setIsOpen] = useState(null);
  const [style, setStyle] = useState({
    position: 'absolute',
    top: 0,
    left: 0,
  });
  const refContainer = useRef(null);
  const refPopoverWrapper = useRef(null);

  const open = () => {
    setIsOpen(!isOpen);
    handleIsOpen && handleIsOpen(!isOpen);
  };

  useLayoutEffect(() => {
    const close = () => {
      setIsOpen(false);
      handleIsOpen && handleIsOpen(false);
    };

    const checkIfClickComeFromOutsideAndClose = e => {
      if (
        refContainer &&
        refContainer.current &&
        !refContainer.current.contains(e.target)
      ) {
        close();
      }
    };
    if (isOpen) {
      window.addEventListener('click', checkIfClickComeFromOutsideAndClose);
    }
    return () => {
      window.removeEventListener('click', checkIfClickComeFromOutsideAndClose);
    };
  }, [isOpen, handleIsOpen]);

  const setPosition = useCallback(
    triggerPosition => {
      const popoverWrapperPosition =
        refPopoverWrapper &&
        refPopoverWrapper.current &&
        refPopoverWrapper.current.getBoundingClientRect();
      const popoverPosition = getPopoverPosition(
        triggerPosition,
        place,
        offCenter,
        popoverWrapperPosition,
        window.innerWidth
      );
      setStyle(s => ({ ...s, ...popoverPosition }));
    },
    [setStyle, offCenter, place]
  );

  const inputChildren = React.Children.map(children, child => {
    if (child.type.displayName === 'Trigger') {
      return React.cloneElement(child, {
        open,
        setPosition,
      });
    }
    return (
      isOpen &&
      portalContainer &&
      ReactDOM.createPortal(
        <PopoverWrapper
          ref={refPopoverWrapper}
          style={style}
          role="button"
          tabIndex="0"
          onClick={e => {
            e.stopPropagation();
          }}
          onKeyPress={e => {
            e.stopPropagation();
          }}
        >
          {showArrow && (
            <PopoverArrow width="14" height="7">
              <polygon points="0,7 7,0, 14,7" />
            </PopoverArrow>
          )}
          <PopoverBody>{child}</PopoverBody>
        </PopoverWrapper>,
        portalContainer
      )
    );
  });
  return <div ref={refContainer}>{inputChildren}</div>;
};

PopoverController.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  showArrow: PropTypes.bool,
  handleIsOpen: PropTypes.func,
  offCenter: PropTypes.bool,
  place: PropTypes.string,
  portalContainer: PropTypes.element,
};

export default PopoverController;

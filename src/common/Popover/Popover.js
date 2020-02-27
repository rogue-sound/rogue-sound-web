import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
  useRef,
} from 'react';
/** Libraries */
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
/** Utils */
import { getPopoverPosition } from '@utils/popover';
import { PopoverConstants } from '@utils/constants';
/** Styled components */
import {
  PopoverContainer,
  PopoverWrapper,
  PopoverBody,
} from './Popover.styled';

const Popover = ({
  children,
  handleIsOpen,
  handleIsClosed,
  place,
  forceClose = false,
  portalContainer = document.getElementById('portal-root'),
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [style, setStyle] = useState({
    position: 'absolute',
    top: 0,
    left: 0,
  });
  const [fadeType, setFadeType] = useState(null);
  const refContainer = useRef(null);
  const refPopoverWrapper = useRef(null);

  const close = () => {
    setFadeType('out');
    // This setTimeout is necessary due to transition
    setTimeout(() => {
      setIsOpen(false);
      handleIsClosed && handleIsClosed();
    }, PopoverConstants.TRANSITION_DURATION_IN_MILLISECONDS);
  };

  const open = () => {
    if (!isOpen) {
      setFadeType('in');
      setIsOpen(true);
      handleIsOpen && handleIsOpen();
    } else {
      close();
    }
  };

  useEffect(() => {
    forceClose && close();
  }, [forceClose]);

  useLayoutEffect(() => {
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
  }, [isOpen, handleIsOpen, handleIsClosed]);

  const setPosition = useCallback(
    triggerPosition => {
      const popoverWrapperPosition =
        refPopoverWrapper &&
        refPopoverWrapper.current &&
        refPopoverWrapper.current.getBoundingClientRect();
      const popoverPosition = getPopoverPosition(
        triggerPosition,
        place,
        popoverWrapperPosition,
        window.innerWidth
      );
      setStyle(s => ({ ...s, ...popoverPosition }));
    },
    [setStyle, place, isOpen]
  );

  const inputChildren = React.Children.map(children, child => {
    if (!child) {
      return null;
    }
    if (child.type && child.type.displayName === 'Trigger') {
      return React.cloneElement(child, {
        open,
        setPosition,
      });
    }
    return (
      portalContainer &&
      ReactDOM.createPortal(
        <PopoverContainer
          ref={refPopoverWrapper}
          style={style}
          role="button"
          tabIndex="0"
          fadeType={fadeType}
          transitionDuration={
            PopoverConstants.TRANSITION_DURATION_IN_MILLISECONDS
          }
          onClick={e => {
            e.stopPropagation();
          }}
          onKeyPress={e => {
            e.stopPropagation();
          }}
        >
          {isOpen && (
            <PopoverWrapper>
              <PopoverBody>{child}</PopoverBody>
            </PopoverWrapper>
          )}
        </PopoverContainer>,
        portalContainer
      )
    );
  });
  return <div ref={refContainer}>{inputChildren}</div>;
};

Popover.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  handleIsOpen: PropTypes.func,
  handleIsClosed: PropTypes.func,
  place: PropTypes.string,
  forceClose: PropTypes.bool,
  portalContainer: PropTypes.element,
};

export default Popover;

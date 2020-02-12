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
/** Styled components */
import {
  PopoverContainer,
  PopoverWrapper,
  PopoverBody,
  PopoverArrow,
} from './Popover.styled';

const PopoverController = ({
  children,
  handleIsOpen,
  offCenter,
  place,
  showArrow,
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

  const open = () => {
    setFadeType('in');
    setIsOpen(!isOpen);
    handleIsOpen && handleIsOpen(!isOpen);
  };

  useLayoutEffect(() => {
    const close = () => {
      setFadeType('out');
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
      portalContainer &&
      ReactDOM.createPortal(
        <PopoverContainer
          ref={refPopoverWrapper}
          style={style}
          role="button"
          tabIndex="0"
          fadeType={fadeType}
          onClick={e => {
            e.stopPropagation();
          }}
          onKeyPress={e => {
            e.stopPropagation();
          }}
        >
          <PopoverWrapper>
            <PopoverBody>{child}</PopoverBody>
          </PopoverWrapper>
        </PopoverContainer>,
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

import styled from 'styled-components';

const PopoverWrapper = styled.div`
  min-width: 0 !important;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  opacity: 1;
  transition-property: top, left, opacity, transform;
  transition-duration: 500ms;
  transition-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.35);
  transform: translate(-50%, 0);
  margin-top: 12px;
  color: #333;
  background-color: #fff;
  &:focus {
    outline: 0;
  }
`;

const PopoverBody = styled.div`
  padding: 8px 16px;
  max-width: none !important;
  &:focus {
    outline: 0;
  }
`;

const PopoverArrow = styled.svg`
  width: 14px;
  height: 7px;
  left: 0;
  right: 0;
  margin: auto;
  position: absolute;
  transform: translateY(-7px);
  transition: -webkit-transform 150ms ease-in 0s;
  polygon {
    fill: #fff;
  }
`;

export { PopoverWrapper, PopoverBody, PopoverArrow };

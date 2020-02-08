import styled from 'styled-components';

const PopoverWrapper = styled.div`
  min-width: 0 !important;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  opacity: 1;
  transition: opacity 300ms cubic-bezier(0.165, 0.84, 0.44, 1);
  box-shadow: 0px 10px 14px -4px rgba(176, 170, 176, 0.62);
  transform: translate(-50%, 0);
  margin-top: 12px;
  background-color: rgba(0, 0, 0, 0.3);
  &:focus {
    outline: 0;
  }
`;

const PopoverBody = styled.div`
  padding: 8px 16px;
  max-width: none !important;
  color: #333;
  background-color: #fff;
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

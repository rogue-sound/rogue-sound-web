import styled from 'styled-components';

const PopoverContainer = styled.div`
  z-index: 1000;
  display: flex;
  flex-direction: column;
  transform: translate(-50%, 0);
  margin-top: 6px;
  outline: none;
  &:focus {
    outline: none;
  }
  opacity: ${props => {
    switch (props.fadeType) {
      case 'in':
        return '1';
      default:
        return '0';
    }
  }};
  transition: ${props => {
    switch (props.fadeType) {
      case 'in':
        return `opacity ease-in 0.20s;`;
      case 'out':
        return `opacity ease-in 0.20s;`;
      default:
        return '';
    }
  }};
`;

/**
 * To have a 1px border:
 * :before -> top: -16px, margin-left: -9px
 * :after -> margin-left:
 */
const PopoverWrapper = styled.div`
  position: relative;
  background-color: #e6eedd;
  border: 2px solid #d1d5da;
  border-radius: 3px;
  box-shadow: 0 1px 15px rgba(27, 31, 35, 0.15) !important;
  box-sizing: border-box;
  &:before,
  &:after {
    position: absolute;
    left: 50%;
    display: inline-block;
    content: '';
  }
  &:before {
    top: -19px;
    margin-left: -10px;
    border: 9px solid transparent;
    border-bottom-color: #d1d5da;
  }
  &:after {
    top: -14px;
    margin-left: -8px;
    border: 7px solid transparent;
    border-bottom-color: #e6eedd;
  }
`;

const PopoverBody = styled.div`
  padding: 8px 16px;
  max-width: none !important;
  color: #333;
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

export { PopoverContainer, PopoverWrapper, PopoverBody, PopoverArrow };

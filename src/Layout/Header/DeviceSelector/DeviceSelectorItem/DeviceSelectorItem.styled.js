import styled from 'styled-components';

const DeviceSelectorItemWrapper = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const DeviceSelectorItemIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  margin-right: 10px;
  svg {
    width: 25px;
    height: 25px;
    fill: ${props => (props.isActive ? '#30c552' : '#333')};
    color: ${props => (props.isActive ? '#30c552' : '#333')};
  }
`;

const DeviceSelectorItemText = styled.span`
  font-size: 12px;
  font-weight: 500;
`;

export {
  DeviceSelectorItemWrapper,
  DeviceSelectorItemIcon,
  DeviceSelectorItemText,
};

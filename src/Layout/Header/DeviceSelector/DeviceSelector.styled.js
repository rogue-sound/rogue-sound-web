import styled from 'styled-components';

const DevicesSelectorWrapper = styled.div`
  display: flex;
  border-radius: 4px;
  cursor: pointer;
  padding: 4px 5px 4px 4px;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  svg {
    fill: ${props => (props.isActive ? '#30c552' : 'red')};
    width: 26px;
    height: 26px;
  }
`;

const DevicesSelectorItemsWrapper = styled.div`
  margin: -8px -16px;
`;

const NoDevicesFoundText = styled.span`
  font-size: 12px;
  font-weight: 500;
  cursor: default;
`;

export {
  DevicesSelectorWrapper,
  DevicesSelectorItemsWrapper,
  NoDevicesFoundText,
};

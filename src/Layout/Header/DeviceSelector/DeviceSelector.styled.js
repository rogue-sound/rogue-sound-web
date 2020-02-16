import styled from 'styled-components';

const DevicesSelectorWrapper = styled.div`
  align-self: center;
  cursor: pointer;
  padding: 5px 7px 5px 5px;
  margin-top: 3px;
  border-radius: 5px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  svg {
    fill: ${props => (props.isActive ? '#30c552' : 'red')};
    width: 25px;
    height: 25px;
  }
`;

export { DevicesSelectorWrapper };

import styled from 'styled-components';

const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const SelectElement = styled.select`
  :focus {
    outline: 0;
  }
`;

export { SelectContainer, SelectElement };

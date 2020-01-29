import styled from 'styled-components';

const PrimaryButton = styled.button`
  background-color: ${(props) => props.theme.colors.bgMainColor};
  color: ${(props) => props.theme.colors.textColor};
  padding: 8px;
  border-radius: 5px;
  margin-top: 5px;
  font-family: 'Open Sans';
  cursor: pointer;
  :focus {
    outline: 0;
  }
`;

export { PrimaryButton };

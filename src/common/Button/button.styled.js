import styled from 'styled-components';

const PrimaryButton = styled.button`
  background-color: ${props => props.theme.colors.bgMainColor};
  color: ${props => props.theme.colors.textColor};
  padding: 8px;
  border-radius: 5px;
  font-family: ${props => props.theme.fonts.primaryFont};
  cursor: pointer;
  :focus {
    outline: 0;
  }
`;

const LoginButton = styled(PrimaryButton)`
  background-color: #01ab6d;
  color: #ffffff;
  font-size: 12px;
  line-height: 18px;
  font-weight: 700;
  letter-spacing: 1.76px;
  text-transform: uppercase;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 500px;
  will-change: transform;
  white-space: nowrap;
  padding: 8px 24px;
  display: inline-block;
  transition: transform 0.1s ease-in;
  transform: perspective(1px) scale(1) translateZ(0);
  :hover {
    transform: perspective(1px) scale(1.01) translateZ(0);
  }
`;

export { PrimaryButton, LoginButton };

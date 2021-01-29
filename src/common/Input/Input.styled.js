import styled from 'styled-components';

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const InputElement = styled.input`
  font-family: 'Raleway', sans-serif;
  width: 100%;
  padding: ${props => (props.padding ? props.padding : '0.375rem 0.75rem')};
  font-size: 14px;
  font-weight: 500;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  overflow: visible;
  :focus {
    border-color: #80bdff;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

const InputLabel = styled.label`
  margin-bottom: 7px;
`;

const InputErrorMessage = styled.span`
  color: red;
  margin-top: 7px;
`;

export { InputContainer, InputElement, InputLabel, InputErrorMessage };

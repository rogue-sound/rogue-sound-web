import styled from 'styled-components';

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const InputElement = styled.input`
  width: 100%;
  padding: 0.375rem 0.75rem;
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
  margin-right: 8px;
`;

export { InputContainer, InputElement, InputLabel };

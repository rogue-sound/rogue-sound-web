import styled from 'styled-components';

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const InputElement = styled.input`
  padding: .375rem .75rem;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: .25rem;
  transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
  overflow: visible;
  :focus {
    border-color: #80bdff;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
  }
`;

const InputLabel = styled.label`
  margin-right: 8px;
`;

export { InputContainer, InputElement, InputLabel };

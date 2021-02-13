import styled from 'styled-components';

const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterWrapper = styled.div`
  color: white;
  background-color: #1d1d35;
  z-index: 2;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 64px;
`;

export { FooterContainer, FooterWrapper };

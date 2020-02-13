import styled from 'styled-components';

const HeaderWrapper = styled.div`
  color: white;
  background-color: #1d1d35;
  padding: 10px 20px;
  z-index: 2;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 64px;
`;

const HeaderLogo = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin: 0;
`;

const HeaderActionsWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const HeaderDevices = styled.div`
  margin-right: 30px;
`;

const HeaderLanguage = styled.div`
  margin-right: 30px;
`;

export {
  HeaderWrapper,
  HeaderLogo,
  HeaderDevices,
  HeaderLanguage,
  HeaderActionsWrapper,
};

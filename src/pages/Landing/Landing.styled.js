import styled from 'styled-components';

const LandingContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const LandingPartialContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 40px;
`;

const LandingHeader = styled(LandingPartialContainer)`
  height: 60%;
  background-color: #fff;
  flex-direction: column;
  justify-content: center;
  @media (min-width: 1024px) {
    flex-direction: row;
    align-items: center;
  }
`;

const LandingFooter = styled(LandingPartialContainer)`
  height: 40%;
  flex-direction: row;
  align-items: center;
  background-color: #1d1d35;
  font-size: 16px;
  color: #e6eedd;
`;

const LandingTitleWrapper = styled.div`
  padding: 35px;
`;

const LandingTitle = styled.h1`
  font-size: 48px;
  font-weight: 800;
  color: #1d1d35;
  margin: 0;
`;

const LandingDescription = styled.span`
  font-size: 20px;
  color: #333;
`;

export {
  LandingContainer,
  LandingPartialContainer,
  LandingHeader,
  LandingFooter,
  LandingTitleWrapper,
  LandingTitle,
  LandingDescription,
};

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
  flex-direction: column;
  justify-content: center;
  background-color: #1d1d35;
`;

const LandingFooterLine = styled.div`
  font-size: 16px;
  color: #e6eedd;

  &:not(:last-of-type) {
    margin-bottom: 5px;
  }
`;

const LandingFooterHighLight = styled.span`
  color: #01ab6d;
  font-weight: 600;
`;

const LandingTitleWrapper = styled.div`
  padding: 35px;
  display: flex;
  flex-direction: column;
`;

const LandingTitle = styled.h1`
  font-size: 48px;
  font-weight: 800;
  color: #1d1d35;
  margin: 0;
`;

const LandingDescription = styled.span`
  font-size: 18px;
  color: #333;
  margin-top: 5px;
`;

const LandingLoginButton = styled.div`
  margin-top: 10px;
`;

export {
  LandingContainer,
  LandingPartialContainer,
  LandingHeader,
  LandingFooter,
  LandingFooterLine,
  LandingFooterHighLight,
  LandingTitleWrapper,
  LandingTitle,
  LandingDescription,
  LandingLoginButton,
};

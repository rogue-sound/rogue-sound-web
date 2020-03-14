import styled from 'styled-components';

const LandingContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const LandingPartialContainer = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 75px;
`;

const LandingHeader = styled(LandingPartialContainer)`
  background-color: #fff;
`;

const LandingFooter = styled(LandingPartialContainer)`
  background-color: #1d1d35;
  font-size: 16px;
  color: #e6eedd;
`;

const LandingTitleWrapper = styled.div``;

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

const LandingHeaderMenu = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 0 40px;
`;

const LandingHeaderMenuItem = styled.div`
  height: 250px;
  width: 180px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #01ab6d;
  color: #fff;
  border-radius: 4px;
  box-shadow: 0px 1px 35px 0px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s linear 0s;
  &:not(:first-child) {
    margin-left: 50px;
  }
  &:hover {
    box-shadow: 0px 1px 35px 0px rgba(1, 171, 110, 0.7);
    transform: scale3d(1.006, 1.006, 1);
  }
`;

export {
  LandingContainer,
  LandingPartialContainer,
  LandingHeader,
  LandingFooter,
  LandingTitleWrapper,
  LandingTitle,
  LandingDescription,
  LandingHeaderMenu,
  LandingHeaderMenuItem,
};

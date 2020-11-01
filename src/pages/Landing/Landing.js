import React from 'react';
import { useSelector } from 'react-redux';
/** Components */
import LoginButton from '@components/LoginButton';
import LandingMenu from './LandingMenu';
/** Styled components */
import {
  LandingContainer,
  LandingHeader,
  LandingFooter,
  LandingTitleWrapper,
  LandingTitle,
  LandingDescription,
  LandingLoginButton,
} from './Landing.styled';

const Landing = () => {
  const { token } = useSelector(state => state.auth);

  return (
    <LandingContainer>
      <LandingHeader>
        <LandingTitleWrapper>
          <LandingTitle>Rogue Sound</LandingTitle>
          <LandingDescription>
            Rogue Sound is a social music sharing website where you can play
            music with friends and listen to it in real time thanks to the
            Spotify API.
          </LandingDescription>
          <LandingLoginButton>{!token && <LoginButton />}</LandingLoginButton>
        </LandingTitleWrapper>
        <LandingMenu />
      </LandingHeader>
      <LandingFooter>Landing part 2</LandingFooter>
    </LandingContainer>
  );
};

export default Landing;

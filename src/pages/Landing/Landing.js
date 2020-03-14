import React from 'react';
/** Components */
import LandingMenu from './LandingMenu';
/** Styled components */
import {
  LandingContainer,
  LandingHeader,
  LandingFooter,
  LandingTitleWrapper,
  LandingTitle,
  LandingDescription,
} from './Landing.styled';

const Landing = () => (
  <LandingContainer>
    <LandingHeader>
      <LandingTitleWrapper>
        <LandingTitle>Rogue Sound</LandingTitle>
        <LandingDescription>
          Rogue Sound is a social music sharing website where you can play music
          with friends and listen to it in real time thanks to the Spotify API.
        </LandingDescription>
      </LandingTitleWrapper>
      <LandingMenu />
    </LandingHeader>
    <LandingFooter>Landing part 2</LandingFooter>
  </LandingContainer>
);

export default Landing;

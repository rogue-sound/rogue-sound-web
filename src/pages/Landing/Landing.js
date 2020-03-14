import React from 'react';
/** Styled components */
import {
  LandingContainer,
  LandingHeader,
  LandingFooter,
  LandingTitleWrapper,
  LandingTitle,
  LandingDescription,
  LandingHeaderMenu,
  LandingHeaderMenuItem,
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
      <LandingHeaderMenu>
        <LandingHeaderMenuItem>Explore rooms</LandingHeaderMenuItem>
        <LandingHeaderMenuItem>About us</LandingHeaderMenuItem>
        <LandingHeaderMenuItem>FAQ</LandingHeaderMenuItem>
      </LandingHeaderMenu>
    </LandingHeader>
    <LandingFooter>Landing part 2</LandingFooter>
  </LandingContainer>
);

export default Landing;

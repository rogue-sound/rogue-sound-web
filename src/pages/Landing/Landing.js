import React from 'react';
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
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
  const intl = useIntl();
  const { token } = useSelector(state => state.auth);

  return (
    <LandingContainer>
      <LandingHeader>
        <LandingTitleWrapper>
          <LandingTitle>Rogue Sound</LandingTitle>
          <LandingDescription>
            {intl.formatMessage({
              id: 'app.pages.Landing.Description',
            })}
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

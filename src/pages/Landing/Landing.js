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
  LandingFooterLine,
  LandingFooterHighLight,
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
      <LandingFooter>
        <LandingFooterLine>
          Over <LandingFooterHighLight>666,666</LandingFooterHighLight> songs
          played
        </LandingFooterLine>
        <LandingFooterLine>
          More than <LandingFooterHighLight>7</LandingFooterHighLight> users
          registered
        </LandingFooterLine>
        <LandingFooterLine>
          <LandingFooterHighLight>1,999,998</LandingFooterHighLight> minutes of
          music listened
        </LandingFooterLine>
      </LandingFooter>
    </LandingContainer>
  );
};

export default Landing;

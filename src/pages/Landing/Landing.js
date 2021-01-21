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
  LandingFooterStats,
  LandingFooterStat,
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
        <LandingFooterStats>
          <LandingFooterStat>
            Over <LandingFooterHighLight>666,666</LandingFooterHighLight> songs
            played
          </LandingFooterStat>
          <LandingFooterStat>
            More than <LandingFooterHighLight>7</LandingFooterHighLight> users
            registered
          </LandingFooterStat>
          <LandingFooterStat>
            <LandingFooterHighLight>1,999,998</LandingFooterHighLight> minutes
            of music listened
          </LandingFooterStat>
        </LandingFooterStats>
      </LandingFooter>
    </LandingContainer>
  );
};

export default Landing;

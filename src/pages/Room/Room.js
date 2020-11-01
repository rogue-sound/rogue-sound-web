import React from 'react';
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
/** Components */
import Layout from '@layout';
import Sidebar from '@layout/Sidebar';
import Footer from '@layout/Footer';
import SearchSongs from './SearchSongs';
import Play from './Play';
/** Styled Component */
import { RoomContainer, RoomContent, RoomNotLoggedIn } from './room.styled';

const Room = () => {
  const intl = useIntl();
  const { token } = useSelector(state => state.auth);
  return (
    <Layout>
      <RoomContainer>
        <RoomContent>
          {token ? (
            <>
              <SearchSongs intl={intl} />
              <Play intl={intl} />
            </>
          ) : (
            <RoomNotLoggedIn>
              {intl.formatMessage({
                id: 'app.pages.Room.NotLoggedInText',
              })}
            </RoomNotLoggedIn>
          )}
        </RoomContent>
        <Sidebar />
      </RoomContainer>
      <Footer />
    </Layout>
  );
};

Room.propTypes = {};

export default Room;

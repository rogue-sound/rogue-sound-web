import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
/** Services */
import { getRoomDetails } from '@services/api';
import { pause } from '@services/spotify';
/** Components */
import Layout from '@layout';
import Sidebar from '@layout/Sidebar';
import Footer from '@layout/Footer';
import SearchSongs from './SearchSongs';
import Play from './Play';
import RoomHead from './RoomHead';
/** Context */
import { reset } from '../../context/playing';
/** Styled Component */
import { RoomContainer, RoomContent, RoomNotLoggedIn } from './room.styled';

const Room = () => {
  const [room, setRoom] = useState({});
  const intl = useIntl();
  const { id } = useParams();
  const { token } = useSelector(state => state.auth);
  const { current } = useSelector(state => state.playing);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const roomDetails = await getRoomDetails(id);
        roomDetails && setRoom(roomDetails);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRoomDetails();
  }, [id]);

  useEffect(() => {
    return () => {
      dispatch(reset());
      pause();
    };
  }, []);

  return (
    <Layout>
      {!!room && (
        <RoomHead room={room} playing={!!(current && current.songId)} />
      )}
      <RoomContainer>
        <RoomContent>
          {token ? (
            <>
              <SearchSongs room={room} intl={intl} />
              <Play room={room} intl={intl} />
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

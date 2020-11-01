import styled from 'styled-components';

const RoomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
`;

const RoomContent = styled.div`
  width: 67%;
  display: flex;
  flex-direction: column;
`;

const RoomNotLoggedIn = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #1d1d35;
  height: 100%;
`;

export { RoomContainer, RoomContent, RoomNotLoggedIn };

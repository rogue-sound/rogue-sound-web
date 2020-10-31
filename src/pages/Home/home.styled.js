import styled from 'styled-components';

const RoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const RoomWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
`;

const RoomContent = styled.div`
  width: 67%;
  display: flex;
  flex-direction: column;
`;

export { RoomContainer, RoomWrapper, RoomContent };

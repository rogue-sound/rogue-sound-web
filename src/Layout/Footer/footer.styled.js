import styled from 'styled-components';

const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterWrapper = styled.div`
  color: white;
  background-color: #1d1d35;
  z-index: 2;
  height: 64px;
`;

const FooterItems = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const AddToLikedSongs = styled.div`
  font-size: 20px;
  margin-left: 16px;
  svg {
    path {
      fill: ${props => (props.isALikedSong ? 'white' : 'transparent')};
      stroke: white;
      stroke-width: 35px;
    }
  }
  &:hover {
    font-size: 22px;
  }
`;

export { FooterContainer, FooterWrapper, FooterItems, AddToLikedSongs };

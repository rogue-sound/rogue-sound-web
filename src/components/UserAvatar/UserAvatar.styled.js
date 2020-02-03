import styled from 'styled-components';

const UserAvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
`;

const UserAvatarImage = styled.img`
  border-radius: 50%;
  border: 2px solid #9cb0a4;
  padding: 2px;
  background-size: cover;
  overflow: hidden;
  position: relative;
  width: 40px;
  height: 40px;
`;

const UserName = styled.span`
  margin-right: 10px;
`;

export { UserAvatarWrapper, UserAvatarImage, UserName };

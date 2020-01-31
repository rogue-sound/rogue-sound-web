import styled from 'styled-components';

const UserAvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  padding: 10px 20px;
  background-color: #ddd;
  border-radius: 200px;
`;

const UserAvatarImage = styled.img`
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.15);
  background-size: cover;
  overflow: hidden;
  position: relative;
  width: 32px;
  height: 32px;
`;

const UserName = styled.span`
  margin-left: 10px;
  font-weight: 700;
`;

export { UserAvatarWrapper, UserAvatarImage, UserName };

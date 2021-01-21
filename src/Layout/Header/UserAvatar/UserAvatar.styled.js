import styled from 'styled-components';

const UserAvatarImage = styled.img`
  border-radius: 50%;
  border: 2px solid #61617b;
  padding: 2px;
  background-size: cover;
  overflow: hidden;
  position: relative;
  width: 40px;
  height: 40px;
  transition: all 0.2s ease;
`;

const UserName = styled.span`
  margin-right: 10px;
  font-weight: 500;
  transition: all 0.2s ease;
`;

const UserAvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;

  &:hover ${UserName} {
    text-decoration: underline;
  }

  &:hover ${UserAvatarImage} {
    border-color: #797994;
  }
`;

export { UserAvatarWrapper, UserAvatarImage, UserName };

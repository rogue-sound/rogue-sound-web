import styled from 'styled-components';

const MenuItemContainer = styled.div`
  height: 80px;
  width: 80px;
  background-color: #01ab6d;
  color: #fff;
  border-radius: 4px;
  box-shadow: 0px 1px 35px 0px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s linear 0s;
  will-change: transform;
  &:not(:first-child) {
    margin-left: 20px;
  }
  &:hover {
    box-shadow: 0px 1px 35px 0px rgba(1, 171, 110, 0.7);
    transform: scale3d(1.006, 1.006, 1) perspective(1px) translateZ(0);
  }
  a {
    width: 100%;
    height: 100%;
  }
  svg {
    width: 48px !important;
    height: 48px !important;
  }

  @media (min-width: 425px) {
    height: 150px;
    width: 140px;
    svg {
      margin-bottom: 15px;
    }
    &:not(:first-child) {
      margin-left: 50px;
    }
  }

  @media (min-width: 1440px) {
    height: 250px;
    width: 180px;
  }
`;

const MenuItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 10px;
  text-align: center;
`;

export { MenuItemContainer, MenuItem };

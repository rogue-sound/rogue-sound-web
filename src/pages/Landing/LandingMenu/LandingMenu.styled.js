import styled from 'styled-components';

const Menu = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 0 20px;
`;

const MenuItemText = styled.span`
  display: none;

  @media (min-width: 425px) {
    display: block;
  }
`;

export { Menu, MenuItemText };

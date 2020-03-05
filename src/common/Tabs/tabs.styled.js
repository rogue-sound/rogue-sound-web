import styled from 'styled-components';

const TabsWrapper = styled.div`
  height: 100%;
`;

const TabList = styled.div`
  border: 1px solid #e6eedd;
  height: 43px;
  display: flex;
  justify-content: space-between;
  display: flex;
  align-items: center;

  svg {
    font-size: 22px;
    margin-right: 10px;
  }
  span {
    font-weight: 600;
  }
`;

const TabItemNormal = styled.div`
  display: flex;
  align-items: center;
  list-style: none;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  background-color: #e6eedd;
  height: 100%;
`;

const TabItemActive = styled(TabItemNormal)`
  background-color: white;
  border-width: 1px 1px 0 1px;
  width: 100%;
`;

const TabContent = styled.div`
  border-left: solid 1px #e6eedd;
  height: 100%;
`;

const TabLabel = styled.span`
  margin-left: 10px;
`;

export {
  TabList,
  TabItemNormal,
  TabItemActive,
  TabContent,
  TabsWrapper,
  TabLabel,
};

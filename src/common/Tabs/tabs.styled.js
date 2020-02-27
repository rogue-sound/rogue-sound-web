import styled from 'styled-components';

const TabsWrapper = styled.div`
  height: 100%;
`;

const TabList = styled.div`
  border-bottom: 1px solid #e6eedd;
  height: 43px;
  padding-left: 0;
  display: flex;
  justify-content: space-between;
`;

const TabItem = styled.div`
  display: flex;
  align-items: center;
  list-style: none;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  background-color: #e6eedd;
`;

const TabItemActive = styled(TabItem)`
  background-color: white;
  border: solid #e6eedd;
  border-width: 1px 1px 0 1px;
  width: 100%;
`;

const TabContent = styled.div`
  border-left: solid 1px #e6eedd;
  height: 100%;
  /* max-height: calc(100vh - 172px);
  overflow-y: scroll; */
`;

const TabLabel = styled.span`
  margin-left: 10px;
`;

export { TabList, TabItem, TabItemActive, TabContent, TabsWrapper, TabLabel };

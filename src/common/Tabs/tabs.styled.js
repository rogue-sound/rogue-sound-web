import styled from 'styled-components';

const TabList = styled.div`
  border-bottom: 1px solid #ccc;
  padding-left: 0;
`;

const TabItem = styled.div`
  display: inline-block;
  list-style: none;
  margin-bottom: -1px;
  padding: 0.5rem 0.75rem;
`;

const TabItemActive = styled(TabItem)`
  background-color: white;
  border: solid #ccc;
  border-width: 1px 1px 0 1px;
`;

export { TabList, TabItem, TabItemActive };

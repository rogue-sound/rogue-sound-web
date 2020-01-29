import styled from 'styled-components';

const Component = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  color: blue;
`;

const ContainerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  min-height: calc(100vh - 128px);
  height: 100%;
  background-color: green;
`;

export { Component, ContainerWrapper };

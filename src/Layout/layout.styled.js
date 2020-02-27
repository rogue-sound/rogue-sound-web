import styled from 'styled-components';

const Component = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  color: blue;
`;

/**
 * 138px = 64px Header + 10px ProgressBar + 64px Footer
 */
const ContainerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  min-height: calc(100vh - 138px);
  height: 100%;
`;

export { Component, ContainerWrapper };

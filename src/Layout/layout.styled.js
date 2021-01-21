import styled from 'styled-components';

const LayoutContainer = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100%;
`;

/**
 * 138px = 64px Header + 10px ProgressBar + 64px Footer
 */
const LayoutContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`;

export { LayoutContainer, LayoutContent };

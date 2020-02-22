import styled from 'styled-components';

const ProgressBarContainer = styled.div`
  width: 100%;
  background-color: #d6d6d6;
  user-select: none;
  display: flex;
  align-items: center;
  z-index: 3;
`;

const ProgressBarPlaying = styled.div`
  flex: 1;
  height: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const ProgressBarKnob = styled.span`
  position: relative;
  height: 16px;
  width: 16px;
  border: 1.5px solid white;
  border-radius: 50%;
  background-color: #01ab6d;
`;

export { ProgressBarContainer, ProgressBarPlaying, ProgressBarKnob };

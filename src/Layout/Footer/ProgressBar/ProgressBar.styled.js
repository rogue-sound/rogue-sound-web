import styled, { keyframes } from 'styled-components';

const progressBarKeyFrames = keyframes`
  0% { width: 0; }
  100% { width: 100%; }
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 10px;
  background-color: #d6d6d6;
  user-select: none;
  display: flex;
  align-items: center;
  z-index: 3;
`;

const ProgressBarPlaying = styled.div`
  width: 100%;
  height: 10px;
  background: linear-gradient(to right, #835fc1, #01ab6d);
  animation: ${progressBarKeyFrames} ${props => props.duration / 1000}s linear
    forwards;
  animation-delay: -${props => props.currentTime / 1000}s;
`;

export { ProgressBarContainer, ProgressBarPlaying };

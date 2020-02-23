import styled from 'styled-components';

const ProgressBarContainer = styled.div`
  width: 100%;
  background-color: #d6d6d6;
  user-select: none;
  display: flex;
  align-items: center;
  z-index: 3;
`;

const ProgressBarPlaying = styled.div.attrs(props => ({
  style: {
    width: `${
      props.percentage ? (props.percentage > 100 ? 100 : props.percentage) : 0
    }%`,
  },
}))`
  height: 10px;
  background: linear-gradient(to right, #835fc1, #01ab6d);
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export { ProgressBarContainer, ProgressBarPlaying };

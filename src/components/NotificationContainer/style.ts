import styled, { css, keyframes } from 'styled-components';

interface NotificationContainerProps {
  isClicked: boolean;
}

export const appear = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  } to {
    opacity: 1;
    transform: translateY(0px);
  }
`;

export const Container = styled.div<NotificationContainerProps>`
  display: flex;
  position: absolute;
  align-items: center;
  flex-direction: column;

  right: 0;
  top: 100px;

  width: 300px;
  height: auto;
  max-height: 300px;
  margin-right: 8px;
  border: 1px solid transparent;
  border-radius: 2px 2px 3px 3px;

  div:first-child {
    border-radius: 1px 1px 0px 0px;
  }

  div:last-child {
    border: none;
    border-radius: 0px 0px 1px 1px;
  }

  ${props =>
    props.isClicked &&
    css`
      animation: ${appear} 1s;
    `}
`;

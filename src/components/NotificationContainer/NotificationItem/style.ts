import styled, { css, keyframes } from 'styled-components';

interface NotificationItemProps {
  isDeleted: boolean;
}

export const remove = keyframes`
  from {
    opacity: 1;
    transform: translateX(0);
  } to {
    opacity: 0;
    transform: translateX(100px);
  }
`;

export const Container = styled.div<NotificationItemProps>`
  display: flex;
  position: relative;
  flex-direction: row;
  align-items: center;

  width: 100%;

  background: #336820;
  border-bottom: 2px solid #f8f8f4;

  p {
    cursor: default;
    font-size: 16px;
    margin-left: 5px;
    padding: 10px 2px;
  }

  button {
    border: none;
    background: #336820;

    svg {
      padding: 5px;
      margin-top: 10px;

      color: #f8f8f4;
    }
  }

  ${props =>
    props.isDeleted &&
    css`
      animation: ${remove} 1s;
    `}
`;

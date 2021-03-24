import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

interface ContainerProps {
  hasdescription: number;
  type?: 'success' | 'error' | 'info';
}

const toastTypeVariations = {
  info: css`
    color: #3172b7;
    background: #ebf8ff;
  `,
  error: css`
    color: #c53030;
    background: #fddede;
  `,
  success: css`
    color: #e6fffa;
    background: #2e656a;
  `,
};

export const Container = styled(animated.div)<ContainerProps>`
  width: 400px;
  position: relative;
  border-radius: 10px;
  padding: 16px 30px 16px 16px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);

  display: flex;

  & + div {
    margin-top: 8px;
  }

  ${props => toastTypeVariations[props.type || 'info']}

  > svg {
    margin-top: 0px;
  }

  div {
    flex: 1;

    strong {
      font-size: 24px;
      margin-left: 12px;
    }

    p {
      opacity: 0.8;
      font-size: 14px;
      margin-left: 14px;
      line-height: 20px;
    }

    button {
      border: 0;
      top: 0px;
      right: 8px;
      opacity: 0.6;
      position: absolute;

      color: inherit;
      background: transparent;
    }

    ${props =>
      !props.hasdescription &&
      css`
        align-items: center;

        svg {
          margin-top: 0;
        }
      `}
  }
`;

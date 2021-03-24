import styled, { css } from 'styled-components';
import { shade } from 'polished';
import Tooltip from '../Tooltip';

interface ContainerProps {
  isFilled: boolean;
  isFocused: boolean;
  isError: boolean;
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  height: 72px;
  padding: 16px;
  background: #cbd3a8;
  border-radius: 10px;

  display: flex;
  align-items: center;

  color: ${shade(0.2, '#336820')};
  border: 2px solid ${shade(0.2, '#336820')};

  & + div {
    margin-top: 16px;
  }

  ${props =>
    props.isError &&
    css`
      color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      color: #336820;
      border-color: #336820;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #336820;
    `}

  input {
    flex: 1;
    border: 0;
    color: #336820;
    background: transparent;

    &::placeholder {
      color: ${shade(0.2, '#336820')};
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;
  margin-bottom: 16px;

  svg {
    margin: 0;
  }

  span {
    color: #fff;
    background: #c53030;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;

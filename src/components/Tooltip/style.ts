import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  span {
    color: #f8f8f4;
    background: #336820;

    width: 160px;
    padding: 8px;
    font-size: 14px;
    font-weight: 500;
    border-radius: 4px;
    visibility: hidden;

    opacity: 0;
    transition: opacity 0.4s;

    position: absolute;

    left: 50%;
    bottom: calc(100% + 12px);
    transform: translateX(-50%);

    &::before {
      content: '';
      position: absolute;

      border-style: solid;
      border-width: 6px 6px 0 6px;
      border-color: #336820 transparent;

      left: 50%;
      top: 100%;
      transform: translateX(-50%);
    }
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;

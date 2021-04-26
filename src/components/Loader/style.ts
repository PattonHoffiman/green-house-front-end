import styled, { keyframes } from 'styled-components';

export const ring = keyframes`
  from {
    transform: rotate(0deg);
  } to {
    transform: rotate(360deg);
  }
`;

export const Center = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.div`
  display: block;
  position: relative;

  width: 160px;
  height: 160px;

  div {
    display: block;
    position: absolute;
    box-sizing: border-box;

    margin: 8px;
    width: 128px;
    height: 128px;

    border-radius: 50%;
    border: 8px solid #336820;
    border-color: #336820 transparent transparent transparent;

    animation: ${ring} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  }

  div:nth-child(1) {
    animation-delay: -0.45s;
  }

  div:nth-child(2) {
    animation-delay: -0.3s;
  }

  div:nth-child(3) {
    animation-delay: -0.15s;
  }
`;

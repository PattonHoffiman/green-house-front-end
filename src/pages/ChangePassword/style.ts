import { shade } from 'polished';
import styled, { keyframes } from 'styled-components';

export const Container = styled.main`
  height: 100vh;
  display: flex;
  overflow: hidden;
  align-items: stretch;
`;

export const Content = styled.section`
  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: 700px;
`;

export const appearFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  } to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  animation: ${appearFromRight} 1s;

  > a {
    color: #336820;
    transition: color 0.2s;

    svg {
      margin-top: 8px;
      margin-left: 8px;
    }

    &:hover {
      color: ${shade(0.2, '#336820')};
    }
  }
`;

export const CenterContainer = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  animation: ${appearFromRight} 1s;

  div {
    img {
      margin-top: 72px;
    }
  }

  form {
    width: 600px;
    text-align: center;

    margin-top: 24px;
    margin-bottom: 36px;
  }

  @media screen and (max-width: 600px) {
    form {
      width: 500px;

      div {
        height: 56px;
        input {
          font-size: 24px;
        }
      }

      button {
        width: 60%;
        height: 56px;
        font-size: 24px;
      }
    }
  }
`;

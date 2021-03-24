import styled, { keyframes } from 'styled-components';

export const Container = styled.main`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Content = styled.section`
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: 700px;
`;

export const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  } to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const appearFromRight = keyframes`
  from {
    opacity: 0;
    transform: translate(50px);
  } to {
    opacity: 1;
    transform: translate(0);
  }
`;

export const ButtonArea = styled.div`
  display: flex;
  margin-top: 100px;
  flex-direction: row;

  align-items: center;
  justify-content: space-around;

  > a {
    margin-right: 16px;
  }

  #signin {
    animation: ${appearFromLeft} 1s;
  }

  #signup {
    animation: ${appearFromRight} 1s;
  }

  @media only screen and (max-width: 600px) {
    margin-top: 20px;
  }
`;

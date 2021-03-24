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
`;

export const appearFromUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  } to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const CenterContainer = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  animation: ${appearFromUp} 1s;

  margin: auto;

  > div {
    img {
      margin-top: 24px;
    }
  }

  h1 {
    color: #080906;
    font-size: 36px;
    font-weight: 300;
  }

  h2 {
    color: #080906;
    font-size: 24px;
    margin-bottom: 8px;
  }

  button {
    width: 200px;
    height: 40px;
    font-size: 24px;
  }

  @media screen and (max-width: 600px) {
    h1 {
      font-size: 24px;
    }

    button {
      width: 60%;
      height: 56px;
      font-size: 24px;
    }
  }
`;

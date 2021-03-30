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

export const RightContainer = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  animation: ${appearFromRight} 1s;

  margin-right: 48px;

  a {
    color: #336820;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, '#336820')};
    }
  }

  @media screen and (max-width: 600px) {
    font-size: 24px;
  }
`;

export const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  animation: ${appearFromRight} 1s;

  height: 40px;

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

  form {
    width: 600px;
    text-align: center;

    margin-top: 24px;
    margin-bottom: 36px;

    input[type='number'] {
      -moz-appearance: textfield;
      color: #336820;
      background: #cbd3a8;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    > div,
    > button {
      margin-bottom: -8px;
    }

    div:nth-child(2) {
      margin-top: 16px;
    }
  }

  div {
    h2 {
      color: #080906;
      font-size: 24px;
      font-weight: 300;
    }
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

export const AvatarInput = styled.div`
  align-self: center;
  position: relative;

  img {
    width: 160px;
    height: 160px;
    border-radius: 50%;
  }

  button {
    border: 0;
    bottom: 8px;
    right: 240px;

    width: 50px;
    height: 50px;
    cursor: pointer;
    position: absolute;
    border-radius: 50%;
    background: #336820;
    transition: background-color 0.2s;

    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 25px;
      height: 25px;
      color: #f8f8f4;
      cursor: pointer;
    }

    input {
      display: none;
    }

    &:hover {
      background: ${shade(0.2, '#336820')};
    }
  }
`;

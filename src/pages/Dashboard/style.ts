import { shade } from 'polished';
import styled from 'styled-components';

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

export const TopContent = styled.header`
  display: flex;
  margin-top: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;

  width: 100%;

  button {
    margin-right: 8px;
  }

  @media screen and (max-width: 900px) {
    justify-content: center;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  margin-right: 80px;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 900px) {
    display: none;
  }
`;

export const UserContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  width: 300px;
  height: 80px;
  margin-right: 8px;

  border-radius: 10px;
  border: 2px solid #336820;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  img {
    border-radius: 50%;
    margin: 8px 4px 4px 0px;
  }
`;

export const UserContent = styled.div`
  font-size: 24px;
  margin-top: 8px;

  h2 {
    color: #080906;
    font-size: 24px;
    cursor: default;
    font-weight: 300;
  }

  a {
    color: #336820;
    font-weight: 300;

    &:hover {
      color: ${shade(0.2, '#336820')};
    }
  }
`;

export const CenterContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  div {
    h2 {
      color: #080906;
    }
  }

  > h2 {
    color: #080906;
    font-size: 36px;
    margin-top: 160px;
    text-align: center;
  }

  align-items: center;

  overflow-y: auto;
  overflow-x: hidden;

  scrollbar-width: thin;
  scrollbar-color: #336820 #cbd3a8;

  width: 100%;

  > div {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;

    margin-top: 180px;
    margin-left: 36px;

    @media screen and (max-width: 800px) {
      margin-left: 80px;
    }
  }
`;

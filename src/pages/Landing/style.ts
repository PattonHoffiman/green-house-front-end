import styled from 'styled-components';

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

export const ButtonArea = styled.div`
  display: flex;
  margin-top: 100px;
  flex-direction: row;

  align-items: center;
  justify-content: space-around;

  > a {
    margin-right: 16px;
  }

  @media only screen and (max-width: 600px) {
    margin-top: 20px;
  }
`;

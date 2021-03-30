import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  img {
    width: 100%;
    height: 250px;
    border-radius: 10px 10px 0 0;
  }

  h2 {
    color: #080906;
    font-size: 24px;
    text-align: center;
    margin-bottom: 8px;
  }

  a {
    text-decoration: none;
  }

  margin: 8px;
  width: 240px;
  background: #f8f8f4;
  border-radius: 10px;
`;

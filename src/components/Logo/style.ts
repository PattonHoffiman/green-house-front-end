import styled from 'styled-components';

export const Container = styled.div`
  img {
    width: 544px;
    height: 65px;
  }

  @media only screen and (max-width: 600px) {
    img {
      width: 260px;
      height: 45px;
    }
  }
`;

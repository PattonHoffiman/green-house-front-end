import styled from 'styled-components';

export const Container = styled.button`
  width: 80px;
  height: 80px;
  border-radius: 10px;
  border: 2px solid #336820;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  background: #cbd3a8;

  svg {
    color: #336820;
    margin-top: 8px;
    cursor: pointer;
  }

  .notification {
    top: 45px;
    right: 100px;
    font-size: 16px;
    border-radius: 50%;
    position: absolute;

    padding: 5px 10px;

    color: #f8f8f4;
    background: #336820;

    @media screen and (max-width: 800px) {
      right: 155px;
    }
  }
`;

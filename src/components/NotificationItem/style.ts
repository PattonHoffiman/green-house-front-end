import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  width: 100%;

  background: #336820;
  border-bottom: 2px solid #f8f8f4;

  p {
    cursor: default;
    font-size: 16px;
    margin-left: 5px;
    padding: 10px 2px;
  }

  button {
    border: none;
    background: #336820;

    svg {
      padding: 5px;
      margin-top: 10px;

      color: #f8f8f4;
    }
  }
`;

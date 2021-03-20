import { darken } from 'polished';
import styled from 'styled-components';

export const Container = styled.button`
  width: 252px;
  height: 240px;
  border-radius: 15px;

  color: #336820;
  background: #cbd3a8;
  border: 3px solid #336820;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  padding: 20px;
  font-weight: 700;

  transition: 0.3s ease-in;

  &:hover {
    color: #f8f8f4;
    background: ${darken(0, '#336820')};
  }

  @media only screen and (max-width: 600px) {
    width: 126px;
    height: 120px;
    padding: 10px;
    font-size: 18px;
  }
`;

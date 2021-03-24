import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background: #336820;
  height: 72px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: #f8f8f4;
  width: 80%;
  font-weight: 500;
  margin-top: 16px;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, '#336820')};
  }
`;

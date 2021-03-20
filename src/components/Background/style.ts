import styled, { css } from 'styled-components';

interface ContainerProps {
  imagePath: string;
}

export const Container = styled.div<ContainerProps>`
  flex: 1;
  background-size: cover;

  ${props =>
    props.imagePath &&
    css`
      background-image: url(${props.imagePath});
    `}
`;

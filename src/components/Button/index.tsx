import React, { ButtonHTMLAttributes } from 'react';
import { Container } from './style';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  disable?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  loading,
  disable,
  children,
  ...rest
}) => (
  <Container type="button" disabled={disable} {...rest}>
    {loading ? 'Loading...' : children}
  </Container>
);

export default Button;

import React, { ButtonHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons';
import { Container } from './style';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ComponentType<IconBaseProps>;
}

const SquareButton: React.FC<ButtonProps> = ({ icon: Icon, ...rest }) => (
  <Container type="button" {...rest}>
    {Icon && <Icon size={48} />}
  </Container>
);

export default SquareButton;

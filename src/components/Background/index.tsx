import React from 'react';
import { Container } from './style';

interface BackgroundProps {
  imagePath: string;
}

const Background: React.FC<BackgroundProps> = ({ imagePath }) => (
  <Container imagePath={imagePath} />
);

export default Background;

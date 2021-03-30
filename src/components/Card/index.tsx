import React from 'react';
import { Link } from 'react-router-dom';

import { Container } from './style';

interface CardProps {
  id: string;
  name: string;
  imagePath: string;
}

const Card: React.FC<CardProps> = ({ id, name, imagePath }) => (
  <Container>
    <Link to={`plant-info?id=${id}`}>
      <img src={imagePath} alt={name} />
      <h2>{name}</h2>
    </Link>
  </Container>
);

export default Card;

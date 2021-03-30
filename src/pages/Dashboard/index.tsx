import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiBell, FiPower } from 'react-icons/fi';

import Logo from '../../components/Logo';
import Card from '../../components/Card';
import SquareButton from '../../components/SquareButton';

import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

import genericUser from '../../assets/generic-user.png';
import genericPlant from '../../assets/generic-plant.jpg';

import {
  Content,
  Container,
  TopContent,
  UserContent,
  UserContainer,
  LogoContainer,
  CenterContent,
} from './style';

interface Plant {
  id: string;
  name: string;
  water_day: Date;
  avatar_url: string;
}

const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const [load, setLoad] = useState(false);
  const [plants, setPlants] = useState<Plant[]>([]);

  useEffect(() => {
    async function verifyToken(): Promise<void> {
      const response = await api.put('users/profile', {
        name: user.name,
        email: user.email,
      });

      const { status } = response.data;

      if (status === 'error') signOut();
    }

    verifyToken();
  }, [user, signOut]);

  useEffect(() => {
    async function getPlants(): Promise<void> {
      try {
        setLoad(true);
        const response = await api.get('/plants');
        const plantsList = response.data as Plant[];

        if (plantsList) setPlants(plantsList);
      } finally {
        setLoad(false);
      }
    }

    getPlants();
  }, [setPlants]);

  return (
    <Container>
      <Content>
        <TopContent>
          <LogoContainer>
            <Logo />
          </LogoContainer>
          <UserContainer>
            <img
              src={user.avatar_url ? user.avatar_url : genericUser}
              alt={user.name}
            />
            <UserContent>
              <h2>Welcome,</h2>
              <Link to="/profile">{user.name}</Link>
            </UserContent>
          </UserContainer>
          <Link to="/add-plant">
            <SquareButton icon={FiPlus} title="Add New Plant" />
          </Link>
          <SquareButton icon={FiBell} title="Notifications" />
          <SquareButton icon={FiPower} onClick={signOut} title="SignOut" />
        </TopContent>
        <CenterContent>
          {load && <h2>Loading...</h2>}
          {plants.length === 0 && <h2>You does not add any plant!</h2>}
          {!load && (
            <div>
              {plants.map(plant => (
                <Card
                  id={plant.id}
                  key={plant.id}
                  name={plant.name}
                  imagePath={plant.avatar_url ? plant.avatar_url : genericPlant}
                />
              ))}
            </div>
          )}
        </CenterContent>
      </Content>
    </Container>
  );
};

export default Dashboard;

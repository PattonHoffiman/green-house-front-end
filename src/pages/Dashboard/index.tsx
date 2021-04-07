import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiBell, FiPower } from 'react-icons/fi';

import Logo from '../../components/Logo';
import Card from '../../components/Card';
import SquareButton from '../../components/SquareButton';
import NotificationItem from '../../components/NotificationItem';

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
  NotificationContainer,
} from './style';

interface Plant {
  id: string;
  name: string;
  water_day: Date;
  avatar_url: string;
}

interface Notification {
  id: string;
  content: string;
}

const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const [show, setShow] = useState(false);
  const [load, setLoad] = useState(false);
  const [click, setClick] = useState(false);
  const [plants, setPlants] = useState<Plant[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  function removeNotification(id: string): void {
    const updatedNotifications = notifications.filter(
      notification => notification.id !== id,
    );

    setNotifications(updatedNotifications);
  }

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

  useEffect(() => {
    async function getNotifications(): Promise<void> {
      try {
        setLoad(true);
        const response = await api.get('/plants/notifications');
        const notificationsList = response.data as Notification[];

        if (notificationsList) setNotifications(notificationsList);
      } finally {
        setLoad(false);
      }
    }

    getNotifications();
  }, [setNotifications]);

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
          <SquareButton
            icon={FiBell}
            title="Notifications"
            onClick={() => {
              if (notifications.length !== 0) {
                setShow(!show);
                setClick(!click);
              }
            }}
          >
            {notifications.length > 0 && !show && (
              <span className="notification">{notifications.length}</span>
            )}
          </SquareButton>
          <SquareButton icon={FiPower} onClick={signOut} title="SignOut" />
        </TopContent>
        {show && (
          <NotificationContainer isClicked={click}>
            {notifications.map(notification => (
              <NotificationItem
                id={notification.id}
                key={notification.id}
                remove={removeNotification}
                content={notification.content}
              />
            ))}
          </NotificationContainer>
        )}
        <CenterContent>
          {load ? (
            <h2>Loading...</h2>
          ) : (
            <div>
              {plants.length === 0 ? (
                <h2>You does not add any plant!</h2>
              ) : (
                plants.map(plant => (
                  <Card
                    id={plant.id}
                    key={plant.id}
                    name={plant.name}
                    imagePath={
                      plant.avatar_url ? plant.avatar_url : genericPlant
                    }
                  />
                ))
              )}
            </div>
          )}
        </CenterContent>
      </Content>
    </Container>
  );
};

export default Dashboard;

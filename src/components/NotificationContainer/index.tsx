import React from 'react';
import { Container } from './style';
import NotificationItem from './NotificationItem';

interface Notification {
  id: string;
  content: string;
}

interface NotificationContainerProps {
  isClicked: boolean;
  remove(id: string): void;
  notifications: Notification[];
}

const NotificationContainer: React.FC<NotificationContainerProps> = ({
  remove,
  isClicked,
  notifications,
}) => {
  return (
    <Container isClicked={isClicked}>
      {notifications.map(({ id, content }) => (
        <NotificationItem key={id} remove={remove} id={id} content={content} />
      ))}
    </Container>
  );
};

export default NotificationContainer;

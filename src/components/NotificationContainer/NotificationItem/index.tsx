import React, { useCallback, useState } from 'react';
import { FiMinusCircle } from 'react-icons/fi';

import { Container } from './style';

import api from '../../../services/api';
import { useToast } from '../../../hooks/toast';

interface NotificationProps {
  id: string;
  content: string;
  remove(id: string): void;
}

const NotificationItem: React.FC<NotificationProps> = ({
  id,
  remove,
  content,
}) => {
  const { addToast } = useToast();
  const [deleted, setDeleted] = useState(false);

  const handleUpdateNotification = useCallback(async () => {
    setDeleted(true);
    const timer = setTimeout(async () => {
      const response = await api.put('/plants/notifications', {
        id,
      });

      const { status, message } = response.data;

      if (status === 'error') {
        addToast({
          type: status,
          title: 'Error',
          description: message,
        });
      } else {
        remove(id);
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [id, remove, addToast]);

  return (
    <Container isDeleted={deleted}>
      <p>{content}</p>
      <button type="button" title="Delete" onClick={handleUpdateNotification}>
        <FiMinusCircle />
      </button>
    </Container>
  );
};

export default NotificationItem;

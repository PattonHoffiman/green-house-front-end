import React, { useCallback } from 'react';
import { FiMinusCircle } from 'react-icons/fi';

import { Container } from './style';

import api from '../../services/api';
import { useToast } from '../../hooks/toast';

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
  const handleUpdateNotification = useCallback(async () => {
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
  }, [id, remove, addToast]);

  return (
    <Container>
      <p>{content}</p>
      <button type="button" title="Delete" onClick={handleUpdateNotification}>
        <FiMinusCircle />
      </button>
    </Container>
  );
};

export default NotificationItem;

import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface SignInCredentials {
  email: string;
  password: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
}

interface AuthState {
  user: User;
  token: string;
}

interface MessageState {
  status: string;
  message: string;
}

interface AuthContextData {
  user: User;
  info: MessageState;
  signOut(): void;
  updateUser(user: User): void;
  signIn(credential: SignInCredentials): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@GreenHouse:token');
    const user = localStorage.getItem('@GreenHouse:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const [info, setInfo] = useState<MessageState>(() => {
    return {} as MessageState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { status, message, token, user } = response.data;

    if (status === 'success') {
      localStorage.setItem('@GreenHouse:token', token);
      localStorage.setItem('@GreenHouse:user', JSON.stringify(user));
      api.defaults.headers.authorization = `Bearer ${token}`;

      setData({
        user,
        token,
      });
    }

    setInfo({
      status,
      message,
    });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@GreenHouse:token');
    localStorage.removeItem('@GreenHouse:user');
    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    (user: User) => {
      localStorage.setItem('@GreenHouse:user', JSON.stringify(user));

      setData({
        token: data.token,
        user,
      });
    },
    [setData, data.token],
  );

  return (
    <AuthContext.Provider
      value={{ info, user: data.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}

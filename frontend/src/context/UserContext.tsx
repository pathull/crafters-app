import { createContext } from 'react';
import { user } from '../types/User';

export const defaultUser = {
  auction_wins: 0,
  bio: '',
  createdAt: '',
  email: '',
  id: 0,
  name: '',
  public_picture_id: '',
  updatedAt: '',
  userPicUrl: '',
  username: '',
};

export const UserContext = createContext<{ userData: user; setUserData: (arg: user) => void }>({
  userData: defaultUser,
  setUserData: () => {},
});

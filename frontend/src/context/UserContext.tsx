import { createContext } from 'react';

type userContext = {
  email: string,
  bio: string,
  username: string,
  name: string,
  userPicUrl: string,

}

const defaultUser = {
  email: '',
  bio: '',
  username: '',
  name: '',
  userPicUrl: '',

}


export const UserContext = createContext<{userData: userContext, setUserData:any }>({userData: defaultUser, setUserData: ()=>{}});

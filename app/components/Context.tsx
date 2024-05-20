// Context.tsx
import React, { createContext } from 'react';

// types.ts
export interface User {
  name: string;
  id: string;
}

export interface SharedContextType {
  schoolName: string;
  setSchoolName: React.Dispatch<React.SetStateAction<string>>;
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

// @TODO: Get user id ad name based on user context
export const defaultUser: User = {
  name: 'User Name',
  id: 'user-id',
};

const Context = createContext<SharedContextType>({
  // @TODO: Get school name data from user selection/preference
  schoolName: '',
  setSchoolName: () => {},
  user: defaultUser,
  setUser: () => {},
});

export default Context;

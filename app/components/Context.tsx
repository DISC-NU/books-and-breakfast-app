// Context.tsx
import React, { createContext } from 'react';

export enum TransportMethods {
  driving,
  carpool,
  good,
}

type VolunteeringDays = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
type TransportMethod = 'Willing to Drive' | 'Looking for Carpool' | `I'm good`;

// types.ts
export type UserInfo = {
  email: string;
  id: string;
  givenName: string;
  familyName: string;
  photo: string; // url
  name: string; // full name
  schoolName?: string[];
  volunteeringDays?: VolunteeringDays; // days of the week
  transportMethod?: TransportMethod;
};

export interface SharedContextType {
  schoolName: string;
  setSchoolName: React.Dispatch<React.SetStateAction<string>>;
  userInfo: UserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
}

const Context = createContext<SharedContextType>({
  // @TODO: Get school name data from user selection/preference
  schoolName: '',
  setSchoolName: () => {},
  userInfo: null,
  setUserInfo: () => {},
});

export default Context;

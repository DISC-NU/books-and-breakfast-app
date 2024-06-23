// Context.tsx
import React, { createContext } from 'react';

export enum TransportStatuses {
  driving,
  carpool,
  good,
}

export type VolunteeringDay = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
export type TransportStatus =
  | 'Willing to Drive'
  | 'Looking for Carpool'
  | 'Looking for CTA Buddy'
  | 'Looking for Walking Buddy';

// types.ts
export type UserInfo = {
  email: string;
  id: string;
  givenName: string;
  familyName: string;
  photo: string; // url
  name: string; // full name
  schoolName?: string;
  volunteeringDay?: VolunteeringDay; // days of the week
  transportStatus?: TransportStatus;
  isAdmin?: boolean;
};

export interface SharedContextType {
  userInfo: UserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
}

const Context = createContext<SharedContextType>({
  userInfo: null,
  setUserInfo: () => {},
});

export default Context;

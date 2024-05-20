import { Slot } from 'expo-router';
import { useState } from 'react';

import Context, { UserInfo } from './components/Context';

export default function AppLayout() {
  const [schoolName, setSchoolName] = useState<string>('');
  const [userInfo, setUserInfo] = useState<UserInfo>(null);

  return (
    <Context.Provider value={{ schoolName, setSchoolName, userInfo, setUserInfo }}>
      <Slot />
    </Context.Provider>
  );
}

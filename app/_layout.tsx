// ios 901429265549-ueiiqc5dkdh6f21vhp0q5hrl70r0g14h.apps.googleusercontent.com
// android 901429265549-2q47tjclbrk72vnf4qljehcqiebrint2.apps.googleusercontent.com

import { Stack } from 'expo-router/stack';
import { useState } from 'react';

import Context, { UserInfo } from './components/Context';
import LoginScreen from './components/LoginScreen';

export default function AppLayout() {
  const [schoolName, setSchoolName] = useState<string>('');
  const [userInfo, setUserInfo] = useState<UserInfo>(null);

  return (
    <Context.Provider value={{ schoolName, setSchoolName, userInfo, setUserInfo }}>
      {userInfo ? (
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      ) : (
        <LoginScreen setUserInfo={setUserInfo} />
      )}
    </Context.Provider>
  );
}

import { Stack } from 'expo-router/stack';
import { useState } from 'react';

import Context, { User, defaultUser } from './components/Context';

export default function AppLayout() {
  const [schoolName, setSchoolName] = useState<string>('');
  const [user, setUser] = useState<User>(defaultUser);

  return (
    <Context.Provider value={{ schoolName, setSchoolName, user, setUser }}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </Context.Provider>
  );
}

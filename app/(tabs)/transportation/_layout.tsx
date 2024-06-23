import { router } from 'expo-router';
import { Stack } from 'expo-router/stack';
import Icon from 'react-native-vector-icons/Ionicons';

export default function AppLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="chat"
        options={{
          headerTitle: '', // Remove title
          headerLeft: () => (
            <Icon name="arrow-back" size={24} color="black" onPress={() => router.dismiss(1)} />
          ),
          headerBackVisible: false, // Hide the default back button
        }}
      />
    </Stack>
  );
}

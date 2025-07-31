import { Stack } from 'expo-router/stack';

export default function DonorLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="match" options={{ title: 'Donor Match', headerTintColor: '#DC2626' }} />
      <Stack.Screen name="chat" options={{ title: 'Chat', headerTintColor: '#DC2626' }} />
    </Stack>
  );
}
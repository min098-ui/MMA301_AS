import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TeamsListScreen } from '../screens/TeamsListScreen';
import { TeamDetailScreen } from '../screens/TeamDetailScreen';
import { ChatScreen } from '../screens/ChatScreen';

export type TeamsStackParamList = {
  TeamsList: undefined;
  TeamDetail: { teamId: string; teamName: string };
  Chat: { teamId: string; teamName: string };
};

const Stack = createNativeStackNavigator<TeamsStackParamList>();

export const TeamsNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TeamsList" component={TeamsListScreen} />
      <Stack.Screen name="TeamDetail" component={TeamDetailScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
};

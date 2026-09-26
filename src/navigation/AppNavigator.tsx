import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { HomeScreen } from '../screens/HomeScreen';
import { TeamsScreen } from '../screens/TeamsScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { Colors } from '../constants/theme';

export type RootTabParamList = {
  Home: undefined;
  Teams: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: true,
          headerStyle: {
            backgroundColor: Colors.surface,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 1,
            borderBottomColor: Colors.border,
          },
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: '700',
            color: Colors.textPrimary,
          },
          tabBarStyle: styles.tabBar,
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: Colors.textMuted,
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap;

            if (route.name === 'Home') {
              iconName = focused ? 'checkbox' : 'checkbox-outline';
            } else if (route.name === 'Teams') {
              iconName = focused ? 'people' : 'people-outline';
            } else {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Ionicons name={iconName} size={size || 22} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'TaskMaster Hub',
            headerTitle: 'Task Management',
          }}
        />
        <Tab.Screen
          name="Teams"
          component={TeamsScreen}
          options={{
            title: 'Teams',
            headerTitle: 'Teams & Workspaces',
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: 'Profile',
            headerTitle: 'User Profile',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    height: 60,
    paddingBottom: 8,
    paddingTop: 6,
  },
  tabBarLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
});

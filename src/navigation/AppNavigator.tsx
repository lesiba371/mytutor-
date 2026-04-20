import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';
import { Colors, FontSize } from '../theme';
import HomeScreen from '../screens/HomeScreen';
import TutorsScreen from '../screens/TutorsScreen';
import SessionsScreen from '../screens/SessionsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TutorProfileScreen from '../screens/TutorProfileScreen';
import BookingScreen from '../screens/BookingScreen';
import type { RootStackParamList } from './types';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

function TabIcon({ emoji, focused }: { emoji: string; focused: boolean }) {
  return (
    <Text style={{ fontSize: focused ? 22 : 20, opacity: focused ? 1 : 0.6 }}>{emoji}</Text>
  );
}

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarStyle: {
          borderTopColor: Colors.border,
          backgroundColor: Colors.surface,
          height: 60,
          paddingBottom: 8,
        },
        tabBarLabelStyle: {
          fontSize: FontSize.xs,
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabIcon emoji="🏠" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="TutorsTab"
        component={TutorsScreen}
        options={{
          title: 'Tutors',
          tabBarIcon: ({ focused }) => <TabIcon emoji="👨‍🏫" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="SessionsTab"
        component={SessionsScreen}
        options={{
          title: 'Sessions',
          tabBarIcon: ({ focused }) => <TabIcon emoji="📅" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => <TabIcon emoji="👤" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeTabs"
        component={HomeTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TutorProfile"
        component={TutorProfileScreen}
        options={{
          title: 'Tutor Profile',
          headerStyle: { backgroundColor: Colors.primary },
          headerTintColor: Colors.surface,
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen
        name="Booking"
        component={BookingScreen}
        options={{
          title: 'Book a Session',
          headerStyle: { backgroundColor: Colors.primary },
          headerTintColor: Colors.surface,
          headerBackTitle: 'Back',
        }}
      />
    </Stack.Navigator>
  );
}

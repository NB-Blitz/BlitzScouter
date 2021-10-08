import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import TeamsScreen from '../screens/Teams/TeamsScreen';
import MatchesScreen from '../screens/Matches/MatchesScreen';
import { RootStackParamList, RootTabParamList } from '../types';
import SharingScreen from '../screens/Sharing/SharingScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import { TabBarIcon } from '../components/Themed';
import { BlitzDB } from '../api/BlitzDB';

export default function Navigation() {
  return (
    <NavigationContainer
      theme={DarkTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{}}>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator()
{
    return (
        <BottomTab.Navigator
        initialRouteName="Teams"
        screenOptions={{
            tabBarActiveTintColor: "#deda04",
            tabBarInactiveBackgroundColor: "#1b1b1b",
            tabBarActiveBackgroundColor: "#1b1b1b",
            headerShown: false
        }}>
        <BottomTab.Screen
            name="Teams"
            component={TeamsScreen}
            options={{
            title: 'Teams',
            tabBarIcon: ({ color }) => <TabBarIcon name="users" color={color} />
            }}
        />
        <BottomTab.Screen
            name="Matches"
            component={MatchesScreen}
            options={{
            title: 'Matches',
            tabBarIcon: ({ color }) => <TabBarIcon name="trophy" color={color} />
            }}
        />
        <BottomTab.Screen
            name="Sharing"
            component={SharingScreen}
            options={{
            title: 'Sharing',
            tabBarIcon: ({ color }) => <TabBarIcon name="share-alt" color={color} />,
            }}
        />
        <BottomTab.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
            title: 'Settings',
            tabBarIcon: ({ color }) => <TabBarIcon name="gear" color={color} />,
            }}
        />
        </BottomTab.Navigator>
    );
}
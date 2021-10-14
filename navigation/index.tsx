import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as React from 'react';
import TeamsScreen from '../screens/Teams/TeamsScreen';
import MatchesScreen from '../screens/Matches/MatchesScreen';
import { RootStackParamList, RootTabParamList } from '../types';
import SharingScreen from '../screens/Sharing/SharingScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import { FontAwesome } from '@expo/vector-icons';

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

const Drawer = createDrawerNavigator<RootTabParamList>();

function BottomTabNavigator()
{
    return (
        <Drawer.Navigator
        initialRouteName="Matches"
        
        screenOptions={{
            headerTitleStyle: { color: "#fff" },
            headerStyle: {backgroundColor: "#111111" },
            drawerActiveBackgroundColor: "#c89f00",
            drawerActiveTintColor: "#000",
            headerTintColor: "white",
            unmountOnBlur: true,
            gestureEnabled: true
        }}>
            <Drawer.Screen
                name="Matches"
                component={MatchesScreen}
            />
            <Drawer.Screen
                name="Teams"
                component={TeamsScreen}
            />
            <Drawer.Screen
                name="Sharing"
                component={SharingScreen}
            />
            <Drawer.Screen
                name="Settings"
                component={SettingsScreen}
            />
        </Drawer.Navigator>
    );
}
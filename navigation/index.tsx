import { FontAwesome } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import MatchesScreen from '../screens/Matches/MatchesScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import SharingScreen from '../screens/Sharing/SharingScreen';
import TeamsScreen from '../screens/Teams/TeamsScreen';
import { RootStackParamList, RootTabParamList } from '../types';

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
            <Stack.Screen
                name="Root"
                component={BottomTabNavigator}
                options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

const Drawer = createDrawerNavigator<RootTabParamList>();

function BottomTabNavigator() {
    return (
        <Drawer.Navigator
            initialRouteName="Matches"

            screenOptions={{
                headerTitleStyle: { color: "#fff" },
                headerStyle: { backgroundColor: "#151515" },
                drawerActiveBackgroundColor: "#c89f00",
                drawerActiveTintColor: "#000",
                headerTintColor: "white",
                unmountOnBlur: true,
                gestureEnabled: true
            }}>
            <Drawer.Screen
                name="Matches"
                component={MatchesScreen}
                options={{ drawerIcon: (props) => { return (<FontAwesome name="trophy" style={{ marginRight: -12 }} {...props} />) } }}
            />
            <Drawer.Screen
                name="Teams"
                component={TeamsScreen}
                options={{ drawerIcon: (props) => { return (<FontAwesome name="users" style={{ marginRight: -15 }} {...props} />) } }}
            />
            <Drawer.Screen
                name="Sharing"
                component={SharingScreen}
                options={{ drawerIcon: (props) => { return (<FontAwesome name="share-alt" style={{ marginRight: -10 }} {...props} />) } }}
            />
            <Drawer.Screen
                name="Settings"
                component={SettingsScreen}
                options={{ drawerIcon: (props) => { return (<FontAwesome name="gear" style={{ marginRight: -10 }} {...props} />) } }}
            />
        </Drawer.Navigator>
    );
}
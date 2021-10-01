import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import NotFoundScreen from '../screens/NotFoundScreen';
import TeamsScreen from '../screens/Teams/TeamsScreen';
import MatchesScreen from '../screens/Matches/MatchesScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import SharingScreen from '../screens/Sharing/SharingScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import { Animated } from 'react-native';

export default function Navigation() {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
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
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="Teams"
      screenOptions={{
        tabBarActiveTintColor: "#deda04",
        unmountOnBlur: true,
        headerShown: false
      }}>
      <BottomTab.Screen
        name="Teams"
        component={TeamsScreen}
        options={({ navigation }: RootTabScreenProps<'Teams'>) => ({
          title: 'Teams',
          tabBarIcon: ({ color }) => <TabBarIcon name="users" color={color} />
        })}
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

function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
}) {
    return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
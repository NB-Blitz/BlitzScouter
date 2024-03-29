import { MaterialIcons } from '@expo/vector-icons';
import { BottomTabBarButtonProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { TouchableNativeFeedback, View } from 'react-native';
import { usePalette } from '../hooks/usePalette';
import MatchesScreen from '../screens/Matches/MatchesScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import SharingScreen from '../screens/Sharing/SharingScreen';
import TeamsScreen from '../screens/Teams/TeamsScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    const [palette] = usePalette();

    const buttonNativeFeedback = ({ children, style, ...props }: BottomTabBarButtonProps) => (
        <TouchableNativeFeedback
            {...props}
            useForeground={false}
            background={TouchableNativeFeedback.Ripple(palette.navigation, false)}>
            <View style={style}>{children}</View>
        </TouchableNativeFeedback>
    );

    return (
        <Tab.Navigator
            initialRouteName="Matches"
            sceneContainerStyle={{
                backgroundColor: "transparent"
            }}
            screenOptions={{
                headerShown: false,
                tabBarActiveBackgroundColor: palette.navigationSelected,
                tabBarInactiveBackgroundColor: palette.navigation,
                tabBarActiveTintColor: palette.navigationTextSelected,
                tabBarInactiveTintColor: palette.navigationText,
                tabBarStyle: {
                    height: 60,
                    borderTopWidth: 0
                },
                tabBarLabelStyle: {
                    marginTop: -8,
                    marginBottom: 8
                },
                unmountOnBlur: false,
                tabBarButton: buttonNativeFeedback
            }}>

            <Tab.Screen
                name="Matches"
                component={MatchesScreen}
                options={{ tabBarIcon: (props) => { return (<MaterialIcons name="sports-mma" {...props} />) } }}
            />
            <Tab.Screen
                name="Teams"
                component={TeamsScreen}
                options={{ tabBarIcon: (props) => { return (<MaterialIcons name="people-alt" {...props} />) } }}
            />
            <Tab.Screen
                name="Sharing"
                component={SharingScreen}
                options={{ tabBarIcon: (props) => { return (<MaterialIcons name="ios-share" {...props} />) } }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{ tabBarIcon: (props) => { return (<MaterialIcons name="settings" {...props} />) } }}
            />
        </Tab.Navigator>
    );
}
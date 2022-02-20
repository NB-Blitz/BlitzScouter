import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from 'react';
import MediaScreen from "../components/containers/MediaScreen";
import { usePalette } from "../hooks/usePalette";
import DefaultTeamScreen from "../screens/DefaultTeam/DefaultTeamScreen";
import TeamSelectScreen from "../screens/DefaultTeam/TeamSelectScreen";
import MatchScreen from "../screens/Match/MatchScreen";
import ScoutingScreen from "../screens/Scout/ScoutingScreen";
import AboutScreen from "../screens/Settings/AboutScreen";
import { ColorPickerScreen } from "../screens/Settings/ColorPicker";
import DownloadScreen from "../screens/Settings/Download/DownloadScreen";
import OnboardingScreen from "../screens/Settings/Download/OnboardingScreen";
import RegionalScreen from "../screens/Settings/Download/RegionalScreen";
import YearScreen from "../screens/Settings/Download/YearScreen";
import { PaletteScreen } from "../screens/Settings/PaletteScreen";
import EditTemplateScreen from "../screens/Settings/Template/EditTemplateScreen";
import ElementChooserScreen from "../screens/Settings/Template/ElementChooserScreen";
import ExportQRScreen from "../screens/Sharing/ExportQRScreen";
import ImportQRScreen from "../screens/Sharing/ImportQRScreen";
import PrintSummaryScreen from "../screens/Sharing/PrintSummaryScreen";
import TeamScreen from "../screens/Team/TeamScreen";

const horizontalAnimation = ({ current, layouts }: any) => {
    return {
        cardStyle: {
            transform: [
                {
                    translateX: current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [layouts.screen.width, 0],
                    }),
                },
            ],
            opacity: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
            })
        },
    };
};

const Stack = createStackNavigator();

export default function RootNavigator() {
    const [palette] = usePalette();

    const BlitzTheme = {
        ...DarkTheme,
        colors: {
            ...DarkTheme.colors,
            background: palette.background,
        }
    }

    return (
        <NavigationContainer theme={BlitzTheme}>
            <Stack.Navigator
                screenOptions={{
                    title: "",
                    headerStyle: { backgroundColor: palette.background },
                    headerTintColor: palette.textPrimary,
                    cardStyleInterpolator: horizontalAnimation,
                    transitionSpec: {
                        open: {
                            animation: "timing",
                            config: {
                                duration: 200,
                            },
                        },
                        close: {
                            animation: "timing",
                            config: {
                                duration: 200,
                            },
                        },
                    },

                }}>

                <Stack.Screen name="Onboard" component={OnboardingScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Match" component={MatchScreen} />
                <Stack.Screen name="Team" component={TeamScreen} />
                <Stack.Screen name="Media" component={MediaScreen} options={{ headerStyle: { backgroundColor: "#000000" } }} />
                <Stack.Screen name="Year" component={YearScreen} />
                <Stack.Screen name="Regional" component={RegionalScreen} />
                <Stack.Screen name="Download" component={DownloadScreen} />
                <Stack.Screen name="EditTemplate" component={EditTemplateScreen} />
                <Stack.Screen name="ElementChooser" component={ElementChooserScreen} />
                <Stack.Screen name="TeamSelect" component={TeamSelectScreen} />
                <Stack.Screen name="Scout" component={ScoutingScreen} />
                <Stack.Screen name="DefaultTeam" component={DefaultTeamScreen} />
                <Stack.Screen name="ExportQR" component={ExportQRScreen} />
                <Stack.Screen name="ImportQR" component={ImportQRScreen} />
                <Stack.Screen name="PrintSummaryScreen" component={PrintSummaryScreen} />
                <Stack.Screen name="About" component={AboutScreen} />
                <Stack.Screen name="Palette" component={PaletteScreen} />
                <Stack.Screen name="ColorPicker" component={ColorPickerScreen} />

            </Stack.Navigator>
        </NavigationContainer>
    );
}
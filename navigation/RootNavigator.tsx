import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from 'react';
import MediaScreen from "../components/containers/MediaScreen";
import { PaletteContext } from "../context/PaletteContext";
import DefaultTeamScreen from "../screens/DefaultTeam/DefaultTeamScreen";
import TeamSelectScreen from "../screens/DefaultTeam/TeamSelectScreen";
import MatchScreen from "../screens/Match/MatchScreen";
import ScoutingScreen from "../screens/Scout/ScoutingScreen";
import AboutScreen from "../screens/Settings/AboutScreen";
import { ColorPickerScreen } from "../screens/Settings/ColorPicker";
import DownloadScreen from "../screens/Settings/DownloadScreen";
import OnboardingScreen from "../screens/Settings/OnboardingScreen";
import { PaletteScreen } from "../screens/Settings/PaletteScreen";
import RegionalScreen from "../screens/Settings/RegionalScreen";
import EditTemplateScreen from "../screens/Settings/Template/EditTemplateScreen";
import ElementChooserScreen from "../screens/Settings/Template/ElementChooserScreen";
import YearScreen from "../screens/Settings/YearScreen";
import ExportQRScreen from "../screens/Sharing/ExportQRScreen";
import ImportQRScreen from "../screens/Sharing/ImportQRScreen";
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
        },
    };
};

const Stack = createStackNavigator();

export default function RootNavigator() {
    const paletteContext = React.useContext(PaletteContext);

    const BlitzTheme = {
        ...DarkTheme,
        colors: {
            ...DarkTheme.colors,
            background: paletteContext.palette.background,
        }
    }

    return (
        <NavigationContainer theme={BlitzTheme}>
            <Stack.Navigator
                screenOptions={{
                    title: "",
                    headerStyle: { backgroundColor: paletteContext.palette.background },
                    cardStyleInterpolator: horizontalAnimation,
                    transitionSpec: {
                        open: {
                            animation: "timing",
                            config: {
                                duration: 250,
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
                <Stack.Screen name="About" component={AboutScreen} />
                <Stack.Screen name="Palette" component={PaletteScreen} />
                <Stack.Screen name="ColorPicker" component={ColorPickerScreen} />

            </Stack.Navigator>
        </NavigationContainer>
    );
}
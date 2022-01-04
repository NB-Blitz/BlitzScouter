import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from 'react';
import MediaScreen from "../components/containers/MediaScreen";
import MatchScreen from "../screens/Match/MatchScreen";
import ScoutingScreen from "../screens/Scout/ScoutingScreen";
import RegionalScreen from "../screens/Settings/RegionalScreen";
import EditTemplateScreen from "../screens/Settings/Template/EditTemplateScreen";
import ElementChooserScreen from "../screens/Settings/Template/ElementChooserScreen";
import YearScreen from "../screens/Settings/YearScreen";
import TeamScreen from "../screens/Team/TeamScreen";
import TabNavigator from "./TabNavigator";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
    return (
        <NavigationContainer theme={DarkTheme}>
            <Stack.Navigator
                screenOptions={{
                    contentStyle: { backgroundColor: "#141416" },
                    animation: "slide_from_right",
                    title: "",
                    headerStyle: { backgroundColor: "#141416" }
                }}>

                <Stack.Screen name="Drawer" component={TabNavigator} options={{ headerShown: false }} />
                <Stack.Screen name="Match" component={MatchScreen} />
                <Stack.Screen name="Team" component={TeamScreen} />
                <Stack.Screen name="Media" component={MediaScreen} options={{ animation: "fade", contentStyle: { backgroundColor: "#000000" }, headerStyle: { backgroundColor: "#000000" } }} />
                <Stack.Screen name="Scout" component={ScoutingScreen} />
                <Stack.Screen name="Year" component={YearScreen} />
                <Stack.Screen name="Regional" component={RegionalScreen} />
                <Stack.Screen name="EditTemplate" component={EditTemplateScreen} options={{}} />
                <Stack.Screen name="ElementChooser" component={ElementChooserScreen} />

            </Stack.Navigator>
        </NavigationContainer>
    );
}
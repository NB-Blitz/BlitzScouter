import { useNavigation } from "@react-navigation/core";
import React from "react";
import { StyleSheet, ToastAndroid, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import TBA from "../../../api/TBA";
import StandardButton from "../../../components/common/StandardButton";
import Subtitle from "../../../components/text/Subtitle";
import Text from "../../../components/text/Text";
import Title from "../../../components/text/Title";

/*
    While hard-coding season names isn't best practice,
    The Blue Alliance doesn't provide season names.
    While we could use First's API, that would require
    managing two seperate API connections for a single name.
*/
const INIT_YEAR = 1992;
const SEASON_NAMES = [
    "Maize Craze",
    "Rug Rage",
    "Tower Power",
    "Ramp N' Roll",         // 1995
    "Hexagon Havoc",
    "Toroid Terror",
    "Ladder Logic",
    "Double Trouble",
    "Co-operation FIRST",   // 2000
    "Diabolical Dynamics",
    "Zone Zeal",
    "Shark Attack",
    "Frenzy",
    "Triple Play",          // 2005
    "Aim High",
    "Rack N' Roll",
    "Overdrive",
    "Lunacy",
    "Breakaway",            // 2010
    "Logo Motion",
    "Rebound Rumble",
    "Ultimate Ascent",
    "Aerial Assist",
    "Recycle Rush",         // 2015
    "Stronghold",
    "Steamworks",
    "Power Up",
    "Destination: Deep Space",
    "Infinite Recharge",    // 2020
    "Infinite Recharge II",
    "Rapid React"
];

export default function YearScreen() {
    const [maxYear, setMaxYear] = React.useState(0);
    const navigator = useNavigation();

    TBA.getServerStatus().then((status) => {
        if (status)
            setMaxYear(status.max_season);
        else
            ToastAndroid.show("Failed to connect to TBA", 1000);
    });

    // Generate List
    let yearsDisplay: JSX.Element[] = [];
    if (maxYear <= INIT_YEAR) {
        yearsDisplay.push(
            <Text style={styles.loadingText} key={1}>
                Loading All Seasons...
            </Text>
        );
    }
    else {
        for (let y = maxYear; y >= INIT_YEAR; y--) {
            let year = y;
            let index = y - INIT_YEAR;
            yearsDisplay.push(
                <StandardButton
                    iconText={year.toString().substring(2)}
                    title={year.toString()}
                    subtitle={index < SEASON_NAMES.length ? SEASON_NAMES[index] : "???"}
                    onPress={() => { navigator.navigate("Regional", { year: year }) }}
                    key={year} />
            );
        }
    }

    // Display Data

    return (
        <ScrollView>
            <View style={styles.container}>
                <Title>Years</Title>
                <Subtitle>Select the target year/season</Subtitle>
                {yearsDisplay}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 20,
        paddingRight: 20
    },
    loadingText: {
        textAlign: "center",
        fontStyle: "italic"
    }
});

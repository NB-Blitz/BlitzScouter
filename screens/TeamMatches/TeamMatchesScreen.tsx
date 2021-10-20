import { useNavigation } from "@react-navigation/core";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { BlitzDB } from "../../api/BlitzDB";
import Text from "../../components/text/Text";
import MatchBanner from "../Matches/MatchBanner";

export interface TeamMatchesProps {
    teamID: string;
}

export default function TeamMatchesScreen({ route }: any) {
    const navigator = useNavigation();
    const teamID = route.params.teamID;

    // Matches
    let matchList = BlitzDB.getTeamMatches(teamID);
    let matchDisplay: JSX.Element[] = [];
    if (matchList.length > 0)
        for (let match of matchList)
            matchDisplay.push(<MatchBanner matchID={match.id} key={match.id} />);
    else
        matchDisplay.push(<Text key={1}>Match data has not been downloaded from TBA yet. Download is available under settings</Text>);

    // Return Modal
    return (
        <ScrollView>
            <View style={styles.container}>
                {matchDisplay}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 20,
        paddingRight: 20
    }
});

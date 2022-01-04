import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import BlitzDB from "../../api/BlitzDB";
import { TemplateType } from "../../api/models/TemplateModels";
import TBA from "../../api/TBA";
import HorizontalBar from "../../components/common/HorizontalBar";
import StandardButton from "../../components/common/StandardButton";
import Subtitle from "../../components/text/Subtitle";
import Title from "../../components/text/Title";
import TeamPreview from "../Matches/TeamPreview";

export interface MatchProps {
    matchID: string;
}

export default function MatchScreen({ route }: any) {
    const navigator = useNavigation();

    // Grab Match Data
    const matchID = route.params.matchID;
    const match = BlitzDB.matches.get(matchID);
    if (!(match)) {
        Alert.alert("Error", "There was an error grabbing the data from that match. Try re-downloading TBA data then try again.");
        return null;
    }

    // Grab Team List
    let redTeams = [];
    let blueTeams = [];
    for (let teamID of match.blueTeamIDs)
        blueTeams.push(<TeamPreview teamID={teamID} key={teamID} />);
    for (let teamID of match.redTeamIDs)
        redTeams.push(<TeamPreview teamID={teamID} key={teamID} />);

    // Return Modal
    return (
        <ScrollView>
            <View style={styles.container}>
                <Title>{match.name}</Title>
                <Subtitle>{match.description}</Subtitle>

                <HorizontalBar />

                <StandardButton
                    iconType={"explore"}
                    title={"Scout Match"}
                    subtitle={"Scout this match"}
                    onPress={() => { navigator.navigate("Scout", { templateType: TemplateType.Match }); }} />

                <StandardButton
                    iconType={"open-in-browser"}
                    title={"View on TBA"}
                    subtitle={"View this Match on The Blue Alliance"}
                    onPress={() => { match ? TBA.openMatch(match.id) : null }} />

                <HorizontalBar />

                <Title style={styles.allianceHeader}>Red Alliance</Title>

                <ScrollView horizontal={true}>
                    <View>
                        {redTeams}
                    </View>
                </ScrollView>

                <HorizontalBar />

                <Title style={styles.allianceHeader}>Blue Alliance</Title>

                <ScrollView horizontal={true}>
                    <View>
                        {blueTeams}
                    </View>
                </ScrollView>

                <HorizontalBar />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 20,
        paddingRight: 20
    },
    allianceHeader: {
        marginBottom: 15
    }
});

import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import TBA from "../../api/TBA";
import HorizontalBar from "../../components/common/HorizontalBar";
import StandardButton from "../../components/common/StandardButton";
import Subtitle from "../../components/text/Subtitle";
import Title from "../../components/text/Title";
import useMatch from "../../hooks/useMatch";
import useTemplate from "../../hooks/useTemplate";
import { TemplateType } from "../../types/TemplateTypes";
import TeamPreview from "../Matches/TeamPreview";

export default function MatchScreen({ route }: any) {
    const navigator = useNavigation();
    const [match, setMatch] = useMatch(route.params.matchID);
    const [template, setTemplate] = useTemplate(TemplateType.Match);

    return (
        <ScrollView>
            <View style={styles.container}>
                <Title>{match.name}</Title>
                <Subtitle>{match.description}</Subtitle>

                <HorizontalBar />

                {template.length > 0 ?
                    <StandardButton
                        iconType={"explore"}
                        title={"Scout Match"}
                        subtitle={"Scout this match"}
                        onPress={() => { navigator.navigate("TeamSelect", { matchID: match.id }); }} />
                    : undefined}

                <StandardButton
                    iconType={"open-in-browser"}
                    title={"View on TBA"}
                    subtitle={"View this Match on The Blue Alliance"}
                    onPress={() => { match ? TBA.openMatch(match.id) : null }} />

                <HorizontalBar />

                <Title style={styles.allianceHeader}>Red Alliance</Title>

                <ScrollView horizontal={true}>
                    <View>
                        {match.redTeamIDs.map(teamID => <TeamPreview teamID={teamID} key={teamID} />)}
                    </View>
                </ScrollView>

                <HorizontalBar />

                <Title style={styles.allianceHeader}>Blue Alliance</Title>

                <ScrollView horizontal={true}>
                    <View>
                        {match.blueTeamIDs.map(teamID => <TeamPreview teamID={teamID} key={teamID} />)}
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

import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { ScrollView, StyleSheet, View } from "react-native";
import Subtitle from "../../components/text/Subtitle";
import Text from '../../components/text/Text';
import Title from "../../components/text/Title";
import useMatch from '../../hooks/useMatch';
import { TemplateType } from '../../types/TemplateTypes';
import TeamBanner from '../Team/TeamBanner';

export default function TeamSelectScreen({ route }: any) {
    const navigator = useNavigation();
    const [match] = useMatch(route.params.matchID);

    const onClick = (teamID: string) => {
        navigator.navigate("Scout", { teamID: teamID, matchID: route.params.matchID, templateType: TemplateType.Match });
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Title>{match.name}</Title>
                <Subtitle style={{ marginBottom: 20 }}>Select the team to scout</Subtitle>

                <Text style={[styles.allianceHeader, { backgroundColor: "#e7311f" }]}>Red Alliance</Text>
                {match.redTeamIDs.map((teamID) => <TeamBanner teamID={teamID} onClick={onClick} key={teamID} />)}
                <View style={[styles.allianceFooter, { backgroundColor: "#e7311f" }]} />

                <Text style={[styles.allianceHeader, { backgroundColor: "#008cf1" }]}>Blue Alliance</Text>
                {match.blueTeamIDs.map((teamID) => <TeamBanner teamID={teamID} onClick={onClick} key={teamID} />)}
                <View style={[styles.allianceFooter, { backgroundColor: "#008cf1" }]} />
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
        paddingBottom: 5,
        paddingTop: 5,
        marginRight: 8,
        marginBottom: 5,
        borderRadius: 10,
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        color: "#fff"
    },
    allianceFooter: {
        borderRadius: 10,
        height: 10,
        marginRight: 8,
        marginBottom: 10
    },
});

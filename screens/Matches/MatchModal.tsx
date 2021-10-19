import React from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { BlitzDB } from "../../api/BlitzDB";
import { TBA } from "../../api/TBA";
import HorizontalBar from "../../components/common/HorizontalBar";
import Modal from "../../components/common/Modal";
import StandardButton from "../../components/common/StandardButton";
import Subtitle from "../../components/text/Subtitle";
import Title from "../../components/text/Title";
import TeamPreview from "./TeamPreview";

interface ModalProps {
    matchID: string;
    isVisible: boolean;
    setVisible: (isVisible: boolean) => void;
}

export default function MatchModal(props: ModalProps) {
    // Default Behaviour
    if (!props.isVisible)
        return null;

    // Grab Match Data
    let match = BlitzDB.getMatch(props.matchID);
    if (!(match)) {
        Alert.alert("Error", "There was an error grabbing the data from that match. Try re-downloading TBA data then try again.");
        props.setVisible(false);
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
        <Modal setVisible={props.setVisible}>

            <Title>{match.name}</Title>
            <Subtitle>{match.description}</Subtitle>

            <HorizontalBar />

            <StandardButton
                iconType={"binoculars"}
                title={"Scout Match"}
                subtitle={"Scout this match"}
                onPress={() => { }} />

            <StandardButton
                iconType={"globe"}
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
        </Modal>
    );
}

const styles = StyleSheet.create({
    allianceHeader: {
        marginBottom: 15
    }
});

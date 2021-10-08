import React from "react";
import { Alert, ScrollView, StyleSheet } from "react-native";
import { BlitzDB } from "../../api/BlitzDB";
import Button from "../../components/common/Button";
import DarkBackground from "../../components/common/DarkBackground";
import HorizontalBar from "../../components/common/HorizontalBar";
import Modal from "../../components/common/Modal";
import Text from "../../components/common/Text";
import Title from "../../components/common/Title";
import TeamBanner from "../Teams/TeamBanner";

interface ModalProps
{
    matchID: string;
    isVisible: boolean;
    setVisible: (isVisible: boolean) => void;
}

export default function MatchModal(props: ModalProps)
{
    // Default Behaviour
    if (!props.isVisible)
        return null;
            
    // Grab Match Data
    let match = BlitzDB.getMatch(props.matchID);
    if (!(match))
    {
        Alert.alert("Error", "There was an error grabbing the data from that match. Try re-downloading TBA data then try again.");
        props.setVisible(false);
        return null;
    }

    // Grab Team List
    let redTeams = [];
    let blueTeams = [];
    for (let teamID of match.blueTeamIDs)
        blueTeams.push(<TeamBanner teamID={teamID} key={teamID} />);
    for (let teamID of match.redTeamIDs)
        redTeams.push(<TeamBanner teamID={teamID} key={teamID} />);

    // Return Modal
    return (
        <Modal setVisible={props.setVisible}>
                
            <Title style={styles.title}>{match.name}</Title>
            <Title style={styles.subtitle}>{match.description}</Title>

            <HorizontalBar />

            <Title style={styles.header}>Red Alliance:</Title>
            {redTeams}
            
            <Title style={styles.header}>Blue Alliance:</Title>
            {blueTeams}
        </Modal>
    );
}

const styles = StyleSheet.create({
    media: {
        flexDirection: "row",
        marginBottom: 10
    },
    title: {
        marginBottom: 0
    },
    subtitle: {
        color: "#bbb",
        fontSize: 15
    },
    header: {
        fontSize: 24,
        marginBottom: 5
    }
});

import React from "react";
import { Alert, Modal, ScrollView, StyleSheet } from "react-native";
import { BlitzDB } from "../../api/BlitzDB";
import DarkBackground from "../../components/common/DarkBackground";
import { Button, HorizontalBar, Text, Title } from "../../components/Themed";
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
        <Modal
            animationType="slide"
            transparent={true}
            visible={true}
            onRequestClose={() => props.setVisible(false)} >

            <DarkBackground isTransparent={true} />

            <ScrollView style={styles.modal}>
                
                <Title style={styles.title}>{match.name}</Title>
                <Title style={styles.subtitle}>{match.description}</Title>

                <HorizontalBar />

                <Title style={styles.header}>Red Alliance:</Title>
                {redTeams}
                
                <Title style={styles.header}>Blue Alliance:</Title>
                {blueTeams}
            </ScrollView>

            <Button style={styles.button} onPress={() => {props.setVisible(false);}}>
                <Text style={styles.buttonText}>Return</Text>
            </Button>
        </Modal>
    );
}

const styles = StyleSheet.create({
    media: {
        flexDirection: "row",
        marginBottom: 10
    },
    button: {
        backgroundColor: "#deda04",
        position: "absolute",
        bottom: 35,
        right: 20,
        left: 20,
        borderRadius: 10
    },
    buttonText: {
        color: "#000"
    },
    modal: {
        backgroundColor: "#0b0b0b",
        flex: 1,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 20,
        marginLeft: 5,
        marginRight: 5,
        paddingTop: 30,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 70,
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

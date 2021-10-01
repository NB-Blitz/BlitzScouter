import React from "react";
import { Alert, Modal, ScrollView, StyleSheet } from "react-native";
import DarkBackground from "../../components/DarkBackground";
import { BlitzDB } from "../../components/Database/BlitzDB";
import { Button, Text, Title } from "../../components/Themed";

interface ModalProps
{
    matchID: string;
    setMatchID: Function;
}

export default function MatchModal(props: ModalProps)
{
    // Default Behaviour
    if (props.matchID === "")
        return null;
            
    // Grab Match Data
    let match = BlitzDB.getMatch(props.matchID);
    if (!(match))
    {
        Alert.alert("Error", "There was an error grabbing the data from that match. Try re-downloading TBA data then try again.");
        props.setMatchID("");
        return null;
    }

    // Return Modal
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={true}
            onRequestClose={() => props.setMatchID("")} >

            <DarkBackground />

            <ScrollView style={styles.modal}>
                
                <Title style={styles.title}>{match.name}</Title>
                <Title style={styles.subtitle}>{match.description}</Title>

                <Title style={styles.header}>Team Comments:</Title>
            </ScrollView>

            <Button style={styles.button} onPress={() => {props.setMatchID("");}}>
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
        fontSize: 24
    }
});

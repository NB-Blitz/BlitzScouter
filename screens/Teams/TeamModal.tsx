import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Alert, Image, Modal, ScrollView, StyleSheet } from "react-native";
import DarkBackground from "../../components/DarkBackground";
import { Button, Text, Title } from "../../components/Themed";
import * as ImagePicker from 'expo-image-picker';
import PhotoModal from "../../components/PhotoModal";
import { BlitzDB } from "../../components/Database/BlitzDB";

interface ModalProps
{
    teamID: string;
    setTeamID: Function;
}

export default function TeamModal(props: ModalProps)
{
    const [previewData, setPreviewPhoto] = React.useState("");

    // Default Behaviour
    if (props.teamID === "")
        return null;
            
    // Grab Team Data
    let team = BlitzDB.getTeam(props.teamID);
    if (!(team))
    {
        Alert.alert("Error", "There was an error grabbing the data from that team. Try re-downloading TBA data then try again.");
        props.setTeamID("");
        return null;
    }

    // Grab Team Media
    let mediaList: JSX.Element[] = [];
    for (let imageData of team.media)
    {
        let preview = imageData;
        mediaList.push(
            <Button
                style={styles.imageButton}
                onPress={() => setPreviewPhoto(preview)}
                key={Math.random()}>
                <Image style={styles.thumbnail} source={{uri:imageData}} key={Math.random()}/>
            </Button>
        );
    }

    // Return Modal
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={true}
            onRequestClose={() => props.setTeamID("")} >

            <DarkBackground />

            <ScrollView style={styles.modal}>
                <ScrollView style={styles.media} horizontal={true}>
                    {mediaList}

                    <Button
                        style={styles.imageButton}
                        onPress={async () => {addPhoto(props.teamID)}}>
                        <FontAwesome 
                            size={20}
                            name={"plus"}
                            color={"white"}
                            style={{marginRight:3}}/>
                        <FontAwesome 
                            size={30}
                            name={"camera"}
                            color={"white"}/>
                    </Button>

                    <Button
                        style={styles.imageButton}
                        onPress={async () => {addFile(props.teamID)}}>
                        <FontAwesome 
                            size={20}
                            name={"plus"}
                            color={"white"}
                            style={{marginRight:3}}/>
                        <FontAwesome 
                            size={30}
                            name={"folder"}
                            color={"white"}/>
                    </Button>
                </ScrollView>
                
                <Title style={styles.title}>{team ? team.name : ""}</Title>
                <Title style={styles.subtitle}>{team ? team.number : ""}</Title>

                <Title style={styles.header}>Team Comments:</Title>
            </ScrollView>

            <Button style={styles.button} onPress={() => {props.setTeamID("");}}>
                <Text style={styles.buttonText}>Return</Text>
            </Button>
            
            <PhotoModal imageData={previewData} setImageData={setPreviewPhoto} />
        </Modal>
    );
}

function addPhoto(teamID: string)
{
    return ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: .5,
            
            base64: true
    }).then(result => {
        if (result.cancelled)
            return;
        if (!result.base64)
            return;

        BlitzDB.addTeamMedia(teamID, result.base64);
    });
}

function addFile(teamID: string)
{
    return ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: .5,
            
            base64: true
    }).then(result => {
        if (result.cancelled)
            return;
        if (!result.base64)
            return;

        BlitzDB.addTeamMedia(teamID, result.base64);
    });
}

const styles = StyleSheet.create({
    media: {
        marginBottom: 10,
        height: 150,
        width: "100%"
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
        backgroundColor: "#0c0c0c",
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
        fontSize: 30
    },
    header: {
        fontSize: 24
    },
    thumbnail: {
        height: 150,
        width: 150,
        margin: 5
    },
    imageButton: {
        height: 150,
        width: 150,
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "#333",
        margin: 5
    }
});

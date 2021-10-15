import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Alert, Image, ScrollView, StyleSheet } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import PhotoModal from "../../components/containers/PhotoModal";
import { BlitzDB } from "../../api/BlitzDB";
import Button from "../../components/common/Button";
import HorizontalBar from "../../components/common/HorizontalBar";
import Modal from "../../components/common/Modal";
import Title from "../../components/text/Title";
import Subtitle from "../../components/text/Subtitle";
import StandardButton from "../../components/common/StandardButton";

interface ModalProps
{
    teamID: string;
    isVisible: boolean;
    setVisible: (isVisible: boolean) => void;
}

export default function TeamModal(props: ModalProps)
{
    const [previewData, setPreviewPhoto] = React.useState("");
    const [version, setVersion] = React.useState(0);

    // Default Behaviour
    if (!props.isVisible)
        return null;

    // Re-render on New Media
    BlitzDB.eventEmitter.addListener("mediaUpdate", () => {
        BlitzDB.eventEmitter.removeCurrentListener();
        setVersion(version + 1);
    });
            
    // Grab Team Data
    let team = BlitzDB.getTeam(props.teamID);
    if (!(team))
    {
        Alert.alert("Error", "There was an error grabbing the data from that team. Try re-downloading TBA data then try again.");
        props.setVisible(false);
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
        <Modal setVisible={props.setVisible}>

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
            
            <Title>{team.name}</Title>
            <Subtitle>{team.number}</Subtitle>

            <HorizontalBar />

            <StandardButton
                iconType={"binoculars"}
                title={"Scout Team"}
                subtitle={"Pit scout this team"}
                onPress={() => {}} />

            <StandardButton
                iconType={"list"}
                title={"List Matches"}
                subtitle={"List the matches Team " + team.number + " is in"}
                onPress={() => {}} />

            <HorizontalBar />

            <PhotoModal
                imageData={previewData}
                setImageData={setPreviewPhoto}
            />
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
        backgroundColor: "#444",
        margin: 5
    },
});

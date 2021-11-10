import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Alert, Dimensions, Image, Modal, StyleSheet, ToastAndroid, View } from "react-native";
import BlitzDB from "../../api/BlitzDB";
import Button from "../common/Button";
import DarkBackground from "../common/DarkBackground";
import Text from "../text/Text";

interface PhotoProps {
    teamID: string;
    imageIndex: number;
    setImageIndex: (imageIndex: number) => void;
}

// TODO Photo Zoom, Delete, and Re-Arrange
export default function PhotoModal(props: PhotoProps) {
    if (props.imageIndex < 0)
        return null;

    // Team
    let team = BlitzDB.teams.get(props.teamID);
    if (!(team)) {
        Alert.alert("Error", "There was an error grabbing the data from that team. Try re-downloading TBA data then try again.");
        props.setImageIndex(-1);
        return null;
    }

    // Media
    if (props.imageIndex >= team.media.length)
        return null;
    let mediaData = team.media[props.imageIndex]

    return (
        <Modal
            animationType="fade"
            onRequestClose={() => props.setImageIndex(-1)} >

            <View style={styles.container}>
                <DarkBackground isTransparent={false} />
                <Image style={styles.image} source={{ uri: mediaData }} />

                <View style={styles.buttonBar}>
                    <Button
                        style={styles.button}
                        onPress={() => { shareImage(mediaData); }} >
                        <FontAwesome
                            name="share-alt"
                            size={26}
                            color={"white"} />
                        <Text style={styles.buttonText}>Share</Text>
                    </Button>

                    <Button
                        style={styles.button}
                        onPress={() => { setThumbnail(props.teamID, props.imageIndex); }} >
                        <FontAwesome
                            name="image"
                            size={26}
                            color={"white"} />
                        <Text style={styles.buttonText}>Set Thumb</Text>
                    </Button>

                    <Button
                        style={styles.button}
                        onPress={() => { setRobot(props.teamID, props.imageIndex); }} >
                        <FontAwesome
                            name="android"
                            size={26}
                            color={"white"} />
                        <Text style={styles.buttonText}>Set Robot</Text>
                    </Button>

                    <Button
                        style={styles.button}
                        onPress={() => { trashImage(props.teamID, props.imageIndex); }} >
                        <FontAwesome
                            name="trash-o"
                            size={26}
                            color={"white"} />
                        <Text style={styles.buttonText}>Delete</Text>
                    </Button>
                </View>

            </View>
        </Modal>
    );
}

function trashImage(teamID: string, imageIndex: number) {
    Alert.alert("Are you sure?", "Are you sure you want to delete this image?",
        [
            {
                text: "Confirm",
                onPress: () => { /*BlitzDB.removeTeamMedia(teamID, imageIndex);*/ }
            },
            {
                text: "Cancel",
                style: "cancel"
            }
        ], { cancelable: true }
    );
}

function setThumbnail(teamID: string, imageIndex: number) {
    Alert.alert("Are you sure?", "Are you sure you want to set this as Team Thumbnail?",
        [
            {
                text: "Confirm",
                onPress: () => { /*BlitzDB.swapTeamMedia(teamID, imageIndex, 0);*/ }
            },
            {
                text: "Cancel",
                style: "cancel"
            }
        ], { cancelable: true }
    );
}

function setRobot(teamID: string, imageIndex: number) {
    Alert.alert("Are you sure?", "Are you sure you want to set this as the Robot Image?",
        [
            {
                text: "Confirm",
                onPress: () => { /*BlitzDB.swapTeamMedia(teamID, imageIndex);*/ }
            },
            {
                text: "Cancel",
                style: "cancel"
            }
        ], { cancelable: true }
    );
}

function shareImage(mediaData: string) {
    // TODO Convert the storage medium for image data from sqlite to local device storage
    //Sharing.shareAsync(mediaData); // <-- Using the Expo Sharing Library

    ToastAndroid.show("To be implemented!", ToastAndroid.SHORT);
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        justifyContent: "center",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0

    },
    image: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width
    },
    button: {
        minWidth: 80
    },
    buttonText: {
        fontSize: 12,
        marginTop: 1
    },
    buttonBar: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "space-evenly"
    }
});

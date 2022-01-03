import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Alert, Dimensions, Image, StyleSheet, ToastAndroid, View } from "react-native";
import BlitzDB from "../../api/BlitzDB";
import Button from "../common/Button";
import DarkBackground from "../common/DarkBackground";
import Text from "../text/Text";
import PanZoomContainer from "./PanZoomContainer";

export default function MediaScreen({ route }: any) {
    const teamID = route.params.teamID as string;
    const imageIndex = route.params.imageIndex as number;

    // Team
    let team = BlitzDB.teams.get(teamID);
    if (!(team)) {
        Alert.alert("Error", "There was an error grabbing the data from that team. Try re-downloading TBA data then try again.");
        return null;
    }

    // Media
    if (imageIndex >= team.media.length)
        return null;
    let mediaData = team.media[imageIndex];

    return (
        <View style={styles.container}>
            <DarkBackground isTransparent={false} />
            <PanZoomContainer>
                <Image source={{ uri: mediaData }} style={styles.image} />
            </PanZoomContainer>

            <View style={styles.buttonBar}>
                <Button
                    style={styles.button}
                    onPress={() => { shareImage(mediaData); }} >
                    <MaterialIcons
                        name="ios-share"
                        size={26}
                        color={"white"} />
                    <Text style={styles.buttonText}>Share</Text>
                </Button>

                <Button
                    style={styles.button}
                    onPress={() => { trashImage(teamID, imageIndex); }} >
                    <MaterialIcons
                        name="delete-outline"
                        size={26}
                        color={"white"} />
                    <Text style={styles.buttonText}>Delete</Text>
                </Button>
            </View>

        </View>
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

function shareImage(mediaData: string) {
    // TODO Convert the storage medium for image data from sqlite to local device storage
    //Sharing.shareAsync(mediaData); // <-- Using the Expo Sharing Library

    ToastAndroid.show("To be implemented!", ToastAndroid.SHORT);
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0

    },
    image: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width,
        borderRadius: 5
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

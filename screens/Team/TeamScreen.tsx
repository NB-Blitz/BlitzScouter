import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import * as ImagePicker from 'expo-image-picker';
import React from "react";
import { Alert, Dimensions, Image, ScrollView, StyleSheet, View } from "react-native";
import BlitzDB from "../../api/BlitzDB";
import TBA from "../../api/TBA";
import Button from "../../components/common/Button";
import HorizontalBar from "../../components/common/HorizontalBar";
import StandardButton from "../../components/common/StandardButton";
import Subtitle from "../../components/text/Subtitle";
import Title from "../../components/text/Title";

export interface TeamProps {
    teamID: string;
}

export default function TeamScreen({ route }: any) {
    const [version, setVersion] = React.useState(0);
    const navigator = useNavigation();
    const teamID = route.params.teamID;

    // Re-render on New Media
    /*BlitzDB.eventEmitter.addListener("mediaUpdate", () => {
        BlitzDB.eventEmitter.removeCurrentListener();
        setVersion(version + 1);
        setPreviewIndex(-1);
    });*/

    // Grab Team Data
    let team = BlitzDB.teams.get(teamID);
    if (!team) {
        Alert.alert("Error", "There was an error grabbing the data from that team. Try re-downloading TBA data then try again.");
        return null;
    }

    // Grab Team Media
    let mediaList: JSX.Element[] = [];
    for (let i = 0; i < team.media.length; i++) {
        let imageData = team.media[i];
        mediaList.push(
            <Button
                style={styles.imageButton}
                onPress={() => { navigator.navigate("Media", { teamID: teamID, imageIndex: i }); }}
                key={Math.random()}>
                <Image style={styles.thumbnail} source={{ uri: imageData }} key={Math.random()} />
            </Button>
        );
    }

    // Return Modal
    return (
        <ScrollView>
            <View style={styles.container}>
                <ScrollView style={styles.media} horizontal={true}>
                    {mediaList}

                    <Button
                        style={styles.imageButton}
                        onPress={async () => { addPhoto(teamID) }}>
                        <FontAwesome
                            size={20}
                            name={"plus"}
                            color={"white"}
                            style={{ marginRight: 3 }} />
                        <FontAwesome
                            size={30}
                            name={"camera"}
                            color={"white"} />
                    </Button>

                    <Button
                        style={styles.imageButton}
                        onPress={async () => { addFile(teamID) }}>
                        <FontAwesome
                            size={20}
                            name={"plus"}
                            color={"white"}
                            style={{ marginRight: 3 }} />
                        <FontAwesome
                            size={30}
                            name={"folder"}
                            color={"white"} />
                    </Button>
                </ScrollView>

                <Title>{team.name}</Title>
                <Subtitle>{team.number}</Subtitle>

                <HorizontalBar />

                <StandardButton
                    iconType={"explore"}
                    title={"Scout Team"}
                    subtitle={"Pit scout this team"}
                    onPress={() => { }} />


                {/*<StandardButton
                    iconType={"list"}
                    title={"List Matches"}
                    subtitle={"List the matches Team " + team.number + " is in"}
                    onPress={() => { navigator.navigate("TeamMatches", { teamID }) }} />*/}

                <StandardButton
                    iconType={"open-in-browser"}
                    title={"View on TBA"}
                    subtitle={"View Team " + team.number + " on The Blue Alliance"}
                    onPress={() => { team ? TBA.openTeam(team.number) : null }} />

                <HorizontalBar />
            </View>
        </ScrollView>
    );
}

function addPhoto(teamID: string) {
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

        BlitzDB.teams.addMedia(teamID, result.base64);
    });
}

function addFile(teamID: string) {
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

        BlitzDB.teams.addMedia(teamID, result.base64);
    });
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 20,
        paddingRight: 20
    },
    media: {
        marginBottom: 10,
        marginLeft: -20,
        height: 200,
        width: Dimensions.get("window").width
    },
    thumbnail: {
        height: 200,
        width: 200,
        borderRadius: 1
    },
    imageButton: {
        height: 200,
        width: 200,
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "#444"
    },
});

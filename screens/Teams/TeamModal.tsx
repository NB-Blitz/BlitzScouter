import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Alert, Dimensions, Image, Modal, ScrollView, StyleSheet, TextInput, View } from "react-native";
import DarkBackground from "../../components/common/DarkBackground";
import { Button, HorizontalBar, Text, Title } from "../../components/Themed";
import * as ImagePicker from 'expo-image-picker';
import PhotoModal from "../../components/PhotoModal";
import { BlitzDB } from "../../api/BlitzDB";

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

    BlitzDB.eventEmitter.addListener("mediaUpdate", () => {
        BlitzDB.eventEmitter.removeCurrentListener();
        setVersion(version + 1);
    });

    // Default Behaviour
    if (!props.isVisible)
        return null;
            
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
        <Modal
            animationType="slide"
            transparent={true}
            visible={true}
            onRequestClose={() => props.setVisible(false)} >

            <DarkBackground isTransparent={true} />

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

                <HorizontalBar />

                <View style={{flexDirection: "row", height: 50}}>
                    <TextInput 
                        placeholder="Comment..."
                        placeholderTextColor="#fff"
                        style={styles.textInput}
                        multiline={true}
                    />
                    <Button
                        style={styles.sendCommentButton}>
                        <FontAwesome 
                            size={20}
                            name={"arrow-right"}
                            color={"white"}
                            style={{marginBottom: 20}}/>
                    </Button>
                </View>
                
            </ScrollView>

            <Button style={styles.button} onPress={() => {props.setVisible(false);}}>
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
    textInput: {
        color: "#fff",
        backgroundColor: "#222222",
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        marginTop: -10,
        marginRight: 10,
        width: Dimensions.get("screen").width - 100
    },
    sendCommentButton: {
        flexDirection: "row"
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

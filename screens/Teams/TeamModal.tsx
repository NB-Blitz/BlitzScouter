import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Alert, Dimensions, Image, ScrollView, StyleSheet, TextInput, View } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import PhotoModal from "../../components/containers/PhotoModal";
import { BlitzDB } from "../../api/BlitzDB";
import Button from "../../components/common/Button";
import Title from "../../components/common/Title";
import HorizontalBar from "../../components/common/HorizontalBar";
import Text from "../../components/common/Text";
import Modal from "../../components/common/Modal";

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

    // Grab Team Comments
    let commentList: JSX.Element[] = [];
    if (team.comments.length > 0)
    {
        for (let comment of team.comments)
        {
            let commentTime = new Date(comment.timestamp);
            commentList.push(
                <View key={Math.random()} style={styles.comment}>
                    <Text>{comment.text}</Text>
                    <Text>{commentTime.getHours() + ":" + commentTime.getMinutes()}</Text>
                </View>
            );
        }
    }
    else
    {
        commentList.push(
            <Text key={0}>There are no comments yet...</Text>
        );
    }
    
    // Comment Data
    let commentText: string;
    let commentInput: TextInput | null;

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
            
            <Title style={styles.title}>{team ? team.name : ""}</Title>
            <Title style={styles.subtitle}>{team ? team.number : ""}</Title>

            <HorizontalBar />

            <View style={{flexDirection: "row", height: 50}}>
                <TextInput 
                    placeholder="Comment..."
                    placeholderTextColor="#fff"
                    style={styles.textInput}
                    multiline={true}
                    onChangeText={text => { commentText = text }}
                    ref={input => {commentInput = input}}
                />
                <Button
                    style={styles.sendCommentButton}
                    onPress={() => {
                        BlitzDB.addTeamComment(props.teamID, commentText);
                        if (commentInput)
                            commentInput.clear();
                    }}>
                    <FontAwesome 
                        size={20}
                        name={"arrow-right"}
                        color={"white"}
                        style={{marginBottom: 20}}
                    />
                </Button>
            </View>

            {commentList}

            
            
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
    },
    comment: {
        backgroundColor: "#111",
        borderRadius: 10,
        marginBottom: 5,
        padding: 10
    }
});

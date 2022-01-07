import { MaterialIcons } from "@expo/vector-icons";
import * as Sharing from 'expo-sharing';
import React from "react";
import { Alert, Dimensions, Image, StyleSheet, View } from "react-native";
import Button from "../common/Button";
import DarkBackground from "../common/DarkBackground";
import Text from "../text/Text";
import PanZoomContainer from "./PanZoomContainer";

export default function MediaScreen({ route }: any) {
    const mediaPath = route.params.mediaPath;

    const shareImage = () => {
        Sharing.shareAsync(mediaPath);
    }

    const deleteImage = () => {
        Alert.alert("Are you sure?", "Are you sure you want to delete this image?",
            [
                {
                    text: "Confirm",
                    onPress: () => { }
                },
                {
                    text: "Cancel",
                    style: "cancel"
                }
            ], { cancelable: true }
        );
    }

    return (
        <View style={styles.container}>
            <DarkBackground isTransparent={false} />
            <PanZoomContainer>
                <Image source={{ uri: mediaPath }} style={styles.image} />
            </PanZoomContainer>

            <View style={styles.buttonBar}>
                <Button
                    style={styles.button}
                    onPress={() => { shareImage(); }} >
                    <MaterialIcons
                        name="ios-share"
                        size={26}
                        color={"white"} />
                    <Text style={styles.buttonText}>Share</Text>
                </Button>

                <Button
                    style={styles.button}
                    onPress={() => { deleteImage(); }} >
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

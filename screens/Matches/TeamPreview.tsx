import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import * as React from 'react';
import { Alert, Image, StyleSheet, View } from "react-native";
import BlitzDB from '../../api/BlitzDB';
import Button from '../../components/common/Button';
import Text from '../../components/text/Text';

interface TeamThumbnailProps {
    teamID: string
}

export default function TeamPreview(props: TeamThumbnailProps) {
    const navigator = useNavigation();

    // Grab Team Data
    let team = BlitzDB.teams.get(props.teamID);
    if (!(team)) {
        Alert.alert("Error", "There was an error grabbing the data from that team. Try re-downloading TBA data then try again.");
        return null;
    }

    // Grab Team Media
    let mediaIcon: JSX.Element;
    if (team.media.length > 0) {
        let preview = team.media[team.media.length - 1];
        mediaIcon = (
            <Image
                style={styles.thumbnail}
                source={{ uri: preview }}
                key={Math.random()} />
        );
    }
    else {
        mediaIcon = (
            <View style={styles.thumbnail}>
                <MaterialIcons
                    name="block"
                    size={50}
                    color={"#aaa"} />
            </View>
        );
    }


    return (
        <Button
            style={styles.container}
            onPress={() => { navigator.navigate("Team", { teamID: team ? team.id : "" }) }} >

            {mediaIcon}

            <View style={styles.subContainer}>
                <Text style={styles.teamName}>{team.name}</Text>
                <Text style={styles.teamDesc}>{team.number}</Text>

            </View>
        </Button>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        flexDirection: "row",
        height: 200
    },
    subContainer: {
        width: "100%"
    },
    background: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "black"
    },
    thumbnail: {
        height: 200,
        width: 200,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#444",
        marginRight: 15,
        borderRadius: 5
    },
    teamName: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "left",
        width: 100
    },
    teamDesc: {
        color: "#bbb",
        fontWeight: "bold"
    },
});

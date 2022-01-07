import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import * as React from 'react';
import { Image, StyleSheet, View } from "react-native";
import Button from '../../components/common/Button';
import Text from '../../components/text/Text';
import useTeam from '../../hooks/useTeam';


export default function TeamPreview(props: { teamID: string }) {
    const navigator = useNavigation();
    const [team, setTeam] = useTeam(props.teamID);

    let mediaIcon: JSX.Element;
    if (team.mediaPaths.length > 0) {
        mediaIcon = (
            <Image
                style={styles.thumbnail}
                source={{ uri: team.mediaPaths[team.mediaPaths.length - 1] }}
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
            onPress={() => { navigator.navigate("Team", { teamID: team.id }) }} >

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

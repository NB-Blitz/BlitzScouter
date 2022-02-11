import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import * as React from 'react';
import { Image, StyleSheet, View } from "react-native";
import Button from '../../components/common/Button';
import Text from '../../components/text/Text';
import { PaletteContext } from '../../context/PaletteContext';
import useTeam from '../../hooks/useTeam';
import StatTable from '../Team/Stats/StatTable';


export default function TeamPreview(props: { teamID: string }) {
    const paletteContext = React.useContext(PaletteContext);
    const navigator = useNavigation();
    const [team, setTeam] = useTeam(props.teamID);

    const decToString = (num: number) => {
        return (Math.round(num * 10) / 10).toString()
    }

    // Media
    let mediaIcon: JSX.Element;
    if (team.mediaPaths.length > 0) {
        mediaIcon = (
            <View style={styles.thumbnail}>
                <Image
                    style={styles.thumbnail}
                    source={{ uri: team.mediaPaths[team.mediaPaths.length - 1] }}
                    key={team.id + "-" + (team.mediaPaths.length - 1)} />
            </View>
        );
    }
    else {
        mediaIcon = (
            <View style={{ padding: 1 }}>
                <View style={[styles.thumbnail, { backgroundColor: paletteContext.palette.navigation }]}>
                    <MaterialIcons
                        name="block"
                        size={40}
                        color={paletteContext.palette.textPrimary} />
                </View>

            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Button style={styles.button}
                onPress={() => { navigator.navigate("Team", { teamID: team.id }) }} >

                {mediaIcon}

                <View style={styles.subContainer}>
                    <Text style={[styles.title, { color: paletteContext.palette.textPrimary }]}>{team.name.substring(0, 16) + (team.name.length > 16 ? "..." : "")}</Text>
                    <Text style={[styles.subtitle, { color: paletteContext.palette.textSecondary }]}>{team.number}</Text>
                </View>
            </Button>

            <StatTable teamID={props.teamID} cols={1} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 100,
        flexDirection: "column",
    },
    button: {
        flexDirection: "column",
        padding: 0
    },
    subContainer: {
        height: 100,
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center"
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
        width: "100%",
        aspectRatio: 1,
        padding: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
    subtitle: {
        fontWeight: "bold",
        textAlign: "center"
    }
});

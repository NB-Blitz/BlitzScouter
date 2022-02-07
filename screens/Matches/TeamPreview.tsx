import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import * as React from 'react';
import { Image, StyleSheet, View } from "react-native";
import Button from '../../components/common/Button';
import Text from '../../components/text/Text';
import { PaletteContext } from '../../context/PaletteContext';
import useStats from '../../hooks/useStats';
import useTeam from '../../hooks/useTeam';


export default function TeamPreview(props: { teamID: string }) {
    const paletteContext = React.useContext(PaletteContext);
    const navigator = useNavigation();
    const [team, setTeam] = useTeam(props.teamID);
    const stats = useStats(props.teamID);

    const decToString = (num: number) => {
        return (Math.round(num * 10) / 10).toString()
    }

    // Media
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
                    color={paletteContext.palette.textPrimary} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Button style={styles.button}
                onPress={() => { navigator.navigate("Team", { teamID: team.id }) }} >

                {mediaIcon}

                <View style={styles.subContainer}>
                    <Text style={[styles.title, { color: paletteContext.palette.textPrimary }]}>{team.name}</Text>
                    <Text style={[styles.subtitle, { color: paletteContext.palette.textSecondary }]}>{team.number}</Text>

                </View>
            </Button>

            {stats.map((element, index) =>
                <View key={index} style={styles.subContainer}>
                    <Text style={[styles.title, { color: paletteContext.palette.textPrimary }]}>{decToString(element.average)}</Text>
                    <Text style={[styles.subtitle, { color: paletteContext.palette.textSecondary }]}>{element.label}</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        flexDirection: "row",
        height: 200
    },
    button: {
        flexDirection: "row"
    },
    subContainer: {
        margin: 5,
        width: 150,
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
        height: 200,
        width: 200,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#444",
        marginRight: 15,
        borderRadius: 5
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center"
    },
    subtitle: {
        fontWeight: "bold",
        textAlign: "center"
    },
});

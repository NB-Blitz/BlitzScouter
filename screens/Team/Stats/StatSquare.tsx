import React from "react";
import { StyleSheet, View } from "react-native";
import Text from "../../../components/text/Text";
import { usePalette } from "../../../hooks/usePalette";

export default function StatSquare(props: { name: string, value: string, percentile: number }) {
    const [palette] = usePalette();

    const percentToRGB = (percent: number) => {
        var hue = percent * 120;
        return "hsl(" + hue + ",100%,50%)";
    }

    return (
        <View style={[styles.statContainer, { backgroundColor: palette.innerBox }]}>
            <Text style={styles.statName}>{props.value}</Text>
            <Text style={styles.statValue}>{props.name}</Text>
            <View style={[styles.statGraph, {
                top: Math.round(100 - props.percentile * 100) + "%",
                backgroundColor: percentToRGB(props.percentile)
            }]} />
        </View>
    );
}


const styles = StyleSheet.create({
    statContainer: {
        borderRadius: 8,
        padding: 5,
        justifyContent: "center",
        flex: 1,
        aspectRatio: 1.2,
        margin: 1
    },
    statName: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
    statValue: {
        fontSize: 12,
        textAlign: "center",
    },
    statGraph: {
        position: "absolute",
        left: 0,
        bottom: 0,
        right: 0,
        opacity: .4,
        borderRadius: 8
    }
});

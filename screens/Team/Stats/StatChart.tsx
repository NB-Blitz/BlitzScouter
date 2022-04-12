import React from "react";
import { StyleSheet, View } from "react-native";
import Text from "../../../components/text/Text";
import { usePalette } from "../../../hooks/usePalette";


export function StatChart(props: { label: string, values: number[], max: number }) {
    const [palette] = usePalette();

    const values = props.values;
    const percentiles = values.map((val) => val / props.max);

    const decToString = (num: number) => {
        return (Math.round(num * 10) / 10).toString()
    }
    const percentToRGB = (percent: number) => {
        var hue = percent * 120;
        return "hsl(" + hue + ",100%,50%)";
    }

    return (
        <View style={[styles.container, { backgroundColor: palette.innerBox }]}>
            <Text style={styles.chartLabel}>{props.label}</Text>
            <View style={{ flex: 1, flexDirection: "row" }} >
                {percentiles.map((percentile, index) =>
                    <View style={styles.barContainer} key={index}>
                        <View style={[styles.bar, { backgroundColor: percentToRGB(percentile), top: Math.round(100 - percentile * 100) + "%" }]} />
                        <Text style={[styles.barLabel, { top: Math.round(100 - percentile * 100 - (percentile < .25 ? 30 : 0)) + "%" }]}>
                            {decToString(props.values[index])}
                        </Text>
                    </View>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 100,
        flex: 1,
        padding: 2,
        borderRadius: 4,
        margin: 5
    },
    chartLabel: {
        width: "100%",
        fontWeight: "bold",
        textAlign: "center",
        margin: 5
    },
    barContainer: {
        flex: 1,
        justifyContent: "center",
    },
    bar: {
        position: "absolute",
        left: 0,
        bottom: 0,
        right: 0,
        opacity: .4,
        borderRadius: 4,
        marginLeft: 1
    },
    barLabel: {
        position: "absolute",
        left: 0,
        bottom: 0,
        right: 0,
        fontSize: 10,
        fontWeight: "bold",
        textAlign: "center",
        textAlignVertical: "center"
    }
});
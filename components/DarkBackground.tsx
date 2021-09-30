import React from "react";
import { StyleSheet, View } from "react-native";

export default function DarkBackground()
{
    return (
        <View style={styles.background} />
    );
}

const styles = StyleSheet.create({
    background: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "black",
        opacity: 0.6
    }
});

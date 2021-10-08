import React from "react";
import { StyleSheet, View } from "react-native";

interface DarkBackgroundProps
{
    isTransparent: boolean;
}

export default function DarkBackground(props: DarkBackgroundProps)
{
    return (
        <View style={{...styles.background, opacity: props.isTransparent ? .6 : 1}} />
    );
}

const styles = StyleSheet.create({
    background: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "black"
    }
});

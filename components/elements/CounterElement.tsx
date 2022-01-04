import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Vibration, View } from "react-native";
import BlitzDB from "../../api/BlitzDB";
import { ElementProps } from "../../api/models/TemplateModels";
import Button from "../common/Button";
import Title from "../text/Title";

export default function CounterElement(props: ElementProps) {
    let elementData = props.data;
    const defaultValue = elementData.options.defaultValue;
    const [value, setValue] = React.useState(defaultValue ? defaultValue as number : 0);

    // Value State Change
    const changeValue = (delta: number) => {
        // Update
        let newValue = value;
        if (value + delta >= 0) {
            newValue += delta;
            setValue(newValue);
        }

        // Edit
        if (props.isEditable) {
            elementData.options.defaultValue = newValue;
            BlitzDB.matchTemplate.setElement(elementData);
        }

        // Vibrate
        if (delta > 0)
            Vibration.vibrate(10);
        else
            Vibration.vibrate(100);

        // Callback
        if (props.onChange)
            props.onChange(newValue);
    }

    return (
        <View style={styles.container}>
            <Title style={styles.title}>{value}</Title>
            <Button
                style={[styles.button, { backgroundColor: "#1ccc43" }]}
                onPress={() => { changeValue(1); }}>

                <MaterialIcons name="add" size={30} style={{ color: "#ffffff" }} />

            </Button>
            <Button
                style={[styles.button, { backgroundColor: "#cc271d" }]}
                onPress={() => { changeValue(-1); }}>

                <MaterialIcons name="remove" size={30} style={{ color: "#ffffff" }} />

            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    textInput: {
        color: "#fff",
        backgroundColor: "#222222",
        borderRadius: 10,
        padding: 5,
        margin: 5,
        fontSize: 15
    },
    title: {
        width: 50,
        textAlign: "center"
    },
    button: {
        height: 50,
        width: 100,
        borderRadius: 5,
        paddingLeft: 35,
        margin: 5,

        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        alignSelf: 'stretch',
    }
});

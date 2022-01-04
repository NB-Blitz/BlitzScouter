import React from "react";
import { StyleSheet, TextInput } from "react-native";
import BlitzDB from "../../api/BlitzDB";
import { ElementProps } from "../../api/models/TemplateModels";
import Subtitle from "../text/Subtitle";

export default function SubtitleElement(props: ElementProps) {
    let elementData = props.data;
    if (props.isEditable) {
        const onEdit = (text: string) => {
            elementData.label = text;
            BlitzDB.matchTemplate.setElement(elementData);
        }

        return (
            <TextInput
                defaultValue={elementData.label}
                placeholder="Subtitle"
                placeholderTextColor="#ccc"
                onChangeText={onEdit}
                style={styles.textInput}></TextInput>
        );
    }
    else {
        return (
            <Subtitle>{elementData.label}</Subtitle>
        );
    }
}

const styles = StyleSheet.create({
    textInput: {
        color: "#bbb",
        backgroundColor: "#222222",
        borderRadius: 10,
        padding: 5,
        margin: 5,
        fontSize: 15,
        fontWeight: "bold"
    }
});

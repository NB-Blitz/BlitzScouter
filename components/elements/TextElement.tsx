import React from "react";
import { StyleSheet, TextInput } from "react-native";
import BlitzDB from "../../api/BlitzDB";
import { ElementProps } from "../../api/models/TemplateModels";
import Text from "../text/Text";

export default function TextElement(props: ElementProps) {
    let elementData = props.data;
    if (props.isEditable) {
        const onEdit = (text: string) => {
            elementData.label = text;
            BlitzDB.matchTemplate.setElement(elementData);
        }

        return (
            <TextInput
                defaultValue={elementData.label}
                placeholder="Text"
                placeholderTextColor="#bbb"
                onChangeText={onEdit}
                style={styles.textInput}
                multiline={true}></TextInput>
        );
    }
    else {
        return (
            <Text>{elementData.label}</Text>
        );
    }
}

const styles = StyleSheet.create({
    textInput: {
        color: "#fff",
        backgroundColor: "#222222",
        borderRadius: 10,
        padding: 5,
        margin: 5,
        fontSize: 15
    }
});

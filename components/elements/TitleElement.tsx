import React from "react";
import { StyleSheet, TextInput } from "react-native";
import { ElementProps } from "../../types/TemplateTypes";
import Title from "../text/Title";

export default function TitleElement(props: ElementProps) {
    let elementData = props.data;
    if (props.isEditable) {
        const onEdit = (text: string) => {
            elementData.label = text;
            if (props.onChange)
                props.onChange(elementData);
        }

        return (
            <TextInput
                defaultValue={elementData.label}
                placeholder="Title"
                placeholderTextColor="#bbb"
                onChangeText={onEdit}
                style={styles.textInput}></TextInput>
        );
    }
    else {
        return (
            <Title>{elementData.label}</Title>
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
        fontSize: 30,
        fontWeight: "bold"
    }
});

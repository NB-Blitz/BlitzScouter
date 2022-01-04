import React from "react";
import { StyleSheet, TextInput } from "react-native";
import BlitzDB from "../../api/BlitzDB";
import { ElementProps } from "../../api/models/TemplateModels";

export default function TextBoxElement(props: ElementProps) {
    let elementData = props.data;

    const onEdit = (text: string) => {
        elementData.label = text;
        BlitzDB.matchTemplate.setElement(elementData);
    };

    const onScoutingEdit = (text: string) => {
        if (props.onChange)
            props.onChange(text);
    }

    return (
        <TextInput
            defaultValue={props.isEditable ? elementData.label : undefined}
            placeholder={props.isEditable ? "Placeholder Text (Text Box)" : elementData.label}
            placeholderTextColor={"#bbb"}
            onChangeText={props.isEditable ? onEdit : onScoutingEdit}
            style={styles.textInput}
            multiline={true}></TextInput>
    );
}

const styles = StyleSheet.create({
    textInput: {
        color: "#fff",
        backgroundColor: "#222222",
        borderRadius: 10,
        padding: 10,
        margin: 5,
        fontSize: 15,
        height: 100,
        textAlignVertical: "top"
    }
});

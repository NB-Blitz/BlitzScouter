import React from "react";
import { StyleSheet, TextInput } from "react-native";
import { ElementProps } from "../../types/TemplateTypes";

export default function TextBoxElement(props: ElementProps) {
    let elementData = props.data;

    // Default Value
    if (elementData.value === undefined && props.onChange) {
        elementData.value = "";
        props.onChange(elementData);
    }

    // On Edit
    const onEdit = (text: string) => {
        elementData.label = text;
        if (props.onChange)
            props.onChange(elementData);
    };

    // On Scout
    const onScoutingEdit = (text: string) => {
        elementData.value = text;
        if (props.onChange)
            props.onChange(elementData);
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

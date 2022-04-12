import React from "react";
import { StyleSheet, TextInput } from "react-native";
import { usePalette } from "../../hooks/usePalette";
import { ElementProps } from "../../types/TemplateTypes";
import Title from "../text/Title";

export default function TitleElement(props: ElementProps) {
    const [palette] = usePalette();

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
                placeholderTextColor={palette.textSecondary}
                onChangeText={onEdit}
                style={[styles.textInput, { color: palette.textPrimary, backgroundColor: palette.innerBox }]} />
        );
    }
    else {
        return (
            <Title style={{ marginTop: 20, marginBottom: 5 }}>{elementData.label}</Title>
        );
    }
}

const styles = StyleSheet.create({
    textInput: {
        borderRadius: 10,
        padding: 5,
        margin: 5,
        fontSize: 30,
        fontWeight: "bold"
    }
});

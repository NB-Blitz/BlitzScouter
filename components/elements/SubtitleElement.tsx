import React from "react";
import { StyleSheet, TextInput } from "react-native";
import { usePalette } from "../../hooks/usePalette";
import { ElementProps } from "../../types/TemplateTypes";
import Subtitle from "../text/Subtitle";

export default function SubtitleElement(props: ElementProps) {
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
                placeholder="Subtitle"
                placeholderTextColor={palette.textSecondary}
                onChangeText={onEdit}
                style={[styles.textInput, { color: palette.textPrimary, backgroundColor: palette.innerBox }]} />
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
        borderRadius: 10,
        padding: 5,
        margin: 5,
        fontSize: 15,
        fontWeight: "bold"
    }
});

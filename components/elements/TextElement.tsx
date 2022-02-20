import React from "react";
import { StyleSheet, TextInput } from "react-native";
import { usePalette } from "../../hooks/usePalette";
import { ElementProps } from "../../types/TemplateTypes";
import Text from "../text/Text";

export default function TextElement(props: ElementProps) {
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
                placeholder="Text"
                placeholderTextColor={palette.textSecondary}
                onChangeText={onEdit}
                style={[styles.textInput, { color: palette.textPrimary, backgroundColor: palette.innerBox }]}
                multiline={true} />
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
        borderRadius: 10,
        padding: 5,
        margin: 5,
        fontSize: 15
    }
});

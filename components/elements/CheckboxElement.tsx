import Checkbox from 'expo-checkbox';
import React from "react";
import { StyleSheet, TextInput, Vibration, View } from "react-native";
import { usePalette } from '../../hooks/usePalette';
import { ElementProps } from '../../types/TemplateTypes';
import Text from '../text/Text';

export default function CheckboxElement(props: ElementProps) {
    let elementData = props.data;
    const defaultValue = elementData.options.defaultValue;
    const [value, setValue] = React.useState(defaultValue ? defaultValue as number : 0);
    const [palette] = usePalette();

    // Default Value
    if (props.onChange && elementData.value != value) {
        elementData.value = value;
        props.onChange(elementData);
    }

    // Value State Change
    const changeChecked = (isChecked: boolean) => {

        // Value
        const newValue = isChecked ? 1 : 0;
        setValue(newValue);
        elementData.value = newValue;
        if (props.isEditable)
            elementData.options.defaultValue = newValue;

        // Vibrate
        if (isChecked)
            Vibration.vibrate(30);
        else
            Vibration.vibrate(100);

        // Callback
        if (props.onChange)
            props.onChange(elementData);
    }

    const changeText = (text: string) => {
        elementData.label = text;
        if (props.onChange)
            props.onChange(elementData);
    };

    return (
        <View style={styles.container}>
            <Checkbox
                style={styles.checkbox}
                value={value === 1}
                onValueChange={changeChecked}
                color={palette.navigationSelected} />
            {props.isEditable ?
                <TextInput
                    defaultValue={elementData.label}
                    placeholder="Name"
                    placeholderTextColor="#bbb"
                    onChangeText={changeText}
                    style={[styles.textInput, { color: palette.textPrimary, backgroundColor: palette.innerBox }]} />
                :
                <Text style={styles.title}>{elementData.label}</Text>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginTop: 15,
        marginLeft: 15
    },
    textInput: {
        borderRadius: 10,
        padding: 5,
        marginLeft: 10,
        fontSize: 20,
        flex: 1
    },
    title: {
        textAlign: "left",
        fontWeight: "bold",
        marginTop: 2,
        marginLeft: 20,
        fontSize: 20
    },
    checkbox: {
        marginLeft: 5,
        marginTop: 2,
        transform: [{ scaleX: 2 }, { scaleY: 2 }]
    }
});

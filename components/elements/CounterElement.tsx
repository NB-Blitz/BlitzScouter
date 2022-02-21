import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TextInput, Vibration, View } from "react-native";
import { usePalette } from "../../hooks/usePalette";
import { ElementProps } from "../../types/TemplateTypes";
import Button from "../common/Button";
import Text from "../text/Text";
import Title from "../text/Title";

export default function CounterElement(props: ElementProps) {
    const elementData = props.data;
    const defaultValue = elementData.options.defaultValue;
    const [value, setValue] = React.useState(defaultValue ? defaultValue as number : 0);
    const [palette] = usePalette();

    // Default Value
    if (elementData.value === undefined && props.onChange) {
        elementData.value = value;
        props.onChange(elementData);
    }

    // Value State Change
    const changeValue = (delta: number) => {

        // Value
        let newValue = value;
        if (value + delta >= 0) {
            newValue += delta;
            setValue(newValue);
            elementData.value = newValue;
        }
        if (props.isEditable)
            elementData.options.defaultValue = newValue;

        // Vibrate
        if (delta > 0)
            Vibration.vibrate(10);
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
            <Title style={styles.counter}>{value}</Title>
            <Button
                style={[styles.button, { backgroundColor: palette.navigationSelected }]}
                onPress={() => { changeValue(1); }}>

                <MaterialIcons name="add" size={32} style={{ color: palette.navigationTextSelected }} />

            </Button>
            <Button
                style={[styles.button, { backgroundColor: palette.innerBox }]}
                onPress={() => { changeValue(-1); }}>

                <MaterialIcons name="remove" size={32} style={{ color: palette.textPrimary }} />

            </Button>

            {props.isEditable ?
                <TextInput
                    defaultValue={elementData.label}
                    placeholder="Name"
                    placeholderTextColor={palette.textSecondary}
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
        flexDirection: "row"
    },
    textInput: {
        borderRadius: 10,
        padding: 5,
        margin: 5,
        fontSize: 15,
        flex: 1
    },
    title: {
        fontWeight: "bold",
        marginTop: 15,
        marginLeft: 20,
        fontSize: 20
    },
    counter: {
        width: 50,
        textAlign: "center"
    },
    button: {
        height: 50,
        width: 70,
        borderRadius: 5,
        paddingLeft: 18,
        marginLeft: 5,
        marginTop: 4,

        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        alignSelf: 'stretch',
    }
});

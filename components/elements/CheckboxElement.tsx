import Checkbox from 'expo-checkbox';
import React from "react";
import { StyleSheet, TextInput, Vibration, View } from "react-native";
import { ElementProps } from '../../types/TemplateTypes';
import Text from '../text/Text';

export default function CheckboxElement(props: ElementProps) {
    let elementData = props.data;
    const defaultValue = elementData.options.defaultValue;
    const [isChecked, setChecked] = React.useState(defaultValue === undefined ? defaultValue as boolean : false);

    const changeChecked = (isChecked: boolean) => {

        // Value
        setChecked(isChecked);
        elementData.value = isChecked;
        if (props.isEditable)
            elementData.options.defaultValue = isChecked;

        // Vibrate
        if (isChecked)
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
            <Checkbox
                style={styles.checkbox}
                value={isChecked}
                onValueChange={changeChecked}
                color={'#c89f00'} />
            {props.isEditable ?
                <TextInput
                    defaultValue={elementData.label}
                    placeholder="Name"
                    placeholderTextColor="#bbb"
                    onChangeText={changeText}
                    style={styles.textInput}></TextInput>
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
        color: "#fff",
        backgroundColor: "#222222",
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

import Checkbox from 'expo-checkbox';
import React from "react";
import { StyleSheet, TextInput, Vibration, View } from "react-native";
import BlitzDB from '../../api/BlitzDB';
import { ElementProps } from "../../api/models/TemplateModels";
import Text from '../text/Text';

export default function CheckboxElement(props: ElementProps) {
    let elementData = props.data;
    const defaultValue = elementData.options.defaultValue;
    const [isChecked, setChecked] = React.useState(defaultValue ? defaultValue as boolean : false);

    const changeChecked = (isChecked: boolean) => {
        setChecked(isChecked);

        // Edit
        if (props.isEditable) {
            elementData.options.defaultValue = isChecked;
            BlitzDB.matchTemplate.setElement(elementData);
        }

        // Vibrate
        if (isChecked)
            Vibration.vibrate(10);
        else
            Vibration.vibrate(100);

        // Callback
        if (props.onChange)
            props.onChange(isChecked);
    }

    const changeText = (text: string) => {
        elementData.label = text;
        BlitzDB.matchTemplate.setElement(elementData);
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
                    placeholder="Checkbox Name"
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
        fontSize: 20
    },
    title: {
        textAlign: "left",
        fontWeight: "bold",
        marginTop: 2,
        marginLeft: 20,
        fontSize: 20
    },
    checkbox: {
        marginLeft: 15,
        marginTop: 2,
        transform: [{ scaleX: 2 }, { scaleY: 2 }]
    }
});

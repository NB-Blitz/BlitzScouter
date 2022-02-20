import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { usePalette } from "../../hooks/usePalette";
import { ElementProps, ElementType } from "../../types/TemplateTypes";
import Button from "../common/Button";
import CheckboxElement from "./CheckboxElement";
import CounterElement from "./CounterElement";
import HRElement from "./HRElement";
import SubtitleElement from "./SubtitleElement";
import TextElement from "./TextElement";
import TitleElement from "./TitleElement";

export default function ScoutingElement(props: ElementProps) {
    const [palette] = usePalette();

    let element: JSX.Element | undefined;
    switch (props.data.type) {
        case ElementType.title:
            element = (<TitleElement {...props} />);
            break;
        case ElementType.subtitle:
            element = (<SubtitleElement {...props} />);
            break;
        case ElementType.text:
            element = (<TextElement {...props} />);
            break;
        case ElementType.hr:
            element = (<HRElement {...props} />);
            break;
        case ElementType.counter:
            element = (<CounterElement {...props} />);
            break;
        case ElementType.checkbox:
            element = (<CheckboxElement {...props} />);
            break;
    }


    const onRemove = () => {
        if (props.onRemove)
            props.onRemove(props.data);
    }
    const onUp = () => {
        if (props.onUp)
            props.onUp(props.data);
    }
    const onDown = () => {
        if (props.onDown)
            props.onDown(props.data);
    }

    return (
        <View>
            {props.isEditable ?
                <View style={styles.scoutingElement}>{element}</View>
                : element}

            {props.isEditable ?
                <View style={styles.buttonContainer}>
                    <Button onPress={onUp} style={styles.button}>
                        <MaterialIcons name="arrow-drop-up" size={25} color={palette.textPrimary} />
                    </Button>
                    <Button onPress={onDown} style={styles.button}>
                        <MaterialIcons name="arrow-drop-down" size={25} color={palette.textPrimary} />
                    </Button>
                    <Button onPress={onRemove} style={styles.button}>
                        <MaterialIcons name="delete-outline" size={25} color={palette.textPrimary} />
                    </Button>

                </View>
                : null}
        </View>
    );
}

const styles = StyleSheet.create({
    scoutingElement: {
        paddingRight: 90,
        minHeight: 50,
        justifyContent: "center",
    },
    buttonContainer: {
        flexDirection: "row",
        position: "absolute",
        right: 0,
        top: 0,
        paddingTop: 15
    },
    button: {
        margin: 0,
        padding: 2,
        height: 30,
        width: 30
    }
});
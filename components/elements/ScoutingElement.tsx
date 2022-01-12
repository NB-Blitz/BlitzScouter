import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ElementProps, ElementType } from "../../types/TemplateTypes";
import Button from "../common/Button";
import CheckboxElement from "./CheckboxElement";
import CounterElement from "./CounterElement";
import HRElement from "./HRElement";
import SubtitleElement from "./SubtitleElement";
import TextBoxElement from "./TextBoxElement";
import TextElement from "./TextElement";
import TitleElement from "./TitleElement";

export default function ScoutingElement(props: ElementProps) {
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
        case ElementType.textbox:
            element = (<TextBoxElement {...props} />);
            break;
    }


    const onRemove = () => {
        if (props.onRemove)
            props.onRemove(props.data);
    }

    return (
        <View>
            <View style={{
                paddingRight: 50,
                minHeight: 50,
                justifyContent: "center",
            }}>

                {element}

            </View>

            {props.isEditable && props.onRemove ?
                <View style={styles.deleteButton}>
                    <Button onPress={onRemove}>
                        <MaterialIcons name="delete-outline" size={25} color={"#ffffff"} />
                    </Button>
                </View>
                : null}
        </View>
    );
}

const styles = StyleSheet.create({
    deleteButton: {
        position: "absolute",
        right: 0,
        top: 0,
        padding: 10
    }
});
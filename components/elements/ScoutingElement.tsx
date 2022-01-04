import React from "react";
import { StyleSheet } from "react-native";
import { ElementProps, ElementType } from "../../api/models/TemplateModels";
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
    return element;
}


const styles = StyleSheet.create({

});

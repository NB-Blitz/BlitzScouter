import React from "react";
import { ElementProps } from "../../types/TemplateTypes";
import HorizontalBar from "../common/HorizontalBar";

export default function HRElement(props: ElementProps) {
    if (props.isEditable) {
        return (
            <HorizontalBar style={{
                marginLeft: 10,
                marginRight: 10
            }} />
        );
    }
    else {
        return (
            <HorizontalBar />
        );
    }
}
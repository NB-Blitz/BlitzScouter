import React from "react";
import { ElementData } from "../../api/models/TemplateModels";
import Subtitle from "../text/Subtitle";

export default function SubtitleElement(props: { data: ElementData }) {
    return (
        <Subtitle>{props.data.label}</Subtitle>
    );
}
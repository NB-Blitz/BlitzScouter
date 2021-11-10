import React from "react";
import { ElementData } from "../../api/models/TemplateModels";
import Title from "../text/Title";

export default function TitleElement(props: { data: ElementData }) {
    return (
        <Title>{props.data.label}</Title>
    );
}
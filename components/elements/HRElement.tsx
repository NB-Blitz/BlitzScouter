import React from "react";
import { ElementData } from "../../api/models/TemplateModels";
import HorizontalBar from "../common/HorizontalBar";

export default function HRElement(props: { data: ElementData }) {
    return (
        <HorizontalBar />
    );
}
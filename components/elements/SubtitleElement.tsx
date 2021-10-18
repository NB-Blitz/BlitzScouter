import React from "react";
import { ElementData } from "../../api/DBModels";
import Subtitle from "../text/Subtitle";

export default function SubtitleElement(props: {data: ElementData})
{
    return (
        <Subtitle>{props.data.label}</Subtitle>
    );
}
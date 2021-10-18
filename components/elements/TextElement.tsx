import React from "react";
import { ElementData } from "../../api/DBModels";
import Text from "../text/Text";

export default function TextElement(props: {data: ElementData})
{
    return (
        <Text>{props.data.label}</Text>
    );
}
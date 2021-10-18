import React from "react";
import { ElementData } from "../../api/DBModels";
import HorizontalBar from "../common/HorizontalBar";

export default function HRElement(props: {data: ElementData})
{
    return (
        <HorizontalBar />
    );
}
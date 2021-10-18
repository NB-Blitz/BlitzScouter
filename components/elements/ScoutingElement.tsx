import React from "react";
import { ElementData, ElementType } from "../../api/DBModels";
import HRElement from "./HRElement";
import SubtitleElement from "./SubtitleElement";
import TextElement from "./TextElement";
import TitleElement from "./TitleElement";

export default function ScoutingElement(props: {data: ElementData}): JSX.Element
{
    switch (props.data.type)
    {
        case ElementType.title:
            return (<TitleElement data={props.data} />);
        case ElementType.subtitle:
            return (<SubtitleElement data={props.data} />);
        case ElementType.text:
            return (<TextElement data={props.data} />);
        case ElementType.hr:
            return (<HRElement data={props.data} />);
    }
}
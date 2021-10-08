import * as React from 'react';
import { View } from "react-native";
import FadeIn from "../common/FadeIn";

export type ViewProps = View['props'];

export default function Container(props: ViewProps) {

    return (<FadeIn><View {...props} /></FadeIn>);
}

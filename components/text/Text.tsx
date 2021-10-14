import * as React from 'react';
import { Text as DefaultText } from "react-native";

export type TextProps = DefaultText['props'];

export default function Text(props: TextProps) {
    const { style, ...otherProps } = props;

    return <DefaultText style={[{ color: "#fff" }, style]} {...otherProps} />;
}
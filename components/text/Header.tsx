import * as React from 'react';
import { Text } from "react-native";

export type TextProps = Text['props'];

export default function Header(props: TextProps) {
    const { style, ...otherProps } = props;

    return <Text style={[{
        color: "#fff",
        fontSize: 24,
        fontWeight: 'bold'
    }, style]} {...otherProps} />;
}
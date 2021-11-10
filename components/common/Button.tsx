import * as React from 'react';
import { TouchableOpacity } from "react-native";

export type ButtonProps = TouchableOpacity['props'];

export default function Button(props: ButtonProps) {
    const { style, ...otherProps } = props;

    return <TouchableOpacity style={[{
        alignItems: "center",
        padding: 10,
        alignSelf: 'stretch'
    }, style]} {...otherProps} />;
}
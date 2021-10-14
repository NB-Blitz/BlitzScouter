import * as React from 'react';
import { Text } from "react-native";

export type TextProps = Text['props'];

export default function Subtitle(props: TextProps) {
    const { style, ...otherProps } = props;
  
    return <Text style={[{
                color: "#bbb",
                fontSize: 15,
                fontWeight: 'bold'
            }, style]} {...otherProps} />;
}
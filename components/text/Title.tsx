import * as React from 'react';
import { Text } from "react-native";

export type TextProps = Text['props'];

export default function Title(props: TextProps) {
    const { style, ...otherProps } = props;
  
    return <Text style={[{
                color: "#fff",
                fontSize: 30,
                fontWeight: 'bold'
            }, style]} {...otherProps} />;
}
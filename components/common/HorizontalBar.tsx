import * as React from 'react';
import { View } from "react-native";

export type ViewProps = View['props'];

export default function HorizontalBar(props: ViewProps)
{
    const { style, ...otherProps } = props;

    return (<View
        style={[{
            borderBottomColor: '#999',
            borderBottomWidth: 1,
            marginBottom: 20,
        }, style]}
        
        {...otherProps}
    />);
}
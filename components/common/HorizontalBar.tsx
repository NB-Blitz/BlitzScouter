import * as React from 'react';
import { View } from "react-native";
import { usePalette } from '../../hooks/usePalette';

export type ViewProps = View['props'];

export default function HorizontalBar(props: ViewProps) {
    const [palette] = usePalette();
    const { style, ...otherProps } = props;

    return (<View
        style={[{
            borderBottomColor: palette.textSecondary,
            borderBottomWidth: 1,
            marginTop: 15
        }, style]}

        {...otherProps}
    />);
}
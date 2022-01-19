import * as React from 'react';
import { View } from "react-native";
import { PaletteContext } from '../../context/PaletteContext';

export type ViewProps = View['props'];

export default function HorizontalBar(props: ViewProps) {
    const paletteContext = React.useContext(PaletteContext);
    const { style, ...otherProps } = props;

    return (<View
        style={[{
            borderBottomColor: paletteContext.palette.textSecondary,
            borderBottomWidth: 1,
            marginBottom: 15,
            marginTop: 15
        }, style]}

        {...otherProps}
    />);
}
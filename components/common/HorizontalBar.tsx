import * as React from 'react';
import { View } from "react-native";
import { PaletteContext } from '../../context/PaletteContext';

export type ViewProps = View['props'];

export default function HorizontalBar(props: ViewProps) {
    const paletteContext = React.useContext(PaletteContext);
    const { style, ...otherProps } = props;

    return (<View
        style={[{
            borderBottomColor: "#444",
            borderBottomWidth: 1,
            marginBottom: 15,
            marginTop: 10
        }, style]}

        {...otherProps}
    />);
}
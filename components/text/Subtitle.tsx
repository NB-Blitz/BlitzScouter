import * as React from 'react';
import { Text } from "react-native";
import { PaletteContext } from '../../context/PaletteContext';

export type TextProps = Text['props'];

export default function Subtitle(props: TextProps) {
    const paletteContext = React.useContext(PaletteContext);
    const { style, ...otherProps } = props;

    return <Text style={[{
        color: paletteContext.palette.textSecondary,
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 15
    }, style]} {...otherProps} />;
}
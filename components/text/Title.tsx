import * as React from 'react';
import { Text } from "react-native";
import { PaletteContext } from '../../context/PaletteContext';

export type TextProps = Text['props'];

export default function Title(props: TextProps) {
    const paletteContext = React.useContext(PaletteContext);
    const { style, ...otherProps } = props;

    return <Text style={[{
        color: paletteContext.palette.textPrimary,
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 10
    }, style]} {...otherProps} />;
}
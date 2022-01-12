import * as React from 'react';
import { Text as DefaultText } from "react-native";
import { PaletteContext } from '../../context/PaletteContext';

export type TextProps = DefaultText['props'];

export default function Text(props: TextProps) {
    const paletteContext = React.useContext(PaletteContext);
    const { style, ...otherProps } = props;

    return <DefaultText style={[{ color: paletteContext.palette.textPrimary }, style]} {...otherProps} />;
}
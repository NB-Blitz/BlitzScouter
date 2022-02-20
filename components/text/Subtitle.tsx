import * as React from 'react';
import { Text } from "react-native";
import { usePalette } from '../../hooks/usePalette';

export type TextProps = Text['props'];

export default function Subtitle(props: TextProps) {
    const [palette] = usePalette();
    const { style, ...otherProps } = props;

    return <Text style={[{
        color: palette.textSecondary,
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 15
    }, style]} {...otherProps} />;
}
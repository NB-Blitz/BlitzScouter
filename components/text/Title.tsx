import * as React from 'react';
import { Text } from "react-native";
import { usePalette } from '../../hooks/usePalette';

export type TextProps = Text['props'];

export default function Title(props: TextProps) {
    const [palette] = usePalette();
    const { style, ...otherProps } = props;

    return <Text style={[{
        color: palette.textPrimary,
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 10
    }, style]} {...otherProps} />;
}
import * as React from 'react';
import { Text } from "react-native";
import { usePalette } from '../../hooks/usePalette';

export type TextProps = Text['props'];

export default function NavTitle(props: TextProps) {
    const [palette] = usePalette();
    const { style, ...otherProps } = props;

    return <Text style={[{
        color: palette.textPrimary,
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 15,
    }, style]} {...otherProps} />;
}
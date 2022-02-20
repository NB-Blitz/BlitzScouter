import * as React from 'react';
import { Text as DefaultText } from "react-native";
import { usePalette } from '../../hooks/usePalette';

export type TextProps = DefaultText['props'];

export default function Text(props: TextProps) {
    const [palette] = usePalette();
    const { style, ...otherProps } = props;

    return <DefaultText style={[{ color: palette.textPrimary }, style]} {...otherProps} />;
}
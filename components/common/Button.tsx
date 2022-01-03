import * as React from 'react';
import { TouchableNativeFeedback, TouchableOpacity, View } from "react-native";

export type ButtonProps = TouchableOpacity['props'];

export default function Button(props: ButtonProps) {
    const { style, children } = props;

    return <TouchableNativeFeedback
        useForeground={true}
        background={TouchableNativeFeedback.Ripple('#696969', false)}
        onPress={props.onPress}>

        <View style={[{
            alignItems: "center",
            padding: 10,
            alignSelf: 'stretch'
        }, style]}>
            {children}
        </View>

    </TouchableNativeFeedback>;
}
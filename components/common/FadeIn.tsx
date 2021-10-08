import * as React from 'react';
import { useFocusEffect } from "@react-navigation/core";
import { Animated, View } from "react-native";

export type ViewProps = View['props'];

export default function FadeIn(props: ViewProps)
{
    const { style, ...otherProps } = props;
    const fadeAnim = React.useRef(new Animated.Value(0)).current;

    useFocusEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true
        }).start();

        return () => {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true
            }).start();
        }
    });

    return (<Animated.View
                style={[{
                    flex: 1,
                    opacity: fadeAnim,
                }, style]}
                {...otherProps} />
    );
}
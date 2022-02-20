import React from "react";
import { View } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue } from "react-native-reanimated";

export type ViewProps = View['props'];

export default function PanContainer(props: ViewProps) {

    // Hooks
    const start = { x: useSharedValue(0), y: useSharedValue(0) };
    const end = { x: useSharedValue(0), y: useSharedValue(0) };

    // Handler
    const gestureHandler = useAnimatedGestureHandler({
        onStart: (event, ctx) => {

        },
        onActive: (event, ctx) => {
            end.x.value = start.x.value + event.translationX;
            end.y.value = start.y.value + event.translationY;
        },
        onEnd: (event, ctx) => {
            start.x.value = end.x.value;
            start.y.value = end.y.value;
        }
    });

    // Style
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: end.x.value }, { translateY: end.y.value }],
        };
    });

    return (
        <PanGestureHandler
            onGestureEvent={gestureHandler}>

            <Animated.View
                style={animatedStyle}
                {...props} />

        </PanGestureHandler>
    );
}
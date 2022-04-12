import React from "react";
import { View } from "react-native";
import { PinchGestureHandler, PinchGestureHandlerGestureEvent } from "react-native-gesture-handler";
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue } from "react-native-reanimated";

export type ViewProps = View['props'];

export default function ZoomContainer(props: ViewProps) {

    // Hooks
    const start = useSharedValue(1);
    const end = useSharedValue(1);

    // Handler
    const gestureHandler = useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
        onStart: (event, ctx) => {

        },
        onActive: (event, ctx) => {
            end.value = start.value * event.scale;
        },
        onEnd: (event, ctx) => {
            start.value = end.value;
        }
    });

    // Style
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: end.value }],
        };
    });

    return (
        <PinchGestureHandler
            onGestureEvent={gestureHandler}>

            <Animated.View
                style={animatedStyle}
                {...props} />

        </PinchGestureHandler>
    );
}
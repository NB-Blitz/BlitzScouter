import React from "react";
import { View } from "react-native";
import { PanGestureHandler, PanGestureHandlerGestureEvent, PinchGestureHandler, PinchGestureHandlerGestureEvent } from "react-native-gesture-handler";
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue } from "react-native-reanimated";

export type ViewProps = View['props'];

export default function PanZoomContainer(props: ViewProps) {
    // Hooks
    const pinchRef = React.createRef();
    const startPan = { x: useSharedValue(0), y: useSharedValue(0) };
    const endPan = { x: useSharedValue(0), y: useSharedValue(0) };
    const startZoom = useSharedValue(1);
    const endZoom = useSharedValue(1);

    // Handler
    const panGestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
        onStart: (event, ctx) => {

        },
        onActive: (event, ctx: any) => {
            endPan.x.value = startPan.x.value + event.translationX / endZoom.value;
            endPan.y.value = startPan.y.value + event.translationY / endZoom.value;
        },
        onEnd: (event, ctx) => {
            startPan.x.value = endPan.x.value;
            startPan.y.value = endPan.y.value;
        }
    });
    const zoomGestureHandler = useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
        onStart: (event, ctx) => {

        },
        onActive: (event, ctx) => {
            endZoom.value = startZoom.value * event.scale;
        },
        onEnd: (event, ctx) => {
            startZoom.value = endZoom.value;
        }
    });

    // Style
    const panStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: endPan.x.value }, { translateY: endPan.y.value }],
        };
    });
    const zoomStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: endZoom.value }],
        };
    });

    return (
        <PinchGestureHandler onGestureEvent={zoomGestureHandler} ref={pinchRef}>
            <Animated.View style={[zoomStyle]}>
                <PanGestureHandler onGestureEvent={panGestureHandler} simultaneousHandlers={pinchRef}>
                    <Animated.View style={panStyle} {...props} />
                </PanGestureHandler>
            </Animated.View>
        </PinchGestureHandler>
    );
}
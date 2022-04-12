import React from "react";
import { Dimensions, View } from "react-native";
import { PanGestureHandler, PanGestureHandlerGestureEvent, PinchGestureHandler, PinchGestureHandlerGestureEvent } from "react-native-gesture-handler";
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

export type ViewProps = View['props'];

export default function PanZoomContainer(props: ViewProps) {

    // Hooks
    const deviceWidth = Dimensions.get('window').width;
    const deviceHeight = Dimensions.get('window').height;
    const SIZE = deviceWidth;

    const pinchRef = React.createRef();
    const panRef = React.createRef();

    const startPan = { x: useSharedValue(0), y: useSharedValue(deviceHeight / 6) };
    const endPan = { x: useSharedValue(0), y: useSharedValue(deviceHeight / 6) };
    const startZoom = useSharedValue(1);
    const endZoom = useSharedValue(1);


    // Handler
    const panGestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
        onStart: (event, ctx) => {

        },
        onActive: (event, ctx: any) => {
            endPan.x.value = startPan.x.value + event.translationX / endZoom.value;
            endPan.y.value = startPan.y.value + event.translationY / endZoom.value;

            /*
            const deltaX = (SIZE / 2) - ((SIZE * endZoom.value) / 2) + (endPan.x.value * endZoom.value);
            if (deltaX > 0) {
                startPan.x.value -= deltaX;
            }*/
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
            if (endZoom.value < 1)
                endZoom.value = Math.pow(endZoom.value, 0.5);
        },
        onEnd: (event, ctx) => {
            if (endZoom.value < 1) {
                startZoom.value = 1;
                endZoom.value = withSpring(1, { overshootClamping: false });
            } else {
                startZoom.value = endZoom.value;
            }
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
            transform: [{ scale: endZoom.value }]
        };
    });

    return (
        <PanGestureHandler
            onGestureEvent={panGestureHandler}
            maxPointers={2}
            avgTouches
            minDist={10}
            ref={panRef}>

            <Animated.View style={[zoomStyle, { height: deviceHeight }]}>
                <PinchGestureHandler
                    onGestureEvent={zoomGestureHandler}
                    simultaneousHandlers={panRef}
                    ref={pinchRef}>
                    <Animated.View style={panStyle} {...props} />
                </PinchGestureHandler>
            </Animated.View>
        </PanGestureHandler>
    );
}
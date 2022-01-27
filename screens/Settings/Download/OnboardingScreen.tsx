import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Image, StyleSheet, View } from "react-native";
import PagerView from 'react-native-pager-view';
import Animated from "react-native-reanimated";
import logo from "../../../assets/images/logo.png";
import tbalamp from "../../../assets/images/tba_lamp.png";
import Button from "../../../components/common/Button";
import Subtitle from "../../../components/text/Subtitle";
import Text from "../../../components/text/Text";
import Title from "../../../components/text/Title";
import useStorage from "../../../hooks/useStorage";
import TabNavigator from "../../../navigation/TabNavigator";

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

export default function OnboardingScreen() {
    const [hasOnboarded] = useStorage<boolean>("onboard", false);

    // Animations
    const scrollOffsetAnimatedValue = React.useRef(new Animated.Value(0)).current;
    const positionAnimatedValue = React.useRef(new Animated.Value(0)).current;
    const translateX = Animated.add(
        scrollOffsetAnimatedValue.interpolate({
            inputRange: [0, 2],
            outputRange: [0, 30],
        }),
        positionAnimatedValue.interpolate({
            inputRange: [0, 2],
            outputRange: [0, 30],
        })
    );

    // Navigation
    const navigator = useNavigation();
    if (hasOnboarded)
        return (
            <TabNavigator />
        );
    else
        return (
            <View style={styles.pagerView}>
                <AnimatedPagerView
                    style={{ flex: 1 }}
                    initialPage={0}
                    onPageScroll={Animated.event([{
                        nativeEvent: {
                            position: positionAnimatedValue,
                            offset: scrollOffsetAnimatedValue
                        }
                    }], {
                        listener: ({ nativeEvent: { offset, position } }: any) => {
                            console.log(`Position: ${position} Offset: ${offset}`);
                        },
                        useNativeDriver: false,
                    })}>

                    <View style={styles.page} key="1">
                        <Image source={logo} style={[styles.img, { width: 160, height: 160 }]} />
                        <Subtitle style={styles.subtitle}>Welcome to</Subtitle>
                        <Title style={styles.title}>Blitz Scouter</Title>
                        <Text style={styles.text}>Blitz Scouter is a simple, easy to use scouting app for use at a FIRST{"\u00AE"} Robotics Competition.</Text>
                    </View>
                    <View style={[styles.page, { backgroundColor: "#3f51b5" }]} key="2">
                        <View style={{ height: 90 }} />
                        <Animated.Image source={tbalamp} style={[styles.img, { width: 100, height: 160 }]} />
                        <Subtitle style={styles.subtitle}>Import From</Subtitle>
                        <Title style={styles.title}>The Blue Alliance</Title>
                        <Text style={styles.text}>Import Teams and Event data while your online, and continue to use them offline.</Text>
                        <Button style={styles.button} onPress={() => { navigator.navigate("Year"); }}>
                            <Text>Select Your Event</Text>
                        </Button>
                    </View>
                </AnimatedPagerView>
                <View style={{ alignSelf: "center" }}>
                    <View style={[
                        styles.pageDot, {
                            transform: [{ translateX: 0 }],
                            backgroundColor: "gray"
                        }]} />
                    <View style={[
                        styles.pageDot, {
                            transform: [{ translateX: 15 }],
                            backgroundColor: "gray"
                        }]} />
                    <Animated.View style={[
                        styles.pageDot, {
                            transform: [{ translateX }],
                            backgroundColor: "white"
                        }]} />
                </View>
            </View>
        );
}

const styles = StyleSheet.create({
    pagerView: {
        flex: 1
    },
    page: {
        flex: 1,
        marginTop: 50,
        padding: 20,
        justifyContent: "center",
        alignContent: "center",
    },
    subtitle: {
        fontSize: 20,
        marginTop: 30,
        textAlign: "center"
    },
    title: {
        marginTop: 0,
        textAlign: "center"
    },
    text: {
        marginTop: 10,
        fontSize: 16,
        textAlign: "center"
    },
    img: {
        alignSelf: "center",
    },
    button: {
        marginTop: 50,
        borderRadius: 5,
        borderColor: "white",
        backgroundColor: "#2b3da1"
    },
    pageDot: {
        position: "absolute",
        bottom: 10,
        right: 10,
        height: 8,
        width: 8,
        borderRadius: 4
    }
});
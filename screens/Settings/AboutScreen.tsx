import { MaterialIcons } from "@expo/vector-icons";
import * as Application from 'expo-application';
import { Accelerometer } from 'expo-sensors';
import * as React from "react";
import { Image } from "react-native";
import HorizontalBar from "../../components/common/HorizontalBar";
import ScrollContainer from "../../components/containers/ScrollContainer";
import Subtitle from "../../components/text/Subtitle";
import Text from "../../components/text/Text";
import Title from "../../components/text/Title";
import { PaletteContext } from "../../context/PaletteContext";

export default function AboutScreen() {
    const paletteContext = React.useContext(PaletteContext);
    const [accelerometer, setAccelerometer] = React.useState({ x: 0, y: 0, z: 0 });
    const [isEasterEgg, setEasterEgg] = React.useState(false);

    Accelerometer.setUpdateInterval(1000);
    React.useEffect(() => {
        const subscription = Accelerometer.addListener((data) => {
            setAccelerometer(data);
        });

        return () => {
            subscription.remove();
        };
    }, []);

    React.useEffect(() => {
        const acceleration = Math.max(accelerometer.x, accelerometer.y, accelerometer.z);
        if (acceleration > 1 && !isEasterEgg) {
            setEasterEgg(true);
            console.log(acceleration);
        }
    }, [accelerometer, setEasterEgg, isEasterEgg]);

    return (
        <ScrollContainer>
            <Title>Blitz Scouter</Title>
            <Subtitle>Version {Application.nativeApplicationVersion}</Subtitle>

            <HorizontalBar />

            <Text>
                Blitz Scouter is a scouting app for the FIRST Robotics Competition. It is designed to be as simple as possible, and is designed to be used by teams of all sizes.
            </Text>

            <HorizontalBar />

            <Text>
                Made with <MaterialIcons name="favorite" color={"#ed0000"} size={14} /> by Team 5148, New Berlin Blitz
            </Text>
            <Text style={{ color: paletteContext.palette.textSecondary, marginTop: 5 }}>
                https://team5148.org/
                {"\n"}
                5148nbblitz@gmail.com
            </Text>
            {isEasterEgg ?
                <Image style={{ height: 300, width: 200, margin: 20 }} fadeDuration={1000} source={{ uri: "https://i.redd.it/ru3eqcdd99b81.jpg" }} />
                : null}
        </ScrollContainer>)
}
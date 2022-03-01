import { MaterialIcons } from "@expo/vector-icons";
import * as Application from 'expo-application';
import * as React from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Subtitle from "../../components/text/Subtitle";
import Text from "../../components/text/Text";
import Title from "../../components/text/Title";

export default function AboutScreen() {
    return (
        <ScrollView style={styles.container}>
            <Title>Blitz Scouter</Title>
            <Subtitle>Version {Application.nativeApplicationVersion}</Subtitle>

            <Text>
                Blitz Scouter is a scouting app for the FIRST Robotics Competition. It is designed to be as simple as possible, and is designed to be used by teams of all sizes.
            </Text>


            <Text>
                Made with <MaterialIcons name="favorite" color={"#ed0000"} size={14} /> by Team 5148, New Berlin Blitz
            </Text>
            <Text style={{ marginTop: 5 }}>
                https://team5148.org/
                {"\n"}
                5148nbblitz@gmail.com
            </Text>
        </ScrollView>)
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 20,
        paddingRight: 20
    }
})
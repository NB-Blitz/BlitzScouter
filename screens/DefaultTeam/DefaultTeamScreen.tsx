import * as React from 'react';
import { ScrollView, StyleSheet, View } from "react-native";
import HorizontalBar from "../../components/common/HorizontalBar";
import StandardButton from "../../components/common/StandardButton";
import Subtitle from "../../components/text/Subtitle";
import Title from "../../components/text/Title";

export default function DefaultTeamScreen({ route }: any) {


    return (
        <ScrollView>
            <View style={styles.container}>
                <Title>Default Team</Title>
                <Subtitle>Select the default team to scout</Subtitle>

                <HorizontalBar />

                <StandardButton
                    iconText={"R1"}
                    title={"Red 1"}
                    subtitle={"The first red robot"}
                    onPress={() => { }} />
                <StandardButton
                    iconText={"R2"}
                    title={"Red 2"}
                    subtitle={"The second red robot"}
                    onPress={() => { }} />
                <StandardButton
                    iconText={"R3"}
                    title={"Red 3"}
                    subtitle={"The third red robot"}
                    onPress={() => { }} />

                <HorizontalBar />

                <StandardButton
                    iconText={"B1"}
                    title={"Blue 1"}
                    subtitle={"The first blue robot"}
                    onPress={() => { }} />
                <StandardButton
                    iconText={"B2"}
                    title={"Blue 2"}
                    subtitle={"The second blue robot"}
                    onPress={() => { }} />
                <StandardButton
                    iconText={"B3"}
                    title={"Blue 3"}
                    subtitle={"The third blue robot"}
                    onPress={() => { }} />

                <HorizontalBar />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20
    }
});

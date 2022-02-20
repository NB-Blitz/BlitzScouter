import { useNavigation } from "@react-navigation/core";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { DownloadEvent } from "../../../api/TBAAdapter";
import StandardButton from "../../../components/common/StandardButton";
import Text from "../../../components/text/Text";
import Title from "../../../components/text/Title";

export default function DownloadScreen({ route }: any) {
    const navigator = useNavigation();
    const [downloadStatus, setDownloadStatus] = React.useState("");
    const eventID = route.params.eventID;

    const downloadEvent = (includeMedia: boolean) => {
        DownloadEvent(eventID, includeMedia, setDownloadStatus).then(() => {
            while (navigator.canGoBack())
                navigator.goBack();
        });
    }

    return (
        <ScrollView style={styles.container}>
            {downloadStatus === "" ?
                <View>
                    <Title style={styles.title}>Download Event</Title>
                    <StandardButton
                        iconType={"image-not-supported"}
                        title={"Don't Download Media"}
                        subtitle={"Less data, shorter download"}
                        onPress={() => { downloadEvent(false); }} />
                    <StandardButton
                        iconType={"image"}
                        title={"Download Media"}
                        subtitle={"More data, longer download"}
                        onPress={() => { downloadEvent(true); }} />
                </View>
                :
                <View>
                    <Title style={styles.title}>Downloading Event...</Title>
                    <Text>{downloadStatus}</Text>
                </View>
            }
        </ScrollView>

    );
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 20,
        paddingRight: 20
    },
    title: {
        marginBottom: 15
    }
});

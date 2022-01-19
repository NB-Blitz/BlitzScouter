import { useNavigation } from "@react-navigation/core";
import React from "react";
import { StyleSheet, View } from "react-native";
import { DownloadEvent } from "../../api/TBAAdapter";
import StandardButton from "../../components/common/StandardButton";
import ScrollContainer from "../../components/containers/ScrollContainer";
import Text from "../../components/text/Text";
import Title from "../../components/text/Title";
import { PaletteContext } from "../../context/PaletteContext";

export default function DownloadScreen({ route }: any) {
    const paletteContext = React.useContext(PaletteContext);
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
        <ScrollContainer>


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
        </ScrollContainer>

    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%"
    },
    title: {
        marginBottom: 15
    }
});
